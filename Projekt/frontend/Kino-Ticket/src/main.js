import { createApp } from 'vue'
import App from './App.vue'
import "./assets/styles/variables.css"
import "./assets/styles/base.css"
import router from './router/index.ts'
import {createPinia} from "pinia";

const app = createApp(App)

const pinia = createPinia()
app.use(createPinia)
app.use(pinia)
app.use(router)

app.mount('#app')