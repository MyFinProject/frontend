import './assets/main.css'

import { createApp } from 'vue'
import { createRouter, createWebHistory} from 'vue-router'

import personal_account from './pages/personal_account.vue'
import main_page from './pages/main_page.vue'
import history from './pages/history.vue'
import App from './App.vue'

const app = createApp(App)

const routes = [
    {path: '/', name: 'personal account', component: personal_account},
    {path: '/main_page', name: 'main page', component: main_page},
    {path: '/history', name: 'history', component: history}
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

app.use(router)
app.mount('#app')
