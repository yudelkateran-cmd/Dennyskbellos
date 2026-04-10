import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../components/HomeView.vue'


const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('../views/AboutView.vue')
  },
  {
    path: '/registro',
    name: 'registro',
    component: () => import('../views/RegistroView.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/LoginView.vue')
  },
  // --- CAMBIO AQUÍ: Ruta para ver TODOS los servicios ---
  {
    path: '/servicios', 
    name: 'Servicios',
    component: () => import('../views/ServiciosView.vue')
  },
  // Ruta para ver el detalle de UN servicio específico
  {
    path: '/servicio/:id',
    name: 'DetalleServicio',
    component: () => import('../views/ServiciosView.vue'),
    props: true 
  },
  {
    path: '/agendar-cita',
    name: 'AgendarCita',
    component: () => import('../views/AgendarCitaView.vue')
  }
]

const router = createRouter({
  // Agrega las barras /
  history: createWebHistory('/Dennyskbellos/'), 
  routes
})

export default router