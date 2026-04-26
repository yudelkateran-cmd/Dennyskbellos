import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../components/HomeView.vue'
import { auth } from '@/firebase';
import { onAuthStateChanged } from 'firebase/auth';

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
    meta: { requiresAuth: true } 
  }
]

const router = createRouter({
  history: createWebHistory('/dennyskbellos/'), 
  routes,
  // ESTA ES LA CONFIGURACIÓN CORRECTA DEL SCROLL
  scrollBehavior(to, from, savedPosition) {
    return new Promise((resolve) => {
      // Esperamos 100ms para que el DOM se estabilice (clave para móviles)
      setTimeout(() => {
        if (savedPosition) {
          resolve(savedPosition);
        } else {
          // Siempre al inicio (arriba a la izquierda)
          resolve({ top: 0, left: 0 });
        }
      }, 100);
    });
  }
})

// Función auxiliar para esperar a que Firebase esté listo
const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const removeListener = onAuthStateChanged(
      auth,
      (user) => {
        removeListener();
        resolve(user);
      },
      reject
    );
  });
};

// Guardián de navegación global
router.beforeEach(async (to, from, next) => {
  const requiereAuth = to.matched.some(record => record.meta.requiresAuth);
  const usuario = await getCurrentUser();

  if (requiereAuth && !usuario) {
    next('/login'); 
  } else if (to.path === '/login' && usuario) {
    next('/agendar-cita');
  } else {
    next();
  }
});

export default router