import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VCalendar from 'v-calendar';
import 'v-calendar/style.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

// 1. Creamos la instancia de la aplicación y la guardamos en la variable 'app'
const app = createApp(App)

// 2. Instalamos todos los plugins que necesites
app.use(store)
app.use(router)
app.use(VCalendar, {}) 


app.mount('#app')