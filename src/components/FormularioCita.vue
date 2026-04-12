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
      <div v-if="mensajeDiaLleno" class="aviso-lleno">{{ mensajeDiaLleno }}</div>

      <VDatePicker 
        v-model="fechaSeleccionada" 
        :min-date="new Date()" 
        :attributes="atributosCalendario"
        @dayclick="onDiaSeleccionado" 
        mode="date" 
        expanded 
        transparent 
        borderless 
      />

      <div v-if="nuevaCita.fecha && !mensajeDiaLleno" class="horas-container">
        <label>Selecciona una Hora Disponible:</label>
        <div class="horas-grid">
          <button type="button" v-for="h in bloquesHorarios" :key="h"
            :class="['hora-btn', { 'seleccionada': nuevaCita.hora === h }]" 
            :disabled="estaOcupada(nuevaCita.fecha, h)"
            @click="nuevaCita.hora = h">
            {{ h }}
          </button>
        </div>
      </div>

      <button type="submit" class="btn-enviar" :disabled="!nuevaCita.hora || mensajeDiaLleno">
        Reservar Cita {{ nuevaCita.hora }}
      </button>
    </form>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'; // Limpiamos los imports duplicados
import { db } from '../firebase';
import { collection, addDoc, getDocs } from "firebase/firestore";
import { serviciosPeluqueria } from '../servicios.js';

const listaServicios = ref(serviciosPeluqueria);
const citasExistentes = ref([]);
const mensajeDiaLleno = ref('');
const fechaSeleccionada = ref(new Date()); // Para controlar el estado del calendario

// Marcadores visuales para el calendario
const atributosCalendario = computed(() => {
  return citasExistentes.value.map(cita => ({
    dot: 'pink', 
    dates: new Date(cita.fecha + 'T12:00:00'), 
    popover: { label: 'Día con citas' }
  }));
});

const bloquesHorarios = ['09:00', '10:00', '11:00', '12:00', '15:00', '16:00', '17:00', '18:00'];

const nuevaCita = ref({
  name: '',
  phone: '',
  servicio: '',
  fecha: '',
  hora: ''
});

const onDiaSeleccionado = (day) => {
  nuevaCita.value.fecha = day.id; // Guarda el formato YYYY-MM-DD
  validarFechaSeleccionada();
};

const cargarCitas = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "citas"));
    citasExistentes.value = querySnapshot.docs.map(doc => doc.data());
  } catch (e) {
    console.error("Error en Firebase:", e);
  }
};

const estaOcupada = (fecha, hora) => {
  return citasExistentes.value.some(c => c.fecha === fecha && c.hora === hora);
};

const validarFechaSeleccionada = () => {
  nuevaCita.value.hora = '';
  const citasEseDia = citasExistentes.value.filter(c => c.fecha === nuevaCita.value.fecha).length;

  if (citasEseDia >= bloquesHorarios.length) {
    mensajeDiaLleno.value = '❌ Este día no tiene horas disponibles.';
  } else {
    mensajeDiaLleno.value = '';
  }
};

const enviarCita = async () => {
  try {
    await addDoc(collection(db, "citas"), nuevaCita.value);
    alert(`¡Cita agendada con éxito!`);
    nuevaCita.value = { name: '', phone: '', servicio: '', fecha: '', hora: '' };
    cargarCitas();
  } catch (error) {
    console.error("Error:", error);
  }
};

onMounted(cargarCitas);
</script>

<style scoped>
/* Tus estilos están impecables, mantengo la coherencia visual */
.booking-container {
  max-width: 500px;
  margin: 40px auto;
  padding: 30px;
  border-radius: 20px;
  background: #ffffff;
  border: 1px solid #d7ccc8;
  box-shadow: 0 15px 35px rgba(121, 85, 72, 0.1);
}

.aviso-lleno {
  background: #fff3f3;
  color: #d32f2f;
  padding: 10px;
  border-radius: 8px;
  font-size: 0.9rem;
  margin: 10px 0;
  border: 1px solid #ffcdd2;
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
  width: 100%;
  margin-top: 20px;
  background: linear-gradient(45deg, #ff80ab, #f48fb1);
  color: white;
  border: none;
  padding: 15px;
  border-radius: 10px;
  font-weight: bold;
  cursor: pointer;
}
</style>