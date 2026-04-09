<template>
  <div class="galeria-grid">
    <div v-for="(foto, index) in imagenes" :key="index"
      :class="['foto-item', Number(index) % 2 === 0 ? 'girar-der' : 'girar-izq']">
      <div class="marco-polaroid">
        <div class="contenedor-imagen">
          <img :src="foto" alt="Trabajo Real DennysKbellos" />
        </div>
        <div class="descripcion-vintage">
          <p>Resultado Real ✨</p>
          <span>DennysKbellos</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps(['imagenes']);
</script>

<style scoped>
.galeria-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 30px;
  padding: 20px;
  /* Fondo que haga resaltar el blanco de las fotos */
  background-color: #fdfaf9;
}

.marco-polaroid {
  background: white;
  /* El secreto: padding desigual (más abajo) */
  padding: 15px 15px 40px 15px;
  border-radius: 2px;
  /* Las fotos antiguas son más cuadradas */
  box-shadow: 0 8px 15px rgba(0, 0, 0, 0.1);
  transition: all 0.4s ease;
  position: relative;
  border: 1px solid #eee;
}

.contenedor-imagen {
  overflow: hidden;
  aspect-ratio: 1 / 1;
  /* Hace que la foto sea cuadrada como las de antes */
  border: 1px solid #f0f0f0;
}

.contenedor-imagen img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  /* Filtro suave para el look vintage */
  filter: sepia(10%) contrast(105%);
}

/* Efecto de rotación aleatoria */
.girar-der {
  transform: rotate(2deg) !important;
}

.girar-izq {
  transform: rotate(-2deg) !important;
}

.foto-item:hover {
  transform: rotate(0deg) scale(1.05);
  z-index: 10;
}

.descripcion-vintage {
  padding-top: 20px;
  text-align: center;
}

.descripcion-vintage p {
  /* Una fuente cursiva se vería genial aquí */
  font-family: 'Dancing Script', cursive, serif;
  color: #4e342e;
  font-size: 1.3rem;
  margin: 0;
}

.descripcion-vintage span {
  font-size: 0.7rem;
  color: #ff80ab;
  letter-spacing: 2px;
}
</style>