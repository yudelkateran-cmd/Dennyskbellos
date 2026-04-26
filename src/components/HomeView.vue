<template>
  <div class="home">
    <section class="hero">
      <div class="hero-content">
        <h1 class="brand-title">DennysK'bellos</h1>
        <p class="hero-subtitle">La magia de embellecer y cuidar tu cabello.</p>
        <router-link to="/agendar-cita" class="btn-glitter-main">
          Reservar Cita
        </router-link>
      </div>
    </section>

    <section class="about-owner">
      <div class="about-container">
        <div class="owner-image-wrapper">
          <img src="@/assets/dennis2.jpeg" alt="Dennys Castillo" class="owner-photo">
          <div class="image-badge">Dueña & Estilista</div>
        </div>

        <div class="owner-text">
          <span class="subtitle">La experta tras tu cambio</span>
          <h2>Pasión por resaltar tu magia y tu esencia</h2>
          <p>
            ¡Hola! Soy <strong>Dennys Castillo</strong>. Estilista profesional y una eterna apasionada por el arte de transformar. 
            En <strong>DennysKbellos</strong>, hacemos magia con tu cabello diseñando un estilo personalizado.
          </p>
          <div class="signature">K'bellos by Dennys</div>
        </div>
      </div>
    </section>

    <section class="servicios-section">
      <h2 class="section-title">Nuestros Servicios</h2>
      <div class="grid-servicios">
        <router-link v-for="s in servicios" :key="s.id" :to="{ name: 'DetalleServicio', params: { id: s.id } }" class="card-servicio">
          <div class="card-icon">✨</div>
          <h3>{{ s.nombre }}</h3>
          <p class="servicio-detalle">{{ s.detalle }}</p>
          <span class="leer-mas">Ver trabajos y galería →</span>
        </router-link>
      </div>
    </section>
  </div>
</template>

<script setup>
import { serviciosPeluqueria } from '@/servicios.js';
const servicios = serviciosPeluqueria;

// Definimos usuarioActivo para que no de error
const usuarioActivo = false; 
</script>

<style scoped>
/* --- HERO CORREGIDO PARA CELULAR --- */
.hero {
  background: linear-gradient(rgba(78, 52, 46, 0.6), rgba(78, 52, 46, 0.9)),
    url('@/assets/portada2.png');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  color: white;
  padding: 100px 20px;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  min-height: 450px;
}

.brand-title {
  font-family: 'Playfair Display', serif;
  font-size: 3.5rem;
  margin-bottom: 10px;
  letter-spacing: 3px;
}

.hero-subtitle {
  font-size: 1.2rem;
  margin-bottom: 30px;
}

.btn-glitter-main {
  background: linear-gradient(45deg, #ff80ab, #f48fb1, #fce4ec);
  padding: 15px 40px;
  color: white;
  font-weight: bold;
  border-radius: 50px;
  text-decoration: none;
  display: inline-block;
}

/* --- SECCIÓN DUEÑA --- */
.about-owner { padding: 80px 10%; background-color: #fffaf9; }
.about-container { display: flex; align-items: center; gap: 40px; max-width: 1100px; margin: 0 auto; }
.owner-image-wrapper { flex: 1; position: relative; }
.owner-photo { width: 100%; border-radius: 20px; box-shadow: 15px 15px 0px #4e342e; }
.owner-text { flex: 1.2; text-align: left; }
.signature { font-size: 2rem; font-family: 'Dancing Script', cursive; color: #4e342e; }

/* --- SERVICIOS --- */
.servicios-section { padding: 60px 5%; }
.grid-servicios { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 20px; }
.card-servicio { background: white; padding: 30px; border-radius: 15px; border: 1px solid #fce4ec; text-decoration: none; text-align: center; color: inherit; }

/* --- RESPONSIVIDAD PARA IPHONE Y CELULARES --- */
@media (max-width: 768px) {
  .hero { min-height: 60vh; }
  .brand-title { font-size: 2.2rem; }
  .about-container { flex-direction: column; text-align: center; }
  .owner-text { text-align: center; }
  .owner-text h2 { font-size: 1.8rem; }
}
</style>