import { createStore } from 'vuex'
// 1. Cambiamos @ por ./ porque al estar afuera, servicios.js está en la misma carpeta o en src
import { serviciosPeluqueria } from './src/servicios.js' 

export default createStore({
  state: {
    servicios: serviciosPeluqueria,
    nombreNegocio: 'DennysKbellos',
    contacto: {
      whatsapp: '+56 9 5691 9142',
      instagram: '@dennys_kbellos'
    }
  },
  getters: {
    // 2. Añadimos las etiquetas para que no te salgan los errores de "any" otra vez
    getServicioById: (/** @type {any} */ state) => (/** @type {any} */ id) => {
      return state.servicios.find((/** @type {any} */ s) => s.id === parseInt(id))
    }
  },
  mutations: {},
  actions: {}
})