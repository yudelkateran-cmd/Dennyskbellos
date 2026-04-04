<template>
  <div class="galeria-grid">
    <div v-for="(foto, index) in imagenes" :key="index" class="foto-item">
     <div class="marco-foto">
        <img :src="foto" alt="Trabajo Real DennysKbellos" />
        <div class="descripcion">
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
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 15px;
  margin-top: 20px;
}
.marco-foto {
  background: white;
  padding: 12px; /* Espacio del marco blanco */
  border-radius: 15px;
  border: 1px solid #fce4ec; /* Borde rosado suave */
  box-shadow: 0 10px 20px rgba(78, 52, 46, 0.08); /* Sombra elegante */
  transition: all 0.3s ease;
  text-align: center;
}

.marco-foto:hover {
  transform: translateY(-8px);
  box-shadow: 0 15px 30px rgba(255, 128, 171, 0.2);
  border-color: #ff80ab;
}

.descripcion {
  padding: 15px 5px 5px;
}

.descripcion p {
  font-family: 'Playfair Display', serif;
  color: #4e342e; /* Tu color café */
  font-weight: bold;
  margin: 0;
  font-size: 1.1rem;
}

.descripcion span {
  color: #ff80ab; /* Rosado glitter */
  font-size: 0.8rem;
  text-transform: uppercase;
  letter-spacing: 1px;
}

</style>