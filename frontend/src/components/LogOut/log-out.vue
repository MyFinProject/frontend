<template>
    <div> 
        <span class="MyFin">MyFin</span>
        <button class="back-button" @click="$router.push('/PersonalAccount')">Назад</button>
    </div>
    <div class="background">
        <span class="question">Вы уверены, что хотите выйти?</span>
        <div class="background-button">
            <button class="yes-button" @click="log_out">да</button>
            <button class="no-button" @click="$router.push('/PersonalAccount')">нет</button>
        </div>  
    </div>
</template>

<script>
import { useUserStore } from '@/stores/user';
import axios from 'axios';

export default {
    methods: {
        async log_out() {
            
            try {
                const userStore = useUserStore();
                const response = await axios.post(`https://26.255.57.122:7208/api/controller/Logout`);
                userStore.logout();
                this.$router.push('/'); 
            } 

            catch (error) {
                console.error('Ошибка при выходе:', error.message);
            }
        }
    }
}
</script>

<style scoped>
    @import './log-out.css';
</style>