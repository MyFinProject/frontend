import { defineStore } from 'pinia'

export const useBalanceStore = defineStore('balance', {
  state: () => ({
    balance: 0,
    income: 0,
    expense: 0,
    needsUpdate: true
  }),
  actions: {
    setNeedsUpdate(value) {
      this.needsUpdate = value;
    },
    updateBalance(newBalance, newIncome, newExpense) {
      this.balance = newBalance;
      this.income = newIncome;
      this.expense = newExpense;
      this.needsUpdate = false;
    }
  }
})