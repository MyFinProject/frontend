import './assets/main.css'

import { createApp } from 'vue'
import { createRouter, createWebHistory} from 'vue-router'

import personal_account from './pages/personal_account.vue'
import main_page from './pages/main_page.vue'
import history from './pages/history.vue'
import log_in from './pages/log_in.vue'
import log_out from './pages/log_out.vue'
import registration from './pages/registration.vue'
import App from './App.vue'

const app = createApp(App)

const routes = [
    {path: '/personal_account', name: 'personal account', component: personal_account},
    {path: '/', name: 'main page', component: main_page},
    {path: '/history', name: 'history', component: history},
    {path: '/log_in', name: 'log_in', component: log_in},
    {path: '/log_out', name: 'log_out', component: log_out},
    {path: '/registration', name: 'registration', component: registration}
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

app.use(router)
app.mount('#app')
