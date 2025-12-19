<template>
    <button class="back-button" @click="$router.push('/')">Назад</button>
    <span class="MyFin">MyFin</span>
    <span class="input-row-label">Регистрация</span>
    <input v-model="username" class="input-row" type="text" placeholder="Введите имя пользователя">
    <input v-model="email" class="input-row" type="text" placeholder="Введите почту">
    <div v-if="error" class="error-message">{{ error }}</div>
    <input v-model="password" class="input-row" type="password" placeholder="Введите пароль">
    <input v-model="secondPassword" class="input-row" type="password" placeholder="Повторите пароль">
    <button class="sing-in-end" @click="register()">Зарегистрироваться</button>
    <div class="centered-row">
        <span class="question">Есть аккаунт? →</span>
        <button class="log-in-button" @click="$router.push('/LogIn')">Войти</button>
    </div>

    <div v-if="showOverlay" class="overlay-box">
        <div class="overlay-background">
          <span class="close" @click="closeOverlay">&times;</span>
            <span class="category-name-overlay">Подтверждение почты</span>
            <span class="questions-editing">Введите код:</span>
            <input v-model="code" class="edit-input" placeholder="код">
            <button class="submit-button" @click="verifyData()">Отправить</button>
        </div>
    </div>

</template>

<script>
import axios from 'axios';
import { useUserStore } from '@/stores/user';
import { storeToRefs } from 'pinia';

export default {
    data() {
        return {
            username: '',
            email: '',
            password: '',
            secondPassword: '',
            error: '',
            code: '',
            showOverlay: false,
            codeVerify: false
        }
    },
    methods: {
        openOverlay(){
            this.showOverlay = true;
        },
        closeOverlay(){
            this.showOverlay = false;
            if(this.codeVerify) {
                this.$router.push('/PersonalAccount');
            }
            else
            { 
                this.deleteUser()
            }
        },
        samePasswords(){
            if (this.password == this.secondPassword){
                return true;
            }

            this.error = "Пароли не совападают"
            return false;
        },
        validPassword() {
            if (this.password.length < 8) {
                this.error = 'Пароль должен содержать минимум 8 символов';
                return false;
            }

            if (!/\d/.test(this.password)) {
                this.error = 'Пароль должен содержать хотя бы одну цифру';
                return false;
            }
            
            if (!/[A-ZА-Я]/.test(this.password)) {
                this.error = 'Пароль должен содержать хотя бы одну заглавную букву';
                return false;
            }

            if (!/[a-zа-я]/.test(this.password)) {
                this.error = 'Пароль должен содержать хотя бы одну строчную букву';
                return false;
            }
            
            this.error = '';
            return true;
        },

        async deleteUser() {
            try{
                await axios.delete(`https://26.255.57.122:7208/api/controller/Delete/${this.email}`)
            }catch(error){
                console.log(error.message)
            }
        },

        async verifyData() {
            try{
                const userStore = useUserStore();
                await axios.post(`https://26.255.57.122:7208/api/controller/VerifyCode/${this.email}/${this.code}`)
                const userTokenResponse = await axios.get(`https://26.255.57.122:7208/api/controller/GetId`);
                userStore.login({
                        username: this.username.trim(),
                        email: this.email.trim(),
                        userId: userTokenResponse.data,
                        isAuthenticated: true
                    });  
            }
            catch(error){
                if (error.message == 'Invalid code'){
                    this.error = 'Код неверен'; 
                }
                return
            }
            console.log('Успешная регистрация!');
            this.codeVerify = true
            this.closeOverlay()
        },
        
        async checkData(){
            if (!this.validPassword()) {
                return; 
            }
            if(!this.samePasswords()){
                return;
            }

            await axios.post(`https://26.255.57.122:7208/api/controller/SendCode/${this.email}`)
            this.openOverlay();
        },

        async register() {

            console.log(this.code)

            try {
                const userStore = useUserStore();
                const { isAuthenticated } = storeToRefs(userStore);

                if (isAuthenticated.value) {
                    this.error = 'Пользователь уже авторизован. Вы не можете зарегистрировать новый аккаунт!';    
                    console.error('Ошибка: Пользователь уже авторизован');
                }
                
                else {
                    const response = await axios.post(`https://26.255.57.122:7208/api/controller/register`, {
                        username: this.username.trim(),
                        email: this.email.trim(),
                        password: this.password.trim()
                    });

                }
            } 
        
            catch (error) {
                console.error('Ошибка:', error.message);
                if (error.message == 'Request failed with status code 501'){
                    this.error = 'Пользователь с таким логином уже существует'; 
                } else if (error.message == 'Request failed with status code 503'){
                    this.error = 'Пользователь с такой почтой уже существует';
                }
                else {
                    this.error = 'Ошибка при отправке запроса';
                }
                return
            }
            this.checkData();

            
        }
    }
}
</script>

<style scoped>
    @import './sing-in-field.css';
</style>