<template>
    <div class="top_menu">
      <button class="logo" @click="$router.push('/')">MyFin</button>
      <div class="right-buttons">
        <button class="personal_account" @click="$router.push('/personal_account')">личный кабинет</button>
        <button class="exit_button" @click="$router.push('/log_out')">Log out</button>
      </div>
    </div>  
  </template>
  
  <style scoped>
  .top_menu {
    width: 100%;
    height: 60px;
    background-color: rgb(215, 222, 221);
    border-radius: 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  
  .right-buttons {
    display: flex;
    align-items: center;
  }
  
  .exit_button {
    margin-right: 20px;
    height: 40px;
    border-radius: 10px;
    border: 2px solid rgb(58, 58, 58);
    display: flex;
    align-items: center;
    font-weight: bold;
    padding: 0 15px;
    color: rgb(58, 58, 58);
  }
  
  .personal_account {
    margin-right: 20px;
    height: 40px;
    border-radius: 10px;
    border: 2px solid rgb(58, 58, 58);
    display: flex;
    align-items: center;
    font-weight: bold;
    padding: 0 15px;
    color: rgb(58, 58, 58);
  }
  
  .logo {
    margin-left: 20px;
    height: 40px;
    font-weight: bold;
    color: rgb(58, 58, 58);
    font-size: 28px;
    padding: 0;
  }
  </style>