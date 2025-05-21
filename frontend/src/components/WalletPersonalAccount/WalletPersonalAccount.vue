<template>
    <div class="background-all">
        <span class="title-wallet">Кошельки и счета</span>

        <div class="box-wallets">
            <div class="background-wallet">
                <img class="svg-image-icons-wallet" src="@/assets/icons/icons-wallet/1.svg" alt="icon">
            </div>

            <button class="add-wallet-button" @click="showModal = true">
                <img class="svg-image-icons-wallet" src="@/assets/icons/+.svg" alt="+">
            </button>
        </div>

        

        <div v-if="showModal" class="box-overlay" @click.self="closeModal">
            <div class="background-overlay">
                <span class="close" @click="closeModal">&times;</span>
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

                    <input type="text" placeholder="Название кошелька" class="input-name-wallet" v-model="walletName" required>
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
            showModal: false,
            walletName: '',
            selectedCurrency: '',
            Picture: '',
        };
    },
    methods: {
        selectIcon(iconName) {
            this.Picture = iconName;
        },
        closeModal() {
            this.showModal = false;
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