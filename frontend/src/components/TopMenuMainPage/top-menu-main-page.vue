<template>
    <div class="top-menu">
      <button class="logo" @click="$router.push('/')">MyFin</button>
      <div class="right-buttons">
        <button class="SingIn-button" @click="$router.push('/SingIn')">зарегистрироваться</button>
        <button class="log-in-button" @click="$router.push('/LogIn')">Log in</button>
      </div>
    </div>  
  </template>

  
<style>
@import './top-menu-main-page.css';
</style>
