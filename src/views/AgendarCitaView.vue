<template>
  <div class="agenda-container">
    <div class="agenda-card">
      <header class="agenda-header">
        <h1>Reserva tu Cita</h1>
        <p>Selecciona los servicios y el horario que prefieras</p>
      </header>

      <form @submit.prevent="confirmarCita" class="agenda-form">
        
        <!-- 1. Selección de Categoría Principal -->
        <div class="form-group">
          <label>¿Qué categoría buscas?</label>
          <select v-model="categoriaSeleccionada" @change="cita.subserviciosSeleccionados = []" required>
            <option value="" disabled>Selecciona una categoría</option>
            <option v-for="s in servicios" :key="s.id" :value="s">
              {{ s.nombre }}
            </option>
          </select>
        </div>

        <!-- 2. Selección de Subservicios (Aparece solo si hay categoría) -->
        <div v-if="categoriaSeleccionada" class="form-group subservicios-container">
          <label>Selecciona uno o varios servicios:</label>
          <div class="checkbox-grid">
            <div v-for="sub in categoriaSeleccionada.subservicios" :key="sub" class="checkbox-item">
              <input 
                type="checkbox" 
                :id="sub" 
                :value="sub" 
                v-model="cita.subserviciosSeleccionados"
              >
              <label :for="sub">{{ sub }}</label>
            </div>
          </div>
        </div>

        <!-- 3. Fecha -->
        <div class="form-group">
          <label>Fecha</label>
          <input type="date" v-model="cita.fecha" :min="fechaMinima" required>
        </div>

        <!-- 4. Hora -->
        <div class="form-group">
          <label>Hora disponible</label>
          <select v-model="cita.hora" required>
            <option value="" disabled>Selecciona una hora</option>
            <option v-for="h in horarios" :key="h" :value="h">{{ h }}</option>
          </select>
        </div>

        <button type="submit" class="btn-confirmar" :disabled="cita.subserviciosSeleccionados.length === 0">
          Confirmar Reserva ✨
        </button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { reactive, computed, ref } from 'vue';
import { useRouter } from 'vue-router';
import { serviciosPeluqueria } from '@/servicios.js';

const router = useRouter();
const servicios = serviciosPeluqueria;
const categoriaSeleccionada = ref(null);

const cita = reactive({
  subserviciosSeleccionados: [],
  fecha: '',
  hora: ''
});

const horarios = ['10:00', '11:30', '13:00', '15:30', '17:00', '18:30'];

const fechaMinima = computed(() => {
  const hoy = new Date();
  return hoy.toISOString().split('T')[0];
});

const confirmarCita = async () => {
  const nuevaCita = {
    // Datos de la peluquería
    servicio: categoriaSeleccionada.value.nombre,
    subservicios: cita.subserviciosSeleccionados.join(', '),
    fecha: cita.fecha,
    hora: cita.hora,
    
    // Datos del cliente
    name: "Cliente Temporal", // Aquí irá el nombre real después
    tipo: "cita", // <--- Así MockAPI sabe que esto NO es un usuario
    
    // Identificador para no mezclar
    clienteId: "ID_UNICO_001" 
  };

  try {
    const respuesta = await fetch('https://69cbdec70b417a19e07b6a42.mockapi.io/Usuarios', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(nuevaCita)
    });

    if (respuesta.ok) {
      alert("¡Cita guardada en el sistema de DennysKbellos!");
      router.push('/');
    }
  } catch (error) {
    console.error("Error al guardar:", error);
  }
};
</script>

<style scoped>
.btn-glitter-main {
  border: 2px solid #ffffff; /* Un borde fino blanco queda elegante */
  background: linear-gradient(45deg, #ff80ab, #f48fb1);
  transition: all 0.3s ease;
}
.btn-glitter-main:hover {
  box-shadow: 0 0 20px rgba(255, 128, 171, 0.6);
  transform: scale(1.05);
}

.agenda-container {
  min-height: 90vh;
  padding: 120px 20px 50px;
  background-color: #fffafb;
  display: flex;
  justify-content: center;
}

.agenda-card {
  background: white;
  width: 100%;
  max-width: 500px;
  padding: 40px;
  border-radius: 20px;
  box-shadow: 0 10px 30px rgba(78, 52, 46, 0.05);
  border: 1px solid #fce4ec;
}

.agenda-header {
  text-align: center;
  margin-bottom: 30px;
}

h1 {
  font-family: 'Playfair Display', serif;
  color: #4e342e;
  font-size: 2rem;
}

p {
  color: #8d6e63;
  font-size: 0.9rem;
}

.form-group {
  margin-bottom: 20px;
  text-align: left;
}

label {
  display: block;
  font-weight: 600;
  color: #4e342e;
  margin-bottom: 8px;
  font-size: 0.9rem;
}

select, input {
  width: 100%;
  padding: 12px;
  border: 1px solid #fce4ec;
  border-radius: 10px;
  outline: none;
  font-family: inherit;
}

select:focus, input:focus {
  border-color: #ff80ab;
}

.btn-confirmar {
  width: 100%;
  padding: 15px;
  margin-top: 10px;
  border: none;
  border-radius: 50px;
  background: linear-gradient(45deg, #ff80ab, #f48fb1);
  color: white;
  font-weight: bold;
  font-size: 1rem;
  cursor: pointer;
  box-shadow: 0 4px 15px rgba(255, 128, 171, 0.3);
  transition: transform 0.2s;
}

.btn-confirmar:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(255, 128, 171, 0.4);
}
.subservicios-container {
  background: #fff5f7;
  padding: 15px;
  border-radius: 12px;
  border: 1px solid #fce4ec;
  margin-top: -10px;
}

.checkbox-grid {
  display: grid;
  grid-template-columns: 1fr 1fr; /* Dos columnas */
  gap: 10px;
  margin-top: 10px;
}

.checkbox-item {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 0.85rem;
  color: #6d4c41;
  cursor: pointer;
}

.checkbox-item input {
  width: auto; /* Para que no ocupe todo el ancho */
  cursor: pointer;
}

.checkbox-item label {
  margin-bottom: 0;
  cursor: pointer;
  font-weight: 400;
}

.btn-confirmar:disabled {
  background: #ccc;
  box-shadow: none;
  cursor: not-allowed;
}
</style>