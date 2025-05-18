<template>
    <button class="back-button" @click="$router.push('/')">Назад</button>
    <span class="MyFin">MyFin</span>
    <span class="input-row-label">Вход</span>
    <input v-model="username" class="input-row" type="text" placeholder="Введите имя пользователя">
    <input v-model="email" class="input-row" type="text" placeholder="Введите почту">
    <input v-model="password" class="input-row" type="password" placeholder="Введите пароль">
    <button class="registration-button" @click="$router.push('/PersonalAccount')">Войти</button>
    <div class="centered-row">
        <span class="question">Нет аккаунта? →</span>
        <button class="registration-button" @click="$router.push('/Registration')">Зарегистрироваться</button>
    </div>
</template>

<script>
export default {
    data() {
        return {
            username: '',
            email: '',
            password: '',
        }
    },
    methods: {
    }
}
</script>

<style scoped>
@import './log-in-field.css';
</style>