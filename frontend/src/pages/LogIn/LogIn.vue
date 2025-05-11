
<template>
    <div class = 'mybody'>
        <div class = 'log_background' >
            <button class="button_back" @click="$router.push('/')">на главную</button>
            <button class="button_persona_account" @click="$router.push('/PersonalAccount')">лк</button>
        </div>
    </div>
</template>

<style scoped>
@import './log-in.css';
</style>