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

      <input v-model="nuevaCita.name" type="text" placeholder="Tu Nombre" required />
      <input v-model="nuevaCita.phone" type="tel" placeholder="WhatsApp +569..." required />
      
      <label>Selecciona la Fecha:</label>
      <input v-model="nuevaCita.fecha" type="date" :min="fechaMinima" @change="validarDisponibilidad" required />

      <!-- Selector de Horas Estilo Botones -->
      <div v-if="nuevaCita.fecha" class="horas-container">
        <label>Selecciona una Hora Disponible:</label>
        <div class="horas-grid">
          <button 
            type="button"
            v-for="h in bloquesHorarios" 
            :key="h"
            :class="['hora-btn', { 'seleccionada': nuevaCita.hora === h }]"
            :disabled="estaOcupada(nuevaCita.fecha, h)"
            @click="nuevaCita.hora = h"
          >
            {{ h }}
          </button>
        </div>
      </div>

      <button type="submit" class="btn-enviar" :disabled="!nuevaCita.hora">
        Reservar Cita {{ nuevaCita.hora }}
      </button>
    </form>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { serviciosPeluqueria } from '../servicios.js';

const urlAPI = 'https://69cbdec70b417a19e07b6a42.mockapi.io/Usuarios';
const listaServicios = ref(serviciosPeluqueria);
const citasExistentes = ref([]);

// Horarios de la peluquería
const bloquesHorarios = ['09:00', '10:00', '11:00', '12:00', '15:00', '16:00', '17:00', '18:00'];

const nuevaCita = ref({
  name: '', // MockAPI usa 'name' según tu captura
  phone: '', // MockAPI usa 'phone'
  servicio: '',
  fecha: '',
  hora: ''
});

// Para no permitir citas en el pasado
const fechaMinima = new Date().toISOString().split('T')[0];

// 1. Obtener citas de MockAPI
const cargarCitas = async () => {
  try {
    const res = await axios.get(urlAPI);
    citasExistentes.value = res.data;
  } catch (e) {
    console.error("Error cargando disponibilidad");
  }
};

// 2. Verificar si la hora está ocupada
const estaOcupada = (fecha, hora) => {
  return citasExistentes.value.some(c => c.fecha === fecha && c.hora === hora);
};

const enviarCita = async () => {
  try {
    await axios.post(urlAPI, nuevaCita.value);
    alert(`¡Cita agendada para ${nuevaCita.value.name}!`);
    nuevaCita.value = { name: '', phone: '', servicio: '', fecha: '', hora: '' };
    cargarCitas(); // Recargar para bloquear la hora recién tomada
  } catch (error) {
    alert('Error al reservar.');
  }
};

onMounted(cargarCitas);
</script>

<style scoped>
/* Mantengo tus estilos base y añado los nuevos */
.booking-container {
  max-width: 500px;
  margin: 40px auto;
  padding: 30px;
  border-radius: 20px;
  background: #ffffff;
  border: 1px solid #d7ccc8; 
  box-shadow: 0 15px 35px rgba(121, 85, 72, 0.1);
}

input, select {
  width: 100%;
  padding: 12px;
  margin: 10px 0;
  border-radius: 8px;
  border: 1px solid #d7ccc8;
}

.horas-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 10px;
  margin: 15px 0;
}

.hora-btn {
  padding: 10px;
  border: 1px solid #ff80ab;
  background: white;
  color: #ff80ab;
  border-radius: 5px;
  cursor: pointer;
  transition: 0.3s;
  font-size: 0.9rem;
}

.hora-btn.seleccionada {
  background: #ff80ab;
  color: white;
}

.hora-btn:disabled {
  background: #eee;
  border-color: #ccc;
  color: #aaa;
  cursor: not-allowed;
  text-decoration: line-through;
}

.btn-enviar {
  margin-top: 20px;
  background: linear-gradient(45deg, #ff80ab, #f48fb1, #ff80ab, #fce4ec);
  color: white;
  border: none;
  padding: 15px;
  border-radius: 10px;
  font-weight: bold;
  cursor: pointer;
}

.btn-enviar:disabled {
  background: #ccc;
  cursor: not-allowed;
}
</style>