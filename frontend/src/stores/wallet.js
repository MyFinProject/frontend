import { defineStore } from 'pinia';
import axios from 'axios'

export const useWalletStore = defineStore('wallets', {
    state: () => ({
        wallets: [],
        isLoading: false,
        needBalanceUpdate: false
    }),
    actions:{
        async fetchWallets(userId){
            this.isLoading = true
            try {
                const response = await axios.get(`http://26.255.57.122:5260/api/wallets/AllByUserId/${userId}`)
                this.wallets = response.data
            } catch(error) {
                console.error('Ошибка загрузки кошельков: ', error)
            } finally {
                this.isLoading = false
            }
        },
        async addWallet(userId, data){
            this.isLoading = true
            try {
                await axios.post(`http://26.255.57.122:5260/api/wallets/${userId}`, data);
                const response = await axios.get(`http://26.255.57.122:5260/api/wallets/AllByUserId/${userId}`);
                this.wallets = response.data
            }
            catch(error){
                console.error('Ошибка создания кошелька: ', error)
            }
        },
        async deleteWallet(userId, walletId){
            this.isLoading = true
            try {
                await axios.delete(`http://26.255.57.122:5260/api/wallets/DeleteWallet/${walletId}`);
                const response = await axios.get(`http://26.255.57.122:5260/api/wallets/AllByUserId/${userId}`);
                this.wallets = response.data
            }
            catch(error){
                console.error('Ошибка удаления кошелька: ', error)
            }
        }
    }
})