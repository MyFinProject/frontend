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
        <input class="input-imcome-exp" type="text" placeholder="Введите сумму">
        <span class="question-title">Введите описание:</span>
        <input class="input-imcome-exp" type="text" placeholder="Введите описание">
        <button class="end-overlay-button" @click="addIncome">Добавить</button>
      </div>
    </div>

    <div v-if="showExpenseOverlay" class="overlay-box">
      <div class="overlay-background">
        <span class="close" @click="showExpenseOverlay = false">&times;</span>
        <span class="title-overlay">Добавление расходов</span>
        <span class="question-title">Введите сумму:</span>
        <input class="input-imcome-exp" type="text" placeholder="Введите сумму">
        <span class="question-title">Введите описание:</span>
        <input class="input-imcome-exp" type="text" placeholder="Введите описание">
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
export default {
  data() {
    return {
      BalanceValue: 0,
      NameWallet: 'sdssdfsdf',
      showIncomeOverlay: false,
      showExpenseOverlay: false,
      showChequeOverlay: false,
      incomeAmount: '',
      expenseAmount: '',
      selectedFile: null
    }
  },
  methods: {
    addIncome() {
      this.showIncomeOverlay = false;
      this.incomeAmount = 0;
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