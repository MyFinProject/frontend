<template>
    <div class="top_menu">
      <button class="logo" @click="$router.push('/')">MyFin</button>
      <div class="right-buttons">
        <button class="registration_button" @click="$router.push('/Registration')">зарегистрироваться</button>
        <button class="log_in_button" @click="$router.push('/LogIn')">Log in</button>
      </div>
    </div>  
  </template>

  
<style>
@import './top-menu-main-page.css';
</style>
