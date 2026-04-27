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
                  <img src="@/assets/visa-5.svg" alt="Visa" class="pay-logo" />
                  <img src="@/assets/mastercard-modern-design-.svg" alt="Mastercard" class="pay-logo" />
                  <img src="@/assets/mercadopago-financiera.svg" alt="Mercado Pago" class="pay-logo" />

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
import { db } from '../firebase'; // Asegúrate de que esta ruta sea la correcta (donde tienes tu config)
import {
  collection,
  addDoc,
  getDocs,
  doc,
  updateDoc,
  query,
  where
} from "firebase/firestore";
import { serviciosPeluqueria } from '../servicios.js';
import { getAuth } from "firebase/auth"; // Importa esto al principio

// ESTADOS
const auth = getAuth();
const mostrarBotonPago = ref(false);
const listaServicios = ref(serviciosPeluqueria);
const citasExistentes = ref([]);
const mensajeDiaLleno = ref('');
const fechaSeleccionada = ref(new Date());
const categoriaSeleccionada = ref('');

const enviarNotificacionCita = async (datosReserva) => {
  // Obtenemos el nombre directamente del usuario logueado
  const usuarioActual = auth.currentUser;
  const nombreParaMostrar = usuarioActual?.displayName || "Cliente registrado";
  // (Si no tiene displayName, mostrará "Cliente registrado")

  try {
    await addDoc(collection(db, 'mail'), {
      to: 'reserva@dennyskbellos.cl',
      message: {
        subject: `✨ Nueva Cita: ${nombreParaMostrar}`,
        html: `
          <div style="font-family: sans-serif; border: 1px solid #ddd; padding: 20px; border-radius: 10px;">
            <h2 style="color: #d4a373;">¡Nueva reserva en DennysKbellos!</h2>
            <p><strong>Cliente:</strong> ${nombreParaMostrar}</p>
            <p><strong>Correo del cliente:</strong> ${usuarioActual?.email}</p>
            <p><strong>Servicio:</strong> ${datosReserva.servicio}</p>
            <p><strong>Fecha y Hora:</strong> ${datosReserva.fecha} a las ${datosReserva.hora}</p>
            <p><strong>Teléfono:</strong> ${datosReserva.telefono}</p>
            <hr>
            <p style="font-size: 12px; color: #888;">Este es un aviso automático de tu sistema de agenda.</p>
          </div>
        `,
      },
    });
  } catch (error) {
    console.error("Error al enviar correo:", error);
  }
};

const nuevaCita = ref({
  nombre: '',
  phone: '',
  servicioPrincipal: '',
  serviciosDetalle: [],
  fecha: '',
  hora: '',
  estado: 'pendiente' // Estado inicial por defecto
});

// VALIDACIÓN
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

// PASO A: GUARDAR CITA PREVIA
const enviarCita = async () => {
  if (!formularioListo.value) {
    alert("Por favor completa todos los campos.");
    return;
  }

  try {
    // 1. Guardamos la cita en Firestore
    const dataParaGuardar = {
      ...nuevaCita.value,
      timestamp: new Date()
    };

    const docRef = await addDoc(collection(db, "citas"), dataParaGuardar);

    // 2. DISPARAMOS EL CORREO (Llamada a la extensión)
    // Usamos los datos de nuevaCita para el correo
    await enviarNotificacionCita({
      nombreCliente: "Nueva Cliente", // Si tienes un campo de nombre, úsalo aquí
      servicio: nuevaCita.value.servicioPrincipal,
      fecha: nuevaCita.value.fecha,
      hora: nuevaCita.value.hora,
      telefono: nuevaCita.value.phone
    });

    localStorage.setItem('id_reserva_pendiente', docRef.id);
    mostrarBotonPago.value = true;

    setTimeout(() => {
      document.getElementById('seccion-pago')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 300);

  } catch (e) {
    console.error("Error en el proceso:", e);
    alert("Error al registrar la intención de cita.");
  }
};
// REDIRECCIÓN A MERCADO PAGO
const irAlPago = () => {
  // Aquí podrías actualizar el timestamp antes de irte si quieres renovar los 15 min
  window.location.href = "https://mpago.li/1R4v3Ur";
};

// PASO B: CONFIRMACIÓN AL VOLVER
const confirmarReserva = async () => {
  const idReserva = localStorage.getItem('id_reserva_pendiente');
  if (idReserva) {
    try {
      const citaRef = doc(db, "citas", idReserva);
      await updateDoc(citaRef, {
        estado: 'confirmado'
      });
      localStorage.removeItem('id_reserva_pendiente');
      alert("¡Tu pago fue recibido! Cita confirmada.");
      await cargarCitas(); // Recargamos para bloquear el horario
    } catch (e) {
      console.error("Error confirmando:", e);
    }
  }
};

// LÓGICA DE CARGA Y DISPONIBILIDAD
const cargarCitas = async () => {
  const res = await getDocs(collection(db, "citas"));
  const todas = res.docs.map(doc => ({ id: doc.id, ...doc.data() }));

  // FILTRO INTELIGENTE: Bloqueamos si está confirmado 
  // O si es pendiente pero se creó hace menos de 15 minutos
  const ahora = new Date();
  citasExistentes.value = todas.filter(cita => {
    if (cita.estado === 'confirmado') return true;
    if (cita.estado === 'pendiente' && cita.timestamp) {
      const diff = (ahora - cita.timestamp.toDate()) / 1000 / 60;
      return diff < 15; // Bloqueo temporal de 15 min
    }
    return false;
  });
};

const estaOcupada = (fecha, hora) => {
  return citasExistentes.value.some(c => c.fecha === fecha && c.hora === hora);
};

// CICLO DE VIDA (VUE 3 SETUP)
onMounted(async () => {
  await cargarCitas();

  // Revisar si volvemos de un pago exitoso
  const urlParams = new URLSearchParams(window.location.search);
  if (urlParams.get('status') === 'approved' || urlParams.get('pago') === 'exitoso') {
    await confirmarReserva();
  }
});

// MÉTODOS DE APOYO
const serviciosDisponibles = computed(() => {
  const cat = listaServicios.value.find(s => s.nombre === categoriaSeleccionada.value);
  return cat ? cat.subservicios : [];
});

const limpiarServicios = () => {
  nuevaCita.value.serviciosDetalle = [];
  nuevaCita.value.servicioPrincipal = categoriaSeleccionada.value;
  nuevaCita.value.hora = '';
};

const onDiaSeleccionado = (day) => {
  nuevaCita.value.fecha = day.id;
  nuevaCita.value.hora = '';
  const total = citasExistentes.value.filter(c => c.fecha === nuevaCita.value.fecha).length;
  mensajeDiaLleno.value = total >= bloquesHorarios.length ? '❌ Día completo' : '';
};

const bloquesHorarios = ['09:00', '10:00', '11:00', '12:00', '15:00', '16:00', '17:00', '18:00'];
const atributosCalendario = computed(() => {
  return citasExistentes.value.map(cita => ({
    dot: 'pink',
    dates: new Date(cita.fecha + 'T12:00:00')
  }));
});
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