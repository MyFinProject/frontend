<template>
  <div class="balance-back">
    <span class="wallet-elements">Название счета: {{ NameWallet }}</span>
    <span class="wallet-elements">Баланс: {{ BalanceValue }}</span>
    <div class="button-page-box">
      <button class="operations-button" @click="showIncomeOverlay = true">Добавить доходы</button>
      <button class="operations-button" @click="showExpenseOverlay = true">Добавить расходы</button>
      <button class="operations-button" @click="showChequeOverlay = true">Добавить чек</button>
    </div>

    <div v-if="showIncomeOverlay" class="overlay-box">
      <div class="overlay-background">
        <span class="close" @click="showIncomeOverlay = false">&times;</span>
        <span class="title-overlay">Добавление доходов</span>
        <span class="question-title">Введите сумму:</span>
        <input class="input-imcome-exp" type="text" placeholder="Введите сумму" v-model="incomeAmount" required>
        <span class="question-title">Введите описание:</span>
        <input class="input-imcome-exp" type="text" placeholder="Введите описание" v-model="description" required>
        <button class="end-overlay-button" @click="addIncome">Добавить</button>
      </div>
    </div>

    <div v-if="showExpenseOverlay" class="overlay-box">
      <div class="overlay-background">
        <span class="close" @click="showExpenseOverlay = false">&times;</span>
        <span class="title-overlay">Добавление расходов</span>
        <span class="question-title">Введите сумму:</span>
        <input class="input-imcome-exp" type="text" placeholder="Введите сумму" v-model="expenseAmount" required>
        <span class="question-title">Введите описание:</span>
        <input class="input-imcome-exp" type="text" placeholder="Введите описание" v-model="description" required>
        <button class="end-overlay-button" @click="addExpense">Добавить</button>
      </div>
    </div>

    <div v-if="showChequeOverlay" class="overlay-box">
      <div class="overlay-background">
        <span class="close" @click="showChequeOverlay = false">&times;</span>
        <span class="title-overlay">Добавление чека</span>
        <span class="question-title">Добавьте фотографию:</span>
        <input id="fileInput" type="file" @change="handleFileUpload" accept="image/*" style="display: none">
        <label for="fileInput" class="custom-file-label">{{ selectedFile ? selectedFile.name : 'Загрузить чек' }}</label>
        <button class="end-overlay-button" @click="addCheque">Добавить</button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { useUserStore } from '@/stores/user';
import { useWalletStore } from '@/stores/wallet'

export default {
  data() {
    return {
      incomeAmount: 0,
      expenseAmount: 0,
      BalanceValue: null,
      selectedFile: null,
      NameWallet: '',
      currencyId: '',
      walletId: '',
      description: '',
      categoryId: '',
      categoryName: 'Undefined',
      showIncomeOverlay: false,
      showExpenseOverlay: false,
      showChequeOverlay: false,
      expensecategories: []
    }
  },
  created() {
    this.walletId = this.$route.params.walletId;

    this.loadWalletData();
  },
  methods: {

    async loadWalletData() {
      try {
        const response = await axios.get(`http://26.255.57.122:5260/api/wallets/${this.walletId}`);
        this.NameWallet = response.data.name;
        this.BalanceValue = response.data.balance;
        this.currencyId = response.data.currencieId;
      } catch (error) {
        console.error("Ошибка загрузки:", error);
      }
    },
    
    async addIncome() {
       
      try {
        const categoryResponse = await axios.get(`http://26.255.57.122:5260/api/category/GetAll`)
        this.categoryName = categoryResponse.data[1].name
        const categoryResponse2 = await axios.get(`http://26.255.57.122:5260/api/category/GetIdByName/${this.categoryName}`)
        this.categoryId = categoryResponse2.data

        this.incomeAmount = parseFloat(this.incomeAmount)

        if (this.incomeAmount < 0) {
          alert('Сумма не может быть отрицательной');
          return;
        }

        const response = await axios.post(`http://26.255.57.122:5260/api/Transaction`, {
          walletId: this.walletId,
          typeOperation: 1,
          amount: this.incomeAmount,
          categoryId: this.categoryId,
          currencieId: this.currencyId,
          description: this.description
        })

      } catch (error) {
          console.error("Детали ошибки:", {
          status: error.response?.status,
          data: error.response?.data,
          config: error.config?.url
        });
      }
      finally {
        this.showIncomeOverlay = false;
        this.incomeAmount = 0;
        this.description = '';
      }

    },
    handleFileUpload(event) {
      this.selectedFile = event.target.files[0];
    },
    addCheque() {
      if (this.selectedFile) {
        console.log('Файл для загрузки:', this.selectedFile);
      }
      this.showChequeOverlay = false;
      this.selectedFile = null;
    },
    addExpense() {
      this.showExpenseOverlay = false;
      this.expenseAmount = 0;
    }
  }
}
</script>

<style scoped>
@import './body-history.css';
</style>