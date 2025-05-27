<template>
    <div class="background-all">
        <span class="title-wallet">Кошельки и счета</span>

        <div class="box-wallets">
            <div class="background-wallet">
                <img class="svg-image-icons-wallet" src="@/assets/icons/icons-wallet/1.svg" alt="icon">
            </div>

            <button class="add-wallet-button" @click="showOverlay = true">
                <img class="svg-image-icons-wallet" src="@/assets/icons/+.svg" alt="+">
            </button>

            <button class="add-wallet-button" @click="showOverlayAll = true">
                <img class="svg-image-icons-wallet" src="@/assets/icons/+.svg" alt="+">
            </button>
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
                            <button class="currency-button" :class="{ 'selected': selectedCurrency === '$' }" @click="selectCurrency('$')"> 
                                <img class="svg-image-dollar" src="@/assets/icons/icons-wallet-currency/$.svg" alt="$">
                            </button>
                            <button class="currency-button" :class="{ 'selected': selectedCurrency === '¥' }" @click="selectCurrency('¥')"> 
                                <img class="svg-image-yuan" src="@/assets/icons/icons-wallet-currency/¥.svg" alt="¥">
                            </button>
                            <button class="currency-button" :class="{ 'selected': selectedCurrency === '₽' }" @click="selectCurrency('₽')"> 
                                <img class="svg-image-rub" src="@/assets/icons/icons-wallet-currency/₽.svg" alt="₽">
                            </button>
                        </div>
                    </div>
                    <div>
                        <span class="new-wallet-questions-title">Выберите картинку, которая будет отображаться</span>
                        <div class="currency-settings">
                            <button class="image-button"> 
                                <img class="svg-image-icons" src="@/assets/icons/icons-wallet/1.svg" alt="icon">
                            </button>
                            <button class="image-button"> 
                                <img class="svg-image-icons" src="@/assets/icons/icons-wallet/2.svg" alt="icon">
                            </button>
                            <button class="image-button"> 
                                <img class="svg-image-icons" src="@/assets/icons/icons-wallet/3.svg" alt="icon">
                            </button>
                            <button class="image-button"> 
                                <img class="svg-image-icons" src="@/assets/icons/icons-wallet/4.svg" alt="icon">
                            </button>
                            <button class="image-button"> 
                                <img class="svg-image-icons" src="@/assets/icons/icons-wallet/5.svg" alt="icon">
                            </button>
                            <button class="image-button"> 
                                <img class="svg-image-icons" src="@/assets/icons/icons-wallet/6.svg" alt="icon">
                            </button>
                            <button class="image-button"> 
                                <img class="svg-image-icons" src="@/assets/icons/icons-wallet/7.svg" alt="icon">
                            </button>
                            <button class="image-button"> 
                                <img class="svg-image-icons" src="@/assets/icons/icons-wallet/8.svg" alt="icon">
                            </button>
                        </div>
                    </div>
                    
                    <span class="new-wallet-questions-title">Введите название для кошелька</span>

                    <input type="text" placeholder="Название кошелька" class="input-name-wallet">
                    <div>
                        <button type="submit" class="add-button">Добавить</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            showOverlay: false,
            showOverlayAll: false,
            showOverlaySettings: false,
            walletName: 'asasdafd',
            selectedCurrency: '',
            Picture: '',
            items: [{ 
                categoryName: '', 
                limit: '' 
            }],
        };
    },
    methods: {
        Addqwe(index){
            this.items.push({ 
                categoryName: '', 
                limit: '' 
            });
        },
        selectIcon(iconName) {
            this.Picture = iconName;
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
    }
};
</script>

<style scoped>
@import './wallet-personal-account.css';
</style>