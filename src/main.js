import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import 'bootstrap-icons/font/bootstrap-icons.css'
import '../src/assets/scss/main.scss'

// lottie
import Vue3lottie from 'vue3-lottie'

const app = createApp(App)

app.use(router)
app.use(Vue3lottie, { name: 'Vue3lottie' })
app.mount('#app')
