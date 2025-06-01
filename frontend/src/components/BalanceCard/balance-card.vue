<template>
    <div class="top-row">
      <div class="balance-card">
        <img class="balance-card__dollar-icon" src="@/assets/img/dollar.png" alt="$">
        <div class="balance-card__orange-blur"></div>

        <div class="balance-card-content">
          <span class="balance-card__title">Баланс всех кошельков</span>
          <div class="balance-card-balance-box">
            <img class="balance-card__dollar_sign" src="@/assets/icons/dollar-sign.svg" alt="$">
            <span class="balance-card__value">{{ truncateLargeNumber(balance) }}</span>
          </div>
        </div> 

        <div class="balance-card__stats-row">
          <div class="balance-card__stat-item">
            <span class="balance-card__income-value">$ {{ truncateLargeNumber(income) }}</span>
            <span class="balance-card__income-title">Income</span>
          </div>
          <div class="balance-card__stat-item">
            <span class="balance-card__expand-value">$ {{ truncateLargeNumber(expense) }}</span>
            <span class="balance-card__expand-title">Expand</span>
          </div>
        </div>
      </div> 
    </div>
</template>


<script>
import axios from 'axios';
import { useUserStore } from '@/stores/user';
import { useWalletStore } from '@/stores/wallet'
import { useBalanceStore } from '@/stores/balance'
import { mapState } from 'pinia';

export default {
  computed: {
    ...mapState(useWalletStore, ['wallets', 'isLoading']),
    ...mapState(useBalanceStore, ['balance', 'income', 'expense', 'needsUpdate'])
  },
  data() {
    return {
      balance_value: 0,
      income_value:  0,
      expense_value:  0,
      dollarRate: 1,
    }
  },

  watch: {
    '$route'() {
      this.calculateBalance();
    },
    needsUpdate(newVal) {
      if (newVal) {
        this.calculateBalance();
      }
    }
  },
  
  methods: {
    truncateLargeNumber(value, maxLength = 13) {
      if (value === null || value === undefined) {
        return '0';
      }
      else {
        const valueStr = String(value);

        if (valueStr.length > maxLength) {
          return  valueStr.slice(0, maxLength - 3) + '...';
        }
        return valueStr;
      }
    },

    async fetchTransaction(walletId) {
      try {
        const response = await axios.get(`http://26.255.57.122:5260/api/Transaction/GetAllByWalletId/${walletId}`);
        return response.data;
      } catch (error) {
        console.log('Ошибка загрузки транзакций для кошелька: ', error);
        return [];
      }
    },
    
    async calculateBalance() {
      try {
        const userStore = useUserStore()
        const walletStore = useWalletStore()

        if (this.dollarRate === 1) {
          const responseDollar = await axios.get(`http://26.255.57.122:5260/api/Currency/GetById/3ab0c6513461459fb70c41b32b03a291`);
          this.dollarRate = responseDollar.data.rate;
        }

        if (userStore.userId) {
          await walletStore.fetchWallets(userStore.userId);
        }

        let totalBalance = 0;
        let totalIncome = 0;
        let totalExpense = 0;
        
        const walletPromises = this.wallets.map(async wallet => {
          const [transactions, currency] = await Promise.all([
            this.fetchTransaction(wallet.walletId),
            axios.get(`http://26.255.57.122:5260/api/Currency/GetById/${wallet.currencieId}`)
          ]);

          const rateRatio = currency.data.rate / this.dollarRate;

          transactions.forEach(transaction => {
            const amount = transaction.amount * rateRatio;
            if (transaction.typeOperation == 1) {
              totalIncome += amount;
            } else if (transaction.typeOperation == 3) {
              totalExpense += amount;
            }
          });
          totalBalance += rateRatio * wallet.balance
        });

        await Promise.all(walletPromises);
        const balanceStore = useBalanceStore();
        balanceStore.updateBalance(
          parseFloat(totalBalance.toFixed(3)),
          parseFloat(totalIncome.toFixed(3)),
          parseFloat(totalExpense.toFixed(3))
        );

      } catch (error) {
        console.log('Ошибка расчета баланса: ', error);
      }
    },
  },

  async mounted() {
    await this.calculateBalance();
  },
}
</script>


<style>
  @import './balance-card.css';
</style>
