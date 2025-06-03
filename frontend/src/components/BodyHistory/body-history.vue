<template>
  <div class="balance-back">
    <span class="wallet-elements">Название счета: {{ NameWallet }}</span>
    <span class="wallet-elements">Баланс: {{ BalanceValue }} {{ currencySymbol }}</span>
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
        <input class="input-income-exp" type="text" placeholder="Введите сумму" v-model="incomeAmount" required>
        <span class="question-title">Введите описание:</span>
        <input class="input-income-exp" type="text" placeholder="Введите описание" v-model="description" required>
        <button class="end-overlay-button" @click="addIncome">Добавить</button>
      </div>
    </div>

    <div v-if="showExpenseOverlay" class="overlay-box">
      <div class="overlay-background">
        <span class="close" @click="showExpenseOverlay = false">&times;</span>
        <span class="title-overlay">Добавление расходов</span>
        <span class="question-title">Введите сумму:</span>
        <input class="input-income-exp" type="text" placeholder="Введите сумму" v-model="expenseAmount" required>
        <span class="question-title">Введите описание:</span>
        <input class="input-income-exp" type="text" placeholder="Введите описание" v-model="description" required>
        <span class="question-title">Выберите категорию: </span>
        <select class="input-income-exp" v-model="selectedCategory" required>
          <option v-for="category in categories"
              :key="category.id"
              :value="category.name">
            {{ category.name }}
          </option>
        </select>
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

  <div class="page-container">
    <div class="history-title">
        <span>История WIP</span>
    </div>

    <div class="myhistory">
      <div v-if="history.length === 0" class="empty-history">
        <span>Нет операций</span>
      </div>

      <div v-for="transaction in history" :key="transaction.id" class="myhistory-element">
        <span class="date"> {{ formatDate(transaction.date) }} </span>
        <div class="category-value-row">
          <span class="category">{{ getCategoryName(transaction.categoryId) }}</span>
          <span :class="{
            'value': true,
            'income': transaction.typeOperation === 1,
            'expense': transaction.typeOperation === 3
          }">
          {{ transaction.typeOperation === 1 ? '+' : '-' }} {{ transaction.amount }} {{ currencySymbol }}
          </span>
        </div>
      </div>
    </div>
  
  </div>
</template>

<script>
import axios from 'axios';
import { useUserStore } from '@/stores/user';
import { useHistoryStore } from '@/stores/history';
import { mapState, mapActions } from 'pinia';

export default {
  computed: {
    ...mapState(useHistoryStore, ['history'])
  },
  data() {
    return {
      incomeAmount: null,
      expenseAmount: null,
      BalanceValue: null,
      selectedFile: null,
      selectedCategory: null,
      NameWallet: '',
      currencyId: '',
      walletId: '',
      description: '',
      categoryId: '',
      showIncomeOverlay: false,
      showExpenseOverlay: false,
      showChequeOverlay: false,
      categories: [{name: '', icon: ''}],
      currencySymbol: '',
      currencySymbols: {
        USD: '$',
        RUB: '₽',
        EUR: '€',
        CNY: '¥',
      }
    }
  },
  
  methods: {
    async loadWalletData() {
      try {
        const response = await axios.get(`http://26.255.57.122:5260/api/wallets/${this.walletId}`)
        this.NameWallet = response.data.name;
        this.BalanceValue = response.data.balance;
        this.currencyId = response.data.currencieId;
        await this.loadCurrencySymbol();
      } catch (error) {
        console.error("Ошибка загрузки кошелька:", error);
      }
    },

    async loadCurrencySymbol() {
      try {        
        const response = await axios.get(`http://26.255.57.122:5260/api/Currency/GetById/${this.currencyId}`);
        
        const currencyCode = response.data.code;
        this.currencySymbol = this.currencySymbols[currencyCode] || currencyCode; 
      } catch (error) {
        console.error("Ошибка загрузки символа валюты: ", error);
        this.currencySymbol = '';
      }
    },
    
    async loadHistory(){
      try {
        const historyStore = useHistoryStore();
        await historyStore.fetchHistory(this.walletId);
      } catch (error) {
        console.error('Ошибка загрузки истории:', error);
      }
    },

    async loadCategories(){
      try {
        const response = await axios.get(`http://26.255.57.122:5260/api/category/GetAll`)
        this.categories = response.data
      } catch (error) {
        console.log("Ошибка загрузки категорий:", error)
      }
    },

    async addIncome() {
      try {
        const categoryResponse = await axios.get(`http://26.255.57.122:5260/api/category/GetIdByName/Undefined`)
        this.categoryId = categoryResponse.data
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

        await this.loadWalletData();

      } catch (error) {
        console.error("Ошибка добавления дохода:", error);
      }
      finally {
        this.showIncomeOverlay = false;
        this.incomeAmount = 0;
        this.description = '';
        this.selectedCategory = '';
        await this.loadHistory();
      }
    },

    async addExpense() {
      try {
        if (this.expenseAmount < 0) {
          alert('Сумма не может быть отрицательной');
          return;
        }

        const categoryResponse = await axios.get(`http://26.255.57.122:5260/api/category/GetIdByName/${this.selectedCategory}`)
        this.categoryId = categoryResponse.data
        this.expenseAmount = parseFloat(this.expenseAmount)

        const response = await axios.post(`http://26.255.57.122:5260/api/Transaction`, {
          walletId: this.walletId,
          typeOperation: 3,
          amount: this.expenseAmount,
          categoryId: this.categoryId,
          currencieId: this.currencyId,
          description: this.description
        })

        await this.loadWalletData();

      } catch (error) {
        console.error("Ошибка добавления расхода:", error);
      }
      finally {
        this.showExpenseOverlay = false;
        this.expenseAmount = 0;
        this.description = '';
        this.selectedCategory = '';
        await this.loadHistory();
      }
    },

    async addCheque() {
      // const apiKey = '15c5acf8fd878311ecfc74e2727d0b5a'

      // if (!this.selectedFile) {
      //  return;
      // }

      // try {
      //   const formData = new FormData();
      //   formData.append('key', apiKey);
      //   formData.append('image', this.selectedFile);
            
      //   const response = await axios.post('https://api.imgbb.com/1/upload', formData, {headers: {'Content-Type': 'multipart/form-data'}});
        
      //   const imageUrl = response.data.data.url;
      //   console.log('URL изображения: ', imageUrl);

      //   // await axios.post(`http://26.255.57.122:5260/api/attachment/CreateTransForAttachment/${this.walletId}`, {
      //   //   filePath: base64Photo
      //   // })

      // } catch (error) {
      //    console.log ('Ошибка загрузки чека:', error);
      // }

      // this.showChequeOverlay = false;
      // this.selectedFile = null;
    },
    
    handleFileUpload(event) {
      this.selectedFile = event.target.files[0];
    },

    formatDate(dateString) {
      const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
      return new Date(dateString).toLocaleDateString('ru-RU', options);
    },

    async getCategoryName(categoryId) {
      const category = this.categories.find(cat => cat.id === categoryId);
      return category ? category.name : 'Неизвестно';

      // async getCategoryName(categoryId) {
      // const category = await axios.get(`http://26.255.57.122:5260/api/category/${categoryId}`);
      // const categoryName = category.data.name
      // console.log(category.data.name)
      // return categoryName;
    },
  },

  async mounted() {
    this.walletId = this.$route.params.walletId;
    this.loadWalletData();
    this.loadCategories();
    await this.loadHistory();
  }

}
</script>

<style scoped>
@import './body-history.css';
</style>