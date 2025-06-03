import { defineStore } from 'pinia'
import axios from 'axios';

export const useHistoryStore = defineStore('history', {
  state: () => ({
    history: [],
  }),
  actions: {
    async fetchHistory(walletId){
        try {
            const response = await axios.get(`http://26.255.57.122:5260/api/Transaction/GetAllByWalletId/${walletId}`)
            this.history = response.data.sort((a, b) => 
              new Date(b.date) - new Date(a.date)
            );
        } catch (error) {
            console.error('Ошибка загрузки истории: ', error)
        }
    }
  }
})