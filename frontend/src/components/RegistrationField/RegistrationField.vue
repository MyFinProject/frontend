<template>
    <button class="back-button" @click="$router.push('/')">назад</button>
    <span class = 'MyFin'>MyFin</span>
    <span class = "input-row-label">Регистрация</span>
    <input class = 'input-row' type="text" placeholder="Введите имя пользователя">
    <input class = 'input-row' type="text" placeholder="Введите почту">
    <input class = 'input-row' type="text" placeholder="Введите пароль">
    <button class="button-persona-account" @click="$router.push('/PersonalAccount')">лк</button>
</template>

<style scoped>
@import './registration-field.css';
</style>