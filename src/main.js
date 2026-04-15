import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VCalendar from 'v-calendar';
import 'v-calendar/style.css';

// 1. Creamos la instancia de la aplicación y la guardamos en la variable 'app'
const app = createApp(App)

// 2. Instalamos todos los plugins que necesites
app.use(store)
app.use(router)
app.use(VCalendar, {}) // Aquí activamos el calendario que tenías pendiente

// 3. Al final de TODO, montamos la aplicación en el HTML
app.mount('#app')