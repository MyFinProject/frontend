<template>
    <div class="transfer">
      <p class="future-goals-text">Ваши ограничения на категории:</p>
      <div 
        v-for="(budget, index) in budgets" 
        :key="index" 
        class="category-name">
        
        <div class="goal-container">
          <span class="counter-goals">{{ index + 1 }}.</span>
          <span class="category-name"> {{ budget.name }} </span>
          <span class="limit">{{ budget.amount }}</span>
          <button class="settings-wallet-button" @click="openOverlay(index)">
              <img class="svg-image-pencil" src="@/assets/icons/pencil.svg" alt="pencil">
          </button>
          <button class="settings-wallet-button" @click="removeBudget(index)">
              <img class="svg-trash" src="@/assets/icons/trash.svg" alt="trash">
          </button>
          
        </div>
      </div>
      <button class="button-add" @click="openCreateBudgetOverlay()">Добавить ограничение</button>

      <div v-if="showCreateBudgetOverlay" class="overlay-box">
        <div class="overlay-background">
          <span class="close" @click="closeCreateBudgetOverlay()">&times;</span>
          <span class="create-budget-overlay-title">Добавление ограничения</span>
          <div>
            <span class="new-wallet-questions-title">Выберите валюту</span>
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
          <span class="new-wallet-questions-title">Введите ограничение</span>
          <input type="text" placeholder="Ограничение" class="input-name-wallet" v-model="limit" required>
          <span class="new-wallet-questions-title">Введите название для ограничения</span>
          <input type="text" placeholder="Название ограничения" class="input-name-wallet" v-model="budgetName" required>
          <span class="new-wallet-questions-title">Выберите категорию</span>
          <select class="input-income-exp" v-model="selectedCategory" required>
            <option v-for="category in categories"
                :key="category.id"
                :value="category">
              {{ category.name }}
            </option>
          </select>
          <div>
              <button type="submit" class="add-button" @click="addBudget()">Добавить</button>
          </div>
        </div>
      </div>

      <div v-if="showOverlay" class="overlay-box">
        <div class="overlay-background">
          <span class="close" @click="closeOverlay">&times;</span>
            <span class="category-name-overlay">Название категории</span>
            <span class="questions-editing">Изменение названия:</span>
            <input v-model="newBudgetName" class="edit-input" placeholder="Название ограничения">
            <span class="questions-editing">Изменение ограничения:</span>
            <input v-model="newlimit" class="edit-input" placeholder="Ограничение">
            <button class="save-button" @click="changeBudget()">Сохранить</button>
        </div>
      </div>


    </div>
</template>

<script>
import axios from 'axios';
import { useUserStore } from '@/stores/user';
import { useBudgetStore } from '@/stores/budget';
import { mapState } from 'pinia';

export default {
  computed: {
      ...mapState(useBudgetStore, ['budgets'])
  },
  data() {
    return {
      limit: null,
      newlimit: null,
      selectedCurrency: null,
      selectedCategory: null,
      showCreateBudgetOverlay: false,
      showOverlay: false,
      editedIndex: -1,
      editedItem: { value: '' },
      budgetName: '',
      newBudgetName: '',
      currencies: [{ symbol: '$', code: 'USD', path:  new URL('@/assets/icons/icons-wallet-currency/dollar.svg', import.meta.url).href},
                  { symbol: '¥', code: 'CHY', path:  new URL('@/assets/icons/icons-wallet-currency/yuan.svg', import.meta.url).href},
                  { symbol: '₽', code: 'RUB', path:  new URL('@/assets/icons/icons-wallet-currency/rub.svg', import.meta.url).href}],
      categories: [{name: '', icon: ''}]
    }
  },
  methods: {
    selectCurrency(currency) {
      this.selectedCurrency = currency;
    },
    
    openCreateBudgetOverlay(){
      this.showCreateBudgetOverlay = true;
    },
    
    closeCreateBudgetOverlay(){
      this.showCreateBudgetOverlay = false;
    },
    
    openOverlay(index) {
      this.editedIndex = index
      this.editedItem = { ...this.budgets[index] }
      this.showOverlay = true
    },
    
    closeOverlay() {
      this.showOverlay = false
    },


    async changeBudget(){
      const userStore = useUserStore();
      const budgetStore = useBudgetStore();

      if (this.budgets[this.editedIndex].currencyId < 0) {
          alert('Сумма не может быть отрицательной');
          return;
      }

      const data = {
        userId: userStore.userId,
        categoryId: this.budgets[this.editedIndex].categoryId,
        amount: parseFloat(this.newlimit),
        currencyId: this.budgets[this.editedIndex].currencyId,
        name: this.newBudgetName
      }

      await budgetStore.updateBudget(this.budgets[this.editedIndex].budgetId, data);
      await budgetStore.fetchBudgets(userStore.userId)
      
      this.closeOverlay();
    },
    
    async removeBudget(index) {
      const userStore = useUserStore();
      const budgetStore = useBudgetStore();
      await budgetStore.deleteBudget(this.budgets[index].budgetId);
      await budgetStore.fetchBudgets(userStore.userId)
    },
    
    async addBudget() {
      const userStore = useUserStore();
      const budgetStore = useBudgetStore();

      if (!this.selectedCurrency || !this.limit || !this.budgetName || !this.selectedCategory) {
        alert('Заполните все обязательные поля');
        return;
      }
      
      if (this.limit < 0) {
          alert('Сумма не может быть отрицательной');
          return;
      }

      const [currencyResponse, categoryResponse] = await Promise.all([
        axios.get(`http://26.255.57.122:5260/api/Currency/GetByCode/${this.selectedCurrency.code}`),
        axios.get(`http://26.255.57.122:5260/api/category/GetIdByName/${this.selectedCategory.name}`)
      ]);

      const budgetData = {
        userId: userStore.userId,
        categoryId: categoryResponse.data,
        amount: parseFloat(this.limit),
        currencyId: currencyResponse.data,
        name: this.budgetName.trim(),
      };

      await budgetStore.addBudget(budgetData);

      this.limit = null;
      this.budgetName = '';
      this.selectedCategory = null;
      this.selectedCurrency = null;

      await budgetStore.fetchBudgets(userStore.userId)
      this.closeCreateBudgetOverlay();

    },

    async loadCategories(){
      try {
        const response = await axios.get(`http://26.255.57.122:5260/api/category/GetAll`)
        this.categories = response.data
      } catch (error) {
        console.log("Ошибка загрузки категорий:", error)
      }
    },

  },
  
  async mounted() {
    this.loadCategories()

    const userStore = useUserStore();
    const budgetStore = useBudgetStore();

    await budgetStore.fetchBudgets(userStore.userId)
  }
}
</script>

<style scoped>
@import './transfer.css';
</style>