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
        <input v-model="nuevaCita.phone" type="tel" placeholder="Ej: 912345678" required />
      </div>

      <div class="form-group">
        <label>Selecciona la Fecha:</label>
        <div v-if="mensajeDiaLleno" class="aviso-lleno">{{ mensajeDiaLleno }}</div>
        <VDatePicker v-model="fechaSeleccionada" :min-date="new Date()" :attributes="atributosCalendario"
          @dayclick="onDiaSeleccionado" mode="date" expanded transparent borderless />
      </div>

      <div v-if="nuevaCita.fecha && !mensajeDiaLleno" class="form-group">
        <label>Hora para el {{ nuevaCita.fecha }}:</label>
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

        <div v-if="mostrarBotonPago" class="pago-container" id="seccion-pago">
          <div class="pago-exito-msg">
            <span>✅</span>
            <p><strong>¡Cita registrada!</strong></p>
          </div>
          <p class="pago-instruccion">Para asegurar tu cupo, paga de forma segura con tu banco:</p>

          <div class="pasarela-container">
            <button type="button" @click="irAlPago" class="btn-pasarela-total">
              <div class="btn-content">
                <span class="main-text">Pagar con Webpay / Débito / Crédito</span>
                <div class="logos-pago">
                  <img src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" alt="Visa" />

                  <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" alt="Mastercard" />

                  <img
                    src="https://http2.mlstatic.com/storage/logos-api-admin/a2ed2580-d2d4-11e7-bc35-c15077977464-m.png"
                    alt="MP" />

                  <span class="webpay-label">Webpay</span>
                </div>
              </div>
            </button>
            <p class="nota-seguridad">
              <i class="bi bi-shield-fill-check"></i> Pago procesado de forma segura por Mercado Pago Chile
            </p>
          </div>
        </div>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { db } from '../firebase';
import { collection, addDoc, getDocs } from "firebase/firestore";
import { serviciosPeluqueria } from '../servicios.js';

// ESTADOS
const mostrarBotonPago = ref(false);
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

// VALIDACIÓN FLEXIBLE (Para que el cliente no se trabe)
const formularioListo = computed(() => {
  const tieneTelefono = nuevaCita.value.phone && nuevaCita.value.phone.toString().length >= 8;

  return (
    categoriaSeleccionada.value !== '' &&
    nuevaCita.value.serviciosDetalle.length > 0 &&
    tieneTelefono &&
    nuevaCita.value.fecha !== '' &&
    nuevaCita.value.hora !== '' &&
    mensajeDiaLleno.value === ''
  );
});

// GUARDAR CITA Y MOSTRAR PAGO
const enviarCita = async () => {
  console.log("Intentando enviar cita...", nuevaCita.value);

  if (!formularioListo.value) {
    alert("Por favor completa todos los campos.");
    return;
  }

  try {
    // AQUÍ ESTÁ EL CAMBIO: agregamos "const docRef ="
    const docRef = await addDoc(collection(db, "citas"), {
      ...nuevaCita.value,
      timestamp: new Date()
    });

    console.log("Documento guardado con ID: ", docRef.id);

    // Si llegamos aquí, todo salió bien
    mostrarBotonPago.value = true;

    // Scroll suave hacia la sección de pago
    setTimeout(() => {
      const el = document.getElementById('seccion-pago');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }, 200);

  } catch (e) {
    console.error("Error completo de Firebase:", e); // Esto te dará más info en la consola
    alert("Error al guardar la cita.");
  }
};

// REDIRECCIÓN A PASARELA DE PAGO
const irAlPago = () => {
  // AQUÍ DEBES PONER EL LINK QUE GENERES EN TU PANEL DE MERCADO PAGO
  const linkMercadoPago = "https://mpago.li/1R4v3Ur";
  window.location.href = linkMercadoPago;
};

// LÓGICA DE SERVICIOS
const serviciosDisponibles = computed(() => {
  const cat = listaServicios.value.find(s => s.nombre === categoriaSeleccionada.value);
  return cat ? cat.subservicios : [];
});

const limpiarServicios = () => {
  nuevaCita.value.serviciosDetalle = [];
  nuevaCita.value.servicioPrincipal = categoriaSeleccionada.value;
  nuevaCita.value.hora = '';
};

// CALENDARIO Y HORARIOS
const atributosCalendario = computed(() => {
  return citasExistentes.value.map(cita => ({
    dot: 'pink',
    dates: new Date(cita.fecha + 'T12:00:00')
  }));
});

const onDiaSeleccionado = (day) => {
  nuevaCita.value.fecha = day.id;
  validarFechaSeleccionada();
};

const bloquesHorarios = ['09:00', '10:00', '11:00', '12:00', '15:00', '16:00', '17:00', '18:00'];

const cargarCitas = async () => {
  const res = await getDocs(collection(db, "citas"));
  citasExistentes.value = res.docs.map(doc => doc.data());
};

const estaOcupada = (fecha, hora) => {
  return citasExistentes.value.some(c => c.fecha === fecha && c.hora === hora);
};

const validarFechaSeleccionada = () => {
  nuevaCita.value.hora = '';
  const total = citasExistentes.value.filter(c => c.fecha === nuevaCita.value.fecha).length;
  mensajeDiaLleno.value = total >= bloquesHorarios.length ? '❌ Día completo' : '';
};

onMounted(cargarCitas);
</script>

<style scoped>
.checkbox-item {
  display: flex;
  align-items: center;
  /* Alinea verticalmente al centro */
  justify-content: flex-start;
  /* Alinea al inicio (izquierda) */
  gap: 8px;
  /* Espacio entre el cuadro y el texto */
  font-size: 0.9rem;
  padding: 5px 0;
}

.checkbox-item input[type="checkbox"] {
  width: 18px;
  /* Tamaño fijo para que no se deforme */
  height: 18px;
  margin: 0;
  cursor: pointer;
  flex-shrink: 0;
  /* Evita que el cuadro se achique */
}

.checkbox-item label {
  margin: 0;
  cursor: pointer;
  font-weight: normal;
  color: #4e342e;
}

.booking-container {
  max-width: 600px;
  margin: 20px auto;
  padding: 30px;
  background: #fff;
  border-radius: 24px;
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.08);
}

/* Sección de Pago Estilo Despegar */
.pago-container {
  display: block !important;
  /* Forzamos visibilidad */
  margin-top: 30px;
  padding: 25px;
  background-color: #f0f7ff;
  border: 2px solid #009ee3;
  border-radius: 20px;
  text-align: center;
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.btn-pasarela-total {
  width: 100%;
  background: white;
  border: 2px solid #009ee3;
  padding: 20px;
  border-radius: 15px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.btn-pasarela-total:hover {
  background: #009ee3;
}

.btn-pasarela-total:hover .main-text,
.btn-pasarela-total:hover .webpay-label {
  color: white;
}

.btn-content {
  display: flex;
  flex-direction: column;
  gap: 12px;
  align-items: center;
}

.main-text {
  font-weight: bold;
  font-size: 1.1rem;
  color: #009ee3;
}

.logos-pago {
  display: flex;
  align-items: center;
  gap: 12px;
}

.logos-pago img {
  height: 18px;
  filter: grayscale(30%);
}

.webpay-label {
  font-weight: 800;
  color: #009ee3;
  font-style: italic;
  font-size: 0.9rem;
}

/* Resto de estilos */
.btn-enviar {
  width: 100%;
  padding: 18px;
  background: linear-gradient(135deg, #ff80ab, #f06292);
  border: none;
  color: white;
  border-radius: 12px;
  font-weight: bold;
  font-size: 1.1rem;
  cursor: pointer;
  margin-top: 20px;
}

.btn-enviar:disabled {
  background: #e0e0e0;
  cursor: not-allowed;
}

.form-group {
  margin-bottom: 22px;
  text-align: left;
}

label {
  display: block;
  font-weight: 600;
  color: #4e342e;
  margin-bottom: 8px;
}

select,
input {
  width: 100%;
  padding: 12px;
  border-radius: 10px;
  border: 1px solid #ddd;
}

.sub-servicios-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
  background: #fffafa;
  padding: 12px;
  border-radius: 10px;
}

.horas-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 8px;
}

.hora-btn {
  padding: 10px;
  border: 1px solid #ff80ab;
  background: white;
  color: #ff80ab;
  border-radius: 8px;
  cursor: pointer;
}

.hora-btn.seleccionada {
  background: #ff80ab;
  color: white;
}

.nota-seguridad {
  font-size: 0.75rem;
  color: #888;
  margin-top: 12px;
}
</style>