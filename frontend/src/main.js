import './assets/main.css'

import { createApp } from 'vue'
import { createRouter, createWebHistory} from 'vue-router'
import { createPinia, storeToRefs } from 'pinia'
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
    {path: '/', name: 'Main page', component: MainPage, meta: { requiresGuest: true }},
    {path: '/LogIn', name: 'Log In', component: LogIn, meta: { requiresGuest: true }},
    {path: '/SingIn', name: 'Registration', component: SingIn, meta: { requiresGuest: true }},
    {path: '/PersonalAccount', name: 'Personal account', component: PersonalAccount, meta: { requiresAuthentication: true } },
    {path: '/History', name: 'History', component: History, meta: { requiresAuthentication: true }},
    {path: '/LogOut', name: 'Log Out', component: LogOut, meta: { requiresAuthentication: true }}
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

app.use(createPinia())

const userStore = useUserStore();
userStore.init();

router.beforeEach((to, from, next) => {
    
    const { isAuthenticated } = storeToRefs(userStore);
    
    if (to.meta.requiresAuthentication) {
        if (isAuthenticated.value) {
            next();
        } 
        else {
            next('/');
        }
    }

    else if (to.meta.requiresGuest) {
        if (isAuthenticated.value) {
            next('/PersonalAccount');
        }
        else {
            next();
        }
    }
    
})

app.use(router)
app.mount('#app')
