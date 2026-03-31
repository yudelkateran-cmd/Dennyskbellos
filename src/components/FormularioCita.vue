<template>
  <div class="booking-container">
    <h2>Agendar Cita en DennysKbellos</h2>
    
    <form @submit.prevent="enviarCita">
      <label>Selecciona el Servicio:</label>
      <select v-model="nuevaCita.servicio" required>
        <option v-for="s in listaServicios" :key="s.id" :value="s.nombre">
          {{ s.nombre }}
        </option>
      </select>

      <input v-model="nuevaCita.nombre" type="text" placeholder="Tu Nombre" required />
      <input v-model="nuevaCita.telefono" type="tel" placeholder="WhatsApp +569..." required />
      
      <input v-model="nuevaCita.fecha" type="date" required />
      <input v-model="nuevaCita.hora" type="time" required />

      <button type="submit">Reservar Cita</button>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import axios from 'axios';
import { serviciosPeluqueria } from '../servicios.js';

const listaServicios = ref(serviciosPeluqueria);
const urlAPI = 'https://69cbdec70b417a19e07b6a42.mockapi.io/Usuarios'; 

const nuevaCita = ref({
  nombre: '',
  telefono: '',
  servicio: '',
  fecha: '',
  hora: ''
});

const enviarCita = async () => {
  try {
    const response = await axios.post(urlAPI, nuevaCita.value);
  
    alert(`¡Cita agendada con éxito, ${nuevaCita.value.nombre}! Te contactaremos pronto.`);
    
    // Limpiar formulario
    nuevaCita.value = { nombre: '', telefono: '', servicio: '', fecha: '', hora: '' };
  } catch (error) {
    console.error("Error al enviar:", error);
    alert('Ups, algo salió mal.');
  }
};
</script>

<style scoped>
.booking-container {
  max-width: 500px;
  margin: 40px auto;
  padding: 30px;
  border-radius: 20px;
  background: #ffffff;
  /* Borde sutil en café claro */
  border: 1px solid #d7ccc8; 
  box-shadow: 0 15px 35px rgba(121, 85, 72, 0.1);
}

h2 {
  text-align: center;
  /* Café profundo y elegante */
  color: #4e342e; 
  font-family: 'Playfair Display', serif; /* Si puedes, usa una fuente elegante */
  margin-bottom: 25px;
}

/* Efecto Glitter para el Botón */
button {
  width: 100%;
  padding: 15px;
  border: none;
  border-radius: 10px;
  color: white;
  font-size: 1.1rem;
  font-weight: bold;
  cursor: pointer;
  /* Degradado Rosado Glitter */
  background: linear-gradient(45deg, #ff80ab, #f48fb1, #ff80ab, #fce4ec);
  background-size: 200% 200%;
  transition: 0.5s;
  box-shadow: 0 4px 15px rgba(244, 143, 177, 0.4);
}

button:hover {
  /* Efecto de movimiento en el brillo */
  background-position: right center;
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(244, 143, 177, 0.6);
}

input:focus, select:focus {
  outline: none;
  /* Resaltado en café cuando el usuario escribe */
  border-color: #8d6e63; 
  box-shadow: 0 0 5px rgba(141, 110, 99, 0.2);
}
</style>