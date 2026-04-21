<template>
  <div class="booking-container">
    <h2>Agendar Cita en DennysKbellos</h2>

    <form @submit.prevent="enviarCita">
      <div class="form-group">
        <label>¿Qué especialidad buscas?</label>
        <select v-model="categoriaSeleccionada" required @change="limpiarServicios">
          <option value="" disabled>Selecciona una categoría</option>
          <option v-for="s in listaServicios" :key="s.id" :value="s.nombre">
            {{ s.nombre }}
          </option>
        </select>
      </div>

      <div class="form-group" v-if="categoriaSeleccionada && serviciosDisponibles.length > 0">
        <label>Tratamientos para {{ categoriaSeleccionada }}:</label>
        <div class="sub-servicios-grid">
          <div v-for="item in serviciosDisponibles" :key="item" class="checkbox-item">
            <input type="checkbox" :id="item" :value="item" v-model="nuevaCita.serviciosDetalle" />
            <label :for="item">{{ item }}</label>
          </div>
        </div>
      </div>

      <div class="form-group">
        <label>Fono de contacto:</label>
        <input v-model="nuevaCita.phone" type="tel" placeholder="+569..." required />
      </div>

      <div class="form-group">
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
      </div>

      <div v-if="nuevaCita.fecha && !mensajeDiaLleno" class="form-group">
        <label>Hora para el {{ nuevaCita.fecha }}:</label>
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

      <div class="footer-form">
        <button 
          type="submit" 
          class="btn-enviar" 
          v-if="!mostrarBotonPago" 
          :disabled="!formularioListo"
        >
          Confirmar Reserva ✨
        </button>

        <div v-if="mostrarBotonPago" class="pago-container" id="seccion-pago">
          <p class="pago-instruccion">¡Cita reservada! Para asegurar tu cupo, realiza el pago ahora:</p>
          <button type="button" @click="irAlPago" class="btn-pago">
            Pagar con Mercado Pago 💳
          </button>
        </div>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, nextTick } from 'vue';
import { db } from '../firebase';
import { collection, addDoc, getDocs } from "firebase/firestore";
import { serviciosPeluqueria } from '../servicios.js';

const mostrarBotonPago = ref(false);
const linkMercadoPago = "https://mpago.li/1R4v3Ur";

const listaServicios = ref(serviciosPeluqueria);
const citasExistentes = ref([]);
const mensajeDiaLleno = ref('');
const fechaSeleccionada = ref(new Date());
const categoriaSeleccionada = ref('');

const nuevaCita = ref({
  phone: '',
  servicioPrincipal: '',
  serviciosDetalle: [],
  fecha: '',
  hora: ''
});

const formularioListo = computed(() => {
  return (
    categoriaSeleccionada.value !== '' &&
    nuevaCita.value.serviciosDetalle.length > 0 &&
    nuevaCita.value.phone.trim().length >= 8 &&
    nuevaCita.value.fecha !== '' &&
    nuevaCita.value.hora !== ''
  );
});

const enviarCita = async () => {
  try {
    const docRef = await addDoc(collection(db, "citas"), {
      ...nuevaCita.value,
      timestamp: new Date()
    });

    if (docRef.id) {
      mostrarBotonPago.value = true;
      // Scroll automático hacia el botón de pago para que el usuario lo vea
      await nextTick();
      const el = document.getElementById('seccion-pago');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  } catch (e) {
    console.error("Error Firebase:", e);
    alert("Hubo un problema al conectar con la base de datos.");
  }
};

const irAlPago = () => {
  window.open(linkMercadoPago, '_blank');
  // Opcional: no recargar de inmediato para que el usuario pueda volver a la pestaña si falla el pago
};

// ... Resto de tus funciones (limpiarServicios, cargarCitas, etc) se mantienen igual ...
const serviciosDisponibles = computed(() => {
  const cat = listaServicios.value.find(s => s.nombre === categoriaSeleccionada.value);
  return cat && cat.subservicios ? cat.subservicios : [];
});

const limpiarServicios = () => {
  nuevaCita.value.serviciosDetalle = [];
  nuevaCita.value.servicioPrincipal = categoriaSeleccionada.value;
  nuevaCita.value.hora = '';
};

const atributosCalendario = computed(() => {
  return citasExistentes.value.map(cita => ({
    dot: 'pink',
    dates: new Date(cita.fecha + 'T12:00:00'),
    popover: { label: 'Ocupado' }
  }));
});

const onDiaSeleccionado = (day) => {
  nuevaCita.value.fecha = day.id;
  validarFechaSeleccionada();
};

const bloquesHorarios = ['09:00', '10:00', '11:00', '12:00', '15:00', '16:00', '17:00', '18:00'];

const cargarCitas = async () => {
  try {
    const res = await getDocs(collection(db, "citas"));
    citasExistentes.value = res.docs.map(doc => doc.data());
  } catch (e) { console.error(e); }
};

const estaOcupada = (fecha, hora) => citasExistentes.value.some(c => c.fecha === fecha && c.hora === hora);

const validarFechaSeleccionada = () => {
  nuevaCita.value.hora = '';
  const total = citasExistentes.value.filter(c => c.fecha === nuevaCita.value.fecha).length;
  mensajeDiaLleno.value = total >= bloquesHorarios.length ? '❌ Día completo' : '';
};

onMounted(cargarCitas);
</script>

<style scoped>
/* Optimizaciones de diseño */
.booking-container {
  max-width: 600px;
  margin: 20px auto;
  padding: 30px;
  background: #fff;
  border-radius: 20px;
  box-shadow: 0 10px 30px rgba(0,0,0,0.1);
  height: auto;
}

.pago-container {
  margin-top: 30px;
  padding: 20px;
  background-color: #fffde7;
  border: 2px dashed #ffd54f;
  border-radius: 15px;
  animation: fadeIn 0.5s ease-in;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

.btn-pago {
  width: 100%;
  background-color: #009ee3;
  color: white;
  border: none;
  padding: 15px;
  border-radius: 10px;
  font-weight: bold;
  font-size: 1.2rem;
  cursor: pointer;
}

.btn-enviar {
  width: 100%;
  padding: 15px;
  background: linear-gradient(to right, #ff80ab, #f48fb1);
  border: none;
  color: white;
  border-radius: 10px;
  font-weight: bold;
  cursor: pointer;
}

.btn-enviar:disabled {
  background: #ccc;
  cursor: not-allowed;
}

.sub-servicios-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
  background: #fff5f8;
  padding: 15px;
  border-radius: 12px;
}

.horas-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 10px;
}
</style>