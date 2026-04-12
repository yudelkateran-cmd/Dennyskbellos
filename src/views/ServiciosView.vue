<template>
  <div class="detalle-page" v-if="servicio">
    <div class="header-servicio">
      <h1>{{ servicio.nombre || 'Nuestros Servicios' }}</h1>
      <p class="descripcion">{{ servicio.detalle || 'Expertos en colorimetría y estilo en La Serena.' }}</p>
    </div>

    <section class="galeria-seccion-wrapper">
      <h2 class="titulo-galeria">Nuestro Trabajo Real</h2>

      <div v-if="!fotosAMostrar || fotosAMostrar.length === 0" class="no-fotos">
        <p>Próximamente fotos de nuestros trabajos en La Serena...</p>
      </div>

      <GaleriaServicio v-else :imagenes="fotosAMostrar" />

      <router-link to="/" class="btn-volver">← Volver al Inicio</router-link>
    </section>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useRoute } from 'vue-router';
// Importamos la data de servicios
import { serviciosPeluqueria } from '@/servicios.js';
// Importación corregida del componente de las Polaroids
import GaleriaServicio from '@/components/GaleriaServicio.vue'; 

const route = useRoute();

// 1. Buscamos el servicio por ID
const servicio = computed(() => {
  const servicioId = route.params.id;
  if (!servicioId) {
    return {
      nombre: 'Nuestros Servicios',
      fotos: [],
      detalle: 'Expertos en colorimetría y estilo en La Serena.'
    };
  }
  return serviciosPeluqueria.find(s => s.id === parseInt(String(servicioId)));
});

// 2. Obtenemos las imágenes correspondientes
const fotosAMostrar = computed(() => {
  const servicioId = route.params.id;
  if (!servicioId) {
    // Si no hay ID, mostramos todas las fotos del portafolio
    return serviciosPeluqueria.flatMap(s => s.fotos);
  }
  const s = serviciosPeluqueria.find(item => item.id === parseInt(String(servicioId)));
  return s ? s.fotos : [];
});
</script>

<style scoped>
.detalle-page {
  padding: 120px 5% 60px;
  text-align: center;
  /* Fondo suave que hace resaltar el blanco de los marcos */
  background-color: #fdfaf9; 
}

h1 {
  font-family: 'Playfair Display', serif;
  color: #4e342e;
  font-size: 3rem;
  margin-bottom: 10px;
}

.descripcion {
  color: #6d4c41;
  font-size: 1.2rem;
  margin-bottom: 50px;
  max-width: 700px;
  margin-left: auto;
  margin-right: auto;
}

/* Este wrapper asegura que los marcos rotados no se corten */
.galeria-seccion-wrapper {
  overflow: visible;
  padding: 20px 0;
}

.titulo-galeria {
  font-family: 'Playfair Display', serif;
  color: #4e342e;
  margin-bottom: 30px;
}

.no-fotos {
  padding: 50px;
  border: 2px dashed #fce4ec;
  border-radius: 20px;
  color: #ad8a81;
  background: white;
}

.btn-volver {
  display: inline-block;
  margin-top: 60px;
  color: #4e342e;
  text-decoration: none;
  font-weight: bold;
  border-bottom: 2px solid #ff80ab;
  padding-bottom: 5px;
  transition: color 0.3s;
}

.btn-volver:hover {
  color: #ff80ab;
}
</style>