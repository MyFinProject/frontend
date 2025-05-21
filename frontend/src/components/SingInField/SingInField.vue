<template>
    <button class="back-button" @click="$router.push('/')">Назад</button>
    <span class="MyFin">MyFin</span>
    <span class="input-row-label">Регистрация</span>
    <input v-model="username" class="input-row" type="text" placeholder="Введите имя пользователя">
    <input v-model="email" class="input-row" type="text" placeholder="Введите почту">
    <div v-if="passwordError" class="error-message">{{ error }}</div>
    <input v-model="password" class="input-row" type="password" placeholder="Введите пароль">
    <button class="sing-in-end" @click="register">Завершить регистрацию</button>
    <div class="centered-row">
        <span class="question">Есть аккаунт? →</span>
        <button class="log-in-button" @click="$router.push('/LogIn')">Войти</button>
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
            isLoading: false,
        }
    },
    methods: {
        validatePassword() {
            if (this.password.length < 8) {
                this.error = 'Пароль должен содержать минимум 8 символов';
                return false;
            }
            if (!/\d/.test(this.password)) {
                this.error = 'Пароль должен содержать хотя бы одну цифру';
                return false;
            }
            
            if (!/[A-ZА-Я]/.test(this.password)) {
                this.error = 'Пароль должен содержать хотя бы одну заглавную букву';
                return false;
            }

            if (!/[a-zа-я]/.test(this.password)) {
                this.error = 'Пароль должен содержать хотя бы одну строчную букву';
                return false;
            }
            
            this.error = '';
            return true;
        },
        async register() {
            if (!this.validatePassword()) {
                return; 
            }
            
            this.isLoading = true;

            try {
                const userStore = useUserStore();
                const { isAuthenticated } = storeToRefs(userStore);


                if (isAuthenticated.value) {
                    this.error = 'Пользователь уже авторизован. Вы не можете зарегистрировать новый аккаунт!';    
                    console.error('Ошибка: Пользователь уже авторизован');
                }
                
                else {
                    const response = await axios.post(`http://26.255.57.122:5260/api/controller/register`, {
                        username: this.username,
                        email: this.email,
                        password: this.password
                    });

                    const userTokenResponse = (await axios.get(`http://26.255.57.122:5260/api/controller/decode/${response.data.token}`));

                    userStore.login({
                        username: this.username,
                        email: this.email,
                        userId: userTokenResponse.data,
                        isAuthenticated: true
                    });

                    console.log('Успешная регистрация!');
                    this.$router.push('/PersonalAccount'); 
                }

            } catch (error) {
                console.error('Ошибка:', error.message);
                this.passwordError = 'Ошибка при отправке запроса';
            } finally {
                this.isLoading = false;
            }
        }
    }
}
</script>

<style scoped>
    @import './sing-in-field.css';
</style>