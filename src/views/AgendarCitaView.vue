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
        <label>Tratamientos disponibles para {{ categoriaSeleccionada }}:</label>
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
        <VDatePicker v-model="fechaSeleccionada" :min-date="new Date()" :attributes="atributosCalendario"
          @dayclick="onDiaSeleccionado" mode="date" expanded transparent borderless />
      </div>

      <div v-if="nuevaCita.fecha && !mensajeDiaLleno" class="form-group">
        <label>Hora disponible para el {{ nuevaCita.fecha }}:</label>
        <div class="horas-grid">
          <button type="button" v-for="h in bloquesHorarios" :key="h"
            :class="['hora-btn', { 'seleccionada': nuevaCita.hora === h }]" :disabled="estaOcupada(nuevaCita.fecha, h)"
            @click="nuevaCita.hora = h">
            {{ h }}
          </button>
        </div>
      </div>

      <div class="footer-form">
        <button type="submit" class="btn-enviar" v-if="!mostrarBotonPago" :disabled="!formularioListo">
          Confirmar Reserva ✨
        </button>
      </div>

      <div v-if="mostrarBotonPago" class="pago-container">
        <p class="pago-instruccion">¡Casi listo! Haz clic abajo para pagar y asegurar tu hora:</p>
        <button type="button" @click="irAlPago" class="btn-pago">
          Pagar con Mercado Pago 💳
        </button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
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

// VALIDACIÓN UNIFICADA: Esta es la que manda
const formularioListo = computed(() => {
  return (
    categoriaSeleccionada.value !== '' &&
    nuevaCita.value.serviciosDetalle.length > 0 &&
    nuevaCita.value.phone.trim().length >= 8 &&
    nuevaCita.value.fecha !== '' &&
    nuevaCita.value.hora !== '' &&
    mensajeDiaLleno.value === ''
  );
});

const enviarCita = async () => {
  try {
    const docRef = await addDoc(collection(db, "citas"), {
      ...nuevaCita.value,
      timestamp: new Date()
    });

    if (docRef.id) {
      alert("¡Cita guardada correctamente!");
      mostrarBotonPago.value = true;
    }
  } catch (e) {
    console.error("Error:", e);
    alert("Error al guardar la cita.");
  }
};

const irAlPago = () => {
  window.open(linkMercadoPago, '_blank');
  setTimeout(() => { location.reload(); }, 3000);
};

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
/* Mantén tus estilos actuales de .sub-servicios-grid, .btn-pago, etc. */
.aviso-lleno {
  color: white;
  background: #e57373;
  padding: 10px;
  border-radius: 10px;
  margin-bottom: 15px;
  font-weight: bold;
}

.sub-servicios-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
  background: #fff5f8;
  padding: 15px;
  border-radius: 12px;
}

.checkbox-item {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 0.95rem;
  color: #4e342e;
}

.checkbox-item input {
  width: auto;
  margin: 0;
  cursor: pointer;
}

/* El resto de tus estilos (booking-container, hora-btn, etc) se mantienen igual */
.booking-container {
  max-width: 600px;
  margin: 40px auto;
  padding: 40px;
  border-radius: 25px;
  background: #ffffff;
  border: 1px solid #fce4ec;
  box-shadow: 0 20px 40px rgba(121, 85, 72, 0.08);
  font-family: 'Playfair Display', serif;
}

.pago-container {
  margin-top: 20px;
  padding: 20px;
  background-color: #fff9c4;
  /* Un amarillo suave para llamar la atención */
  border-radius: 15px;
  border: 1px dashed #fbc02d;
}

.pago-instruccion {
  color: #4e342e;
  font-weight: bold;
  margin-bottom: 15px;
}

.btn-pago {
  width: 100%;
  background-color: #009ee3;
  /* Azul oficial de Mercado Pago */
  color: white;
  border: none;
  padding: 18px;
  border-radius: 15px;
  font-weight: bold;
  font-size: 1.1rem;
  cursor: pointer;
  transition: background 0.3s;
}

.btn-pago:hover {
  background-color: #007eb5;
}

h2 {
  color: #4e342e;
  font-size: 2.2rem;
  margin-bottom: 30px;
  text-align: center;
}

.form-group {
  margin-bottom: 25px;
  text-align: left;
}

label {
  display: block;
  font-weight: 600;
  color: #6d4c41;
  margin-bottom: 10px;
  font-size: 1.1rem;
}

select,
input[type="tel"] {
  width: 100%;
  padding: 14px;
  border-radius: 12px;
  border: 1.5px solid #eee;
  background-color: #fafafa;
}

.booking-container {
  max-width: 600px;
  margin: 40px auto;
  padding: 40px;
  border-radius: 25px;
  background: #ffffff;
  /* CAMBIO CLAVE: Quitar alturas fijas y permitir scroll */
  height: auto; 
  min-height: 100vh; /* Opcional: para que ocupe al menos el alto de la pantalla */
  overflow: visible; /* Asegura que nada se corte */
  display: block; 
}

/* 2. Asegurar que el formulario no limite el tamaño */
form {
  display: block;
  height: auto;
}

/* 3. Darle un espacio extra al final para que el botón no quede pegado al borde */
.footer-form {
  padding-top: 20px;
  padding-bottom: 50px; /* Espacio para que el usuario pueda hacer scroll cómodo */
}

/* 4. Si las horas se ven muy grandes, usa 4 columnas para que ocupen menos alto */
.horas-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr); 
  gap: 10px;
  margin-bottom: 20px;
}

.hora-btn {
  padding: 12px;
  border: 1.5px solid #ff80ab;
  background: transparent;
  color: #ff80ab;
  border-radius: 10px;
  cursor: pointer;
}

.hora-btn.seleccionada {
  background: #ff80ab;
  color: white;
}

.btn-enviar {
  width: 100%;
  margin-top: 35px;
  background: linear-gradient(45deg, #ff80ab, #f48fb1);
  color: white;
  border: none;
  padding: 18px;
  border-radius: 15px;
  font-weight: bold;
  cursor: pointer;
}
</style>