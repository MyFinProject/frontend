<template>
  <div class="top-menu">
    <button class="logo" @click="$router.push('/')">MyFin</button>
    <div class="right-buttons">
      <button class="registration-button" @click="$router.push('/SingIn')">Зарегистрироваться</button>
      <button class="log-in-button" @click="$router.push('/LogIn')">Войти</button>
    </div>
  </div>  
</template>

<style scoped>
  @import './top-menu-main-page.css';
</style>
