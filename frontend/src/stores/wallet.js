import { defineStore } from 'pinia';

export const useWalletStore = defineStore('wallet', {
    state: () => ({
        wallets: [],
        defaultIcon: '@/assets/icons/icons-wallet/1.svg'
    }),

    actions: {
        async fetchWallets(userId) {
            const response = await axios.get(`/api/wallets/${userId}`);
            const localWallets = JSON.parse(localStorage.getItem('wallets')) || [];
            const iconMap = new Map(localWallets.map(w => [w.id, w.iconPath]));
            
            this.wallets = response.data.map(w => ({
                ...w,
                iconPath: iconMap.get(w.id) || this.defaultIcon
            }));
            
            this.save();
        },

        save() {
            localStorage.setItem('wallets', JSON.stringify(this.wallets));
        }
    }
});