import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import 'bootstrap-icons/font/bootstrap-icons.css'
import '../src/assets/scss/main.scss'

createApp(App)
  .use(router)
  .mount('#app')
