<template>
    <div class="background-all">
        <span class="title-wallet">Кошельки и счета</span>
            <div class="box-wallets">
                <button 
                    v-for="(wallet) in wallets.slice(0, 3)" 
                    :key="wallet.id"
                    class="background-wallet">
                    <img 
                        class="svg-image-icons-wallet" 
                        :src="wallet.imageAdress"
                        alt="?">
                </button>

                <button 
                    v-if="wallets.length > 3"
                    class="more-wallets-button"
                    @click="showAllWallets = !showAllWallets">
                   <img class="svg-image-icons-wallet" src="@/assets/icons/+.svg" alt="...">
                </button>
                <button class="add-wallet-button" @click="showModal = true">
                    <img class="svg-image-icons-wallet" src="@/assets/icons/+.svg" alt="+">
                </button>
            </div>
        <div v-if="showModal" class="box-overlay">
            <div class="background-overlay">
                <span class="close" @click="showModal = false">&times;</span>
                <span class="title-new-wallet">Добавить новый кошелек</span>
                <div> 
                    <div>
                        <span class="new-wallet-questions-title">Выберите валюту для кошелька</span>
                        <div class="currency-settings">
                            <button 
                                v-for="currency in currencies" 
                                :key="currency.symbol"
                                class="currency-button"
                                :class="{ 'selected-currency': selectedCurrency === currency }"
                                @click="selectCurrency(currency)">
                               <img 
                                    class="svg-image-currency" 
                                    :src="currency.path"
                                    :alt="currency.symbol">
                            </button>
                        </div>
                    </div>
                    <div>
                        <span class="new-wallet-questions-title">Выберите картинку, которая будет отображаться</span>
                        <div class="icon-settings">
                            <button
                                v-for="icon in icons"
                                :key="icon.id"
                                class="image-button"
                                :class="{ 'selected-icon': selectedIcon === icon }"
                                @click="selectIcon(icon)">
                                <img
                                    class="svg-image-icons"
                                    :src="icon.path"
                                    :alt="icon.id">
                            </button>
                        </div>
                    </div>
                    
                    <span class="new-wallet-questions-title">Введите название для кошелька</span>

                    <input type="text" placeholder="Название кошелька" class="input-name-wallet" v-model="walletName" required>
                    <div>
                        <button type="submit" class="add-button" @click="createWallet()">Добавить</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import { useUserStore } from '@/stores/user';
import { useWalletStore } from '@/stores/wallet'
import { storeToRefs } from 'pinia';
import { mapState } from 'pinia';

export default {
    computed: {
        ...mapState(useWalletStore, ['wallets', 'isLoading'])
    },
    data() {
        return {
            showModal: false,
            showAllWallets: false,
            walletName: '',
            Picture: '',
            selectedCurrency: null,
            selectedIcon: null,
            currencies: [{ symbol: '$', code: 'USD', path:  new URL('@/assets/icons/icons-wallet-currency/dollar.svg', import.meta.url).href},
                         { symbol: '¥', code: 'CHY', path:  new URL('@/assets/icons/icons-wallet-currency/yuan.svg', import.meta.url).href},
                         { symbol: '₽', code: 'RUB', path:  new URL('@/assets/icons/icons-wallet-currency/rub.svg', import.meta.url).href}],
            icons: [{ id: 1, path: new URL('@/assets/icons/icons-wallet/1.svg', import.meta.url).href},
                    { id: 2, path: new URL('@/assets/icons/icons-wallet/2.svg', import.meta.url).href},
                    { id: 3, path: new URL('@/assets/icons/icons-wallet/3.svg', import.meta.url).href},
                    { id: 4, path: new URL('@/assets/icons/icons-wallet/4.svg', import.meta.url).href},
                    { id: 5, path: new URL('@/assets/icons/icons-wallet/5.svg', import.meta.url).href},
                    { id: 6, path: new URL('@/assets/icons/icons-wallet/6.svg', import.meta.url).href},
                    { id: 7, path: new URL('@/assets/icons/icons-wallet/7.svg', import.meta.url).href},
                    { id: 8, path: new URL('@/assets/icons/icons-wallet/8.svg', import.meta.url).href},],
        };
    },
    methods: {
        selectIcon(icon) {
            this.selectedIcon = icon;
        },
        selectCurrency(currency) {
            this.selectedCurrency = currency;
        },
        async createWallet() {
            const userStore = useUserStore();
            const walletStore = useWalletStore();
            const { userId } = storeToRefs(userStore);

            if (!this.selectedCurrency || !this.selectedIcon || !this.walletName.trim()) {
                alert('Заполните все обязательные поля');
                return;
            }

            let currencyId = '';
            
            try {
                const currencyResponse = await axios.get(`http://26.255.57.122:5260/api/Currency/GetByCode/${this.selectedCurrency.code}`);
                currencyId = currencyResponse.data;
            }

            catch (error) {
                console.error('Ошибка:', error.message);
            }

            await walletStore.addWallet(userStore.userId, {
                name: this.walletName.trim(),
                currencieId: currencyId,
                ImageAdress: this.selectedIcon.path
            });
            
            await walletStore.fetchWallets(userStore.userId);
            
            this.walletName = '';
            this.selectedCurrency = null;
            this.selectedIcon = null;
            
            this.showModal = false;
        },
        closeModal() {
            this.showModal = false;
        }
    },
    async mounted(){
        const userStore = useUserStore()
        const walletStore = useWalletStore()
        if (userStore.userId) {
            await walletStore.fetchWallets(userStore.userId);
        }
    }
};
</script>

<style scoped>
@import './wallet-personal-account.css';
</style> 