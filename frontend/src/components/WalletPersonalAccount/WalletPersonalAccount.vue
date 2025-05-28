<template>
    <div class="background-all">
        <span class="title-wallet">Кошельки и счета</span>
            <div class="box-wallets">
                <button 
                    v-for="(wallet) in wallets.slice(0, 3)" 
                    :key="wallet.id"
                    class="background-wallet"
                    @click="this.$router.push(`/History/${wallet.walletId}`);">
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
                
                <button class="add-wallet-button" @click="showOverlay = true">
                    <img class="svg-image-icons-wallet" src="@/assets/icons/+.svg" alt="+">
                </button>
            </div>

        </div>

        <div v-if="showOverlayAll" class="box-overlay" @click.self="closeOverlayAll">
            <div class="background-overlay">
                <span class="close" @click.stop="closeOverlayAll">&times;</span>
                <span class="title-all-wallets">Все кошельки</span>
                
                <div v-for="(item, index) in items" :key="index" class="wallet-box">
                    <span class="counter-wallet">{{ index + 1 }}.</span>

                    <div class="image-button-all"> 
                        <img class="svg-image-icons-all" src="@/assets/icons/icons-wallet/1.svg" alt="icon">
                    </div>

                    <span class="wallet-name">Название кошелька</span>

                    <button class="settings-wallet-button" @click="openOverlaySettings">
                        <img class="svg-image-pencil-all" src="@/assets/icons/pencil.svg" alt="pencil">
                    </button>
                </div>

                <button @click="Addqwe">sdfsdf</button>

            </div>
        </div>

        <div v-if="showOverlaySettings" class="box-overlay" @click.self="closeOverlaySettings">
            <div ></div>
            <div class="background-overlay">
                <span class="close" @click.stop="closeOverlaySettings">&times;</span>
                <span class="title-all-wallets">Настройки кошелька</span>

                <span class="title-name-settings">Текущее название: {{ walletName}}</span>
                <span class="title-name-settings">Измение названия:</span>
                <input type="text" placeholder="Название кошелька" class="input-name-wallet" >
                <div>
                    <button type="submit" class="confirm-settings-button" @click="close">Добавить</button>
                </div>

            </div>
        </div>

        <div v-if="showOverlay" class="box-overlay" @click.self="closeOverlay">
            <div class="background-overlay">
                <span class="close" @click="closeOverlay">&times;</span>
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

                    <input type="text" placeholder="Название кошелька" class="input-name-wallet">
                    <div>
                        <button type="submit" class="add-button" @click="createWallet()">Добавить</button>
                    </div>
                </div>
            </div>
        </div>
</template>

<script>
import axios from 'axios';
import { useUserStore } from '@/stores/user';
import { useWalletStore } from '@/stores/wallet'
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
            walletId: '',
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
            showOverlay: false,
            showOverlayAll: false,
            showOverlaySettings: false,
            Picture: '',
            items: [{ 
                categoryName: '', 
                limit: '' 
            }],
        };
    },
    methods: {
       
    },
    methods: {
        Addqwe(index){
            this.items.push({ 
                categoryName: '', 
                limit: '' 
            });
        },
        selectIcon(icon) {
            this.selectedIcon = icon;
        },
        closeOverlay() {
            this.showOverlay = false;
        },
        closeOverlayAll() {
            this.showOverlayAll = false;
        },
        openOverlaySettings() {
            this.showOverlaySettings = true;
            this.showOverlayAll = false;
        },
        closeOverlaySettings() {
            this.showOverlaySettings = false;
        },
        selectCurrency(currency) {
            this.selectedCurrency = currency;
        },
        async createWallet() {
            const userStore = useUserStore();
            const walletStore = useWalletStore();

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