<template>
    <button class="back-button" @click="$router.push('/')">Назад</button>
    <span class="MyFin">MyFin</span>
    <span class="input-row-label">Регистрация</span>
    <input v-model="username" class="input-row" type="text" placeholder="Введите имя пользователя">
    <input v-model="email" class="input-row" type="text" placeholder="Введите почту">
    <div v-if="passwordError" class="error-message">{{ passwordError }}</div>
    <input v-model="password" class="input-row" type="password" placeholder="Введите пароль">
    <button class="sing-in-end" @click="register">Завершить регистрацию</button>
    <div class="centered-row">
        <span class="question">Есть аккаунт? →</span>
        <button class="log-in-button" @click="$router.push('/LogIn')">Войти</button>
    </div>
</template>

<script>
export default {
    data() {
        return {
            username: '',
            email: '',
            password: '',
            passwordError: '' 
        }
    },
    methods: {
        validatePassword() {
            if (this.password.length < 8) {
                this.passwordError = 'Пароль должен содержать минимум 8 символов';
                return false;
            }
            if (!/\d/.test(this.password)) {
                this.passwordError = 'Пароль должен содержать хотя бы одну цифру';
                return false;
            }
            
            if (!/[A-ZА-Я]/.test(this.password)) {
                this.passwordError = 'Пароль должен содержать хотя бы одну заглавную букву';
                return false;
            }

            if (!/[a-zа-я]/.test(this.password)) {
                this.passwordError = 'Пароль должен содержать хотя бы одну строчную букву';
                return false;
            }
            
            this.passwordError = '';
            return true;
        },
        register() {
            if (!this.validatePassword()) {
                return; 
            }
            console.log('Регистрация:', {
                username: this.username,
                email: this.email,
                password: this.password
            });
            this.$router.push('/PersonalAccount'); 
        }
    }
}
</script>

<style scoped>
    @import './sing-in-field.css';
</style>