<template>
  <div class="top-menu">
    <button class="logo" @click="$router.push('/')">MyFin</button>
    <div class="right-buttons">
      <button class="exit-button" @click="$router.push('/LogOut')">Выйти</button>
    </div>
  </div>  
</template>



<style scoped>
  @import './top-menu-personal-account.css';
</style>
