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
        <button class="end-overlay-button" @click="addCheque()">Добавить</button>
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
            'income': transaction.typeOperation === 3,
            'expense': transaction.typeOperation === 1
          }">
          {{ transaction.typeOperation === 3 ? "+" : "-"}} {{ transaction.amount }} {{ currencySymbol }}
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
        this.BalanceValue = parseFloat(response.data.balance.toFixed(3));
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
          typeOperation: 3,
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
        this.incomeAmount = null;
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
          typeOperation: 1,
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
        this.expenseAmount = null;
        this.description = '';
        this.selectedCategory = '';
        await this.loadHistory();
      }
    },

    async addCheque() {

      const apiKey = '6d207e02198a847aa98d0a2a901485a5'

      if (!this.selectedFile) {
        return;
      }

      try {
        const proxyUrl = "https://cors-anywhere.herokuapp.com/";
        const targetUrl = "https://freeimage.host/api/1/upload";
        const formData = new FormData();
        formData.append('key', apiKey);
        formData.append('source', this.selectedFile);
        console.log('hui');    
        const response = await axios.post(proxyUrl + targetUrl, formData, {
          headers: {'Content-Type': 'multipart/form-data'},
          withCredentials: false
        });
        console.log('hui2'); 
        
        const imageUrl = response.data.image.url;
        console.log('URL изображения: ', imageUrl);

        await axios.post(`http://26.255.57.122:5260/api/attachment/CreatеTransForAttachment/${this.walletId}`, {
          filePath: imageUrl
        },{
          withCredentials: false
        })

      } catch (error) {
         console.log ('Ошибка загрузки чека:', error);
      }

      this.showChequeOverlay = false;
      this.selectedFile = null;
      await this.loadHistory();
      await this.loadWalletData();
    },
    
    handleFileUpload(event) {
      this.selectedFile = event.target.files[0];
    },

    formatDate(dateString) {
      const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
      return new Date(dateString).toLocaleDateString('ru-RU', options);
    },

    getCategoryName(categoryId) {
      const category = this.categories.find(c => c.id === categoryId);
      return category ? category.name : 'Неизвестно';
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