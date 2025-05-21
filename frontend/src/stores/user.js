import { defineStore } from 'pinia';

export const useUserStore = defineStore('user', {
    state: () => ({
            username: '',
            email: '',
            userId: '',
            isAuthenticated: false
    }),
    actions: {
        init() {
            const keys = Object.keys(localStorage).filter(key => key.startsWith('user_'));
            if (keys.length > 0) {
                const userData = JSON.parse(localStorage.getItem(keys[0]));
                this.login(userData);
            }
        },
        login(userData) {
            this.username = userData.username;
            this.email = userData.email;
            this.userId = userData.userId;
            this.isAuthenticated = true;
            localStorage.setItem(`user_${this.userId}`, JSON.stringify(userData));
        },
        logout() {
            const userIdToRemove = this.userId;
            this.username = '';
            this.email = '';
            this.userId = '';
            this.isAuthenticated = false;
            localStorage.removeItem(`user_${userIdToRemove}`);
        }

    }
});