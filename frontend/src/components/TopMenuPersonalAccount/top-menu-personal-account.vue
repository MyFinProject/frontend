<template>
  <div class="top_menu">
    <button class="logo" @click="$router.push('/')">MyFin</button>
    <div class="right-buttons">
      <button class="history" @click="$router.push('/History')">история операций</button>
      <button class="exit_button" @click="$router.push('/LogOut')">Log out</button>
    </div>
  </div>  
</template>



<style>
  @import './top-menu-personal-account.css';
</style>
