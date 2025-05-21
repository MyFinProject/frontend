import './assets/main.css'

import { createApp } from 'vue'
import { createRouter, createWebHistory} from 'vue-router'
import { createPinia } from 'pinia'
import { useUserStore } from '@/stores/user.js';

import personal_account from './pages/PersonalAccount/personal-account.vue'
import main_page from './pages/MainPage/main-page.vue'
import history from './pages/History/History.vue'
import log_in from './pages/LogIn/log-in.vue'
import log_out from './pages/LogOut/log-out.vue'
import registration from './pages/Registration/Registration.vue'
import App from './App.vue'

const app = createApp(App)

const routes = [
    {path: '/PersonalAccount', name: 'Personal account', component: personal_account},
    {path: '/', name: 'Main page', component: main_page},
    {path: '/History', name: 'History', component: history},
    {path: '/LogIn', name: 'Log In', component: log_in},
    {path: '/LogOut', name: 'Log Out', component: log_out},
    {path: '/Registration', name: 'Registration', component: registration}
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

app.use(router)
app.use(createPinia())
app.mount('#app')

const userStore = useUserStore();
userStore.init();
