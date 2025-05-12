<template>
    <div> 
        <span class="MyFin">MyFin</span>
        <button class="back-button" @click="$router.push('/PersonalAccount')">назад</button>
    </div>
    <div class="background">
        <span class="question">Вы уверены, что хотите выйти?</span>
        <div class="background-button">
            <button class="yes-button" @click="$router.push('/')">да</button>
            <button class="no-button" @click="$router.push('/PersonalAccount')">нет</button>
        </div>  
    </div>
</template>

<style scoped>
@import './log-out.css';
</style>