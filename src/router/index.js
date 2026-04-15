import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../components/HomeView.vue'
import { auth } from '@/firebase';

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
  {
    path: '/servicios', 
    name: 'Servicios',
    component: () => import('../views/ServiciosView.vue')
  },
  {
    path: '/servicio/:id',
    name: 'DetalleServicio',
    component: () => import('../views/ServiciosView.vue'),
    props: true 
  },
  {
    path: '/agendar-cita',
    name: 'AgendarCita',
    component: () => import('../views/AgendarCitaView.vue'),
    // --- PASO 1: AGREGAR EL GUARDIÁN ---
    meta: { requiresAuth: true } 
  }
]

const router = createRouter({
  // Asegúrate de que el nombre coincida exactamente con tu repositorio en GitHub
  history: createWebHistory('/dennyskbellos/'), 
  routes
})

// --- PASO 2: MOVER EL BEFOREEACH AQUÍ ---
// Debe ir después de definir la constante 'router'
router.beforeEach((to, from, next) => {
  const requiereAuth = to.matched.some(record => record.meta.requiresAuth);
  const usuario = auth.currentUser;

  if (requiereAuth && !usuario) {
    next('/login'); 
  } else {
    next();
  }
})

export default router