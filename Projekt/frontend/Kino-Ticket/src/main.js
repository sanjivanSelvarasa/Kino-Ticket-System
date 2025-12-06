import { createApp } from 'vue'
import App from './App.vue'
import "./assets/styles/variables.css"
import "./assets/styles/base.css"
import router from './router/index.js'

createApp(App).use(router).mount('#app')
