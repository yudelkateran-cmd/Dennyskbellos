import { createStore } from 'vuex'
import { serviciosPeluqueria } from '../servicios.js' 

export default createStore({
  state: {
    servicios: serviciosPeluqueria,
    nombreNegocio: 'DennysKbellos',
    contacto: {
      whatsapp: '+56 9 5691 9142',
      instagram: '@dennyskbellos'
    }
  },
  getters: {
    // Usamos @type {any} para que el editor no se queje del tipo de dato
    getServicioById: (/** @type {any} */ state) => (/** @type {any} */ id) => {
      return state.servicios.find((/** @type {any} */ s) => s.id === parseInt(id))
    }
  },
  mutations: {},
  actions: {}
})