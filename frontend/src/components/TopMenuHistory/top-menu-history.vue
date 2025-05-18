<template>
    <div class="top-menu">
      <button class="logo" @click="$router.push('/')">MyFin</button>
      <div class="right-buttons">
        <button class="personal-account" @click="$router.push('/PersonalAccount')">личный кабинет</button>
        <button class="exit-button" @click="$router.push('/LogOut')">Log out</button>
      </div>
    </div>  
  </template>

  
<style>
@import './top_menu_history.css';
</style>
