<template>
  <div class="galeria-seccion">
    <div class="galeria-grid">
      <div v-for="(foto, index) in imagenes" :key="index"
        :class="['foto-item', index % 2 === 0 ? 'girar-der' : 'girar-izq']">
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
  </div>
</template>

<script setup>
// ESTO ES LO QUE FALTA: Sin esto, "imagenes" es invisible para el componente
defineProps(['imagenes']);
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Dancing+Script:wght@600&display=swap');

.galeria-seccion {
  background-color: #fdfaf9;
  /* Fondo suave para que resalte el blanco */
  padding: 60px 20px;
  width: 100%;
  overflow: visible;
  /* Importante para que no se corten las sombras */
}

.galeria-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 60px;
  /* Más espacio para la rotación */
  max-width: 1200px;
  margin: 0 auto;
}

.foto-item {
  display: flex;
  justify-content: center;
  align-items: center;
  perspective: 1000px;
  /* Añade profundidad */
}

.marco-polaroid {
  background-color: #ffffff !important;
  /* El !important asegura el color blanco */
  padding: 15px 15px 60px 15px !important;
  /* Espacio extra abajo */
  display: block;
  margin: 10px;
  /* Separación mínima entre marcos */
  box-shadow: 5px 10px 30px rgba(0, 0, 0, 0.15) !important;
  border: 1px solid #ddd !important;
  width: 250px;
}

.contenedor-imagen {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: top;
  display: block;
  filter: contrast(110%) sepia(5%);
  overflow: hidden;
  background-color: #f5f5f5;
  border: 1px solid #f0f0f0;
  /* Define el borde de la foto */
}

.contenedor-imagen img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.descripcion-vintage {
  margin-top: 15px;
  text-align: center;
}

.descripcion-vintage p {
  font-family: 'Dancing Script', cursive;
  color: #5d4037;
  font-size: 1.6rem;
  margin: 0;
  line-height: 1.2;
}

.descripcion-vintage span {
  font-size: 0.7rem;
  color: #ff80ab;
  text-transform: uppercase;
  letter-spacing: 2px;
  font-weight: bold;
}

/* Rotaciones suaves */
.girar-der {
  transform: rotate(4deg);
}

.girar-izq {
  transform: rotate(-4deg);
}

.foto-item:hover {
  z-index: 10;
}

.foto-item:hover .marco-polaroid {
  transform: scale(1.1) rotate(0deg);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
}
</style>