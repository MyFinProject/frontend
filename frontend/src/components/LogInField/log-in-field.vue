<template>
    <button class="back-button" @click="$router.push('/')">Назад</button>
    <span class="MyFin">MyFin</span>
    <span class="input-row-label">Вход</span>
    <input v-model="username" class="input-row" type="text" placeholder="Введите имя пользователя">
    <input v-model="password" class="input-row" type="password" placeholder="Введите пароль">
    <div v-if="Error" class="error-message">{{ error }}</div>
    <button class="log-in-end" @click="login">Войти</button>
    <div class="centered-row">
        <span class="question">Нет аккаунта? →</span>
        <button class="sing-in-button" @click="$router.push('/SingIn')">Зарегистрироваться</button>
    </div>
</template>

<script>
import axios from 'axios';
import { useUserStore } from '@/stores/user';
import { storeToRefs } from 'pinia';

export default {
    data() {
        return {
            username: '',
            email: '',
            password: '',
            error: '',
            isLoading: false
        }
    },
    methods: {
        async login(){            
            this.isLoading = true;
            const userStore = useUserStore();
            const { isAuthenticated } = storeToRefs(userStore);
            if (isAuthenticated.value) {
                this.error = 'Пользователь уже авторизован';    
                console.error('Ошибка: Пользователь уже авторизован');
            }
            else {
                try {
                    const response = await axios.post(`http://26.255.57.122:5260/api/controller/login`, {    
                        username: this.username.trim(),
                        password: this.password.trim()
                    });
                    
                    const userTokenResponse = (await axios.get(`http://26.255.57.122:5260/api/controller/decode/${response.data.token}`));
                    this.email = response.data.email;
                    
                    userStore.login ({
                        username: this.username.trim(),
                        email: this.email.trim(),
                        userId: userTokenResponse.data,
                        isAuthenticated: true
                    });

                    this.$router.push('/PersonalAccount'); 
                } catch (error) {
                    this.error = 'Неверный логин или пароль';
                    console.error('Полная ошибка:', error.message);
                } finally {
                    this.isLoading = false;
                }
            }
        }
    }
}
</script>

<style scoped>
@import './log-in-field.css';
</style>