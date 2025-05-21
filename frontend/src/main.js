import './assets/main.css'

import { createApp } from 'vue'
import { createRouter, createWebHistory} from 'vue-router'
import { createPinia } from 'pinia'
import { useUserStore } from '@/stores/user.js';

import PersonalAccount from './pages/PersonalAccount/personal-account.vue'
import MainPage from './pages/MainPage/main-page.vue'
import History from './pages/History/History.vue'
import LogIn from './pages/LogIn/log-in.vue'
import LogOut from './pages/LogOut/log-out.vue'
import SingIn from './pages/SingIn/SingIn.vue'
import App from './App.vue'

const app = createApp(App)

const routes = [
    {path: '/PersonalAccount', name: 'Personal account', component: PersonalAccount},
    {path: '/', name: 'Main page', component: MainPage},
    {path: '/History', name: 'History', component: History},
    {path: '/LogIn', name: 'Log In', component: LogIn},
    {path: '/LogOut', name: 'Log Out', component: LogOut},
    {path: '/SingIn', name: 'Registration', component: SingIn}
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
