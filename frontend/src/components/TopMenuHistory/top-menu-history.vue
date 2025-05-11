<template>
    <div class="top_menu">
      <button class="logo" @click="$router.push('/')">MyFin</button>
      <div class="right-buttons">
        <button class="personal_account" @click="$router.push('/PersonalAccount')">личный кабинет</button>
        <button class="exit_button" @click="$router.push('/LogOut')">Log out</button>
      </div>
    </div>  
  </template>

  
<style>
@import './top_menu_history.css';
</style>
