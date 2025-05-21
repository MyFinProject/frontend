<template>
    <button class="back-button" @click="$router.push('/')">Назад</button>
    <span class="MyFin">MyFin</span>
    <span class="input-row-label">Вход</span>
    <input v-model="username" class="input-row" type="text" placeholder="Введите имя пользователя">
    <input v-model="password" class="input-row" type="password" placeholder="Введите пароль">
    <button class="registration-button" @click="login">Войти</button>
    <div class="centered-row">
        <span class="question">Нет аккаунта? →</span>
        <button class="registration-button" @click="$router.push('/Registration')">Зарегистрироваться</button>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    data() {
        return {
            username: '',
            email: '',
            password: '',
            isLoading: false,
        }
    },
    methods: {
        async login(){

            console.log('Test');
            this.isLoading = true;
            
            try {
                const response = await axios.get(`http://26.255.57.122:5260/api/controller/login`, {
                    username: this.username,
                    password: this.password
                });
                
                console.log('Логин и пароль', response.data);

                const userTokenResponse = (await axios.get(`http://26.255.57.122:5260/api/controller/decode/${response.data.token}`));
                this.email = response.data.email;
                
                const userStore = useUserStore();
                userStore.login({
                    username: this.username,
                    email: this.email,
                    userId: userTokenResponse.data,
                    isAuthenticated: true
                });

                this.$router.push('/PersonalAccount'); 

            } catch (error) {
                console.error('Ошибка:', error.message);
            } finally {
                this.isLoading = false;
            }
        }
    }
}
</script>

<style scoped>
@import './log-in-field.css';
</style>