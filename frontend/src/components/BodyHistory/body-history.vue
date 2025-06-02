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
      <div class="myhistory-element">
        <span class="date"> date </span>
          <div class="category-value-row">
            <span class="category">category</span>
            <span class="value">value</span>
          </div>
      </div>
    </div>
  </div>
  
</template>

<script>
import axios from 'axios';

export default {
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
      categories: [{name: '', icon: ''}]
    }
  },
  
  methods: {
    async loadWalletData() {
      try {
        const response = await axios.get(`http://26.255.57.122:5260/api/wallets/${this.walletId}`)
        this.NameWallet = response.data.name;
        this.BalanceValue = response.data.balance;
        this.currencyId = response.data.currencieId;
      } catch (error) {
        console.error("Ошибка загрузки кошелька:", error);
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
    }
  },

  async mounted() {
    this.walletId = this.$route.params.walletId;
    this.loadWalletData();
    this.loadCategories()
  }

}
</script>

<style scoped>
@import './body-history.css';
</style>