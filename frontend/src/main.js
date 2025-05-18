import './assets/main.css'

import { createApp } from 'vue'
import { createRouter, createWebHistory} from 'vue-router'

import PersonalAccount from './pages/PersonalAccount/PersonalAccount.vue'
import MainPage from './pages/MainPage/MainPage.vue'
import History from './pages/History/History.vue'
import LogIn from './pages/LogIn/LogIn.vue'
import LogOut from './pages/LogOut/LogOut.vue'
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
app.mount('#app')
