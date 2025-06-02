import { defineStore } from 'pinia'
import axios from 'axios';

export const useBudgetStore = defineStore('budget', {
  state: () => ({
    budgets: [],
  }),
  actions: {
    async fetchBudgets(userId){
        try {
            const response = await axios.get(`http://26.255.57.122:5260/GetAllByUserId/${userId}`)
            this.budgets = response.data
        } catch (error) {
            console.error('Ошибка загрузки ограничений: ', error)
        }
    },

    async addBudget(data){
        try {
            await axios.post(`http://26.255.57.122:5260/Create`, data)
        } catch (error) {
            console.error('Ошибка создания ограничения: ', error)
        }
    },

    async deleteBudget(budgetId){
        try {
            await axios.delete(`http://26.255.57.122:5260/Delete/${budgetId}`)
        } catch (error) {
            console.error('Ошибка удаления ограничения: ', error)
        }
    },

    async updateBudget(budgetId, data){
        try {
            await axios.put(`http://26.255.57.122:5260/Update/${budgetId}`, data)
        } catch (error) {
            console.error('Ошибка создания ограничения: ', error)
        }
    }
  }
})