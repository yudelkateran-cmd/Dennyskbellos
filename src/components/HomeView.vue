<template>
  <div class="home">
    <!-- --- SECCIÓN HERO --- -->
    <section class="hero">
      <div class="hero-content">
        <h1 class="brand-title">DennysK'bellos</h1>
        <p class="hero-subtitle">La magia de embellecer y cuidar tu cabello.</p>
        <router-link :to="usuarioActivo ? '/agendar-cita' : '/login'" class="btn-glitter-main">
          {{ usuarioActivo ? 'Reservar Cita' : 'Reservar Cita' }}
        </router-link>
      </div>
    </section>

    <!-- --- NUEVA SECCIÓN: SOBRE LA DUEÑA --- -->
    <section class="about-owner">
      <div class="about-container">
        <div class="owner-image-wrapper">

          <img src="@/assets/dennis2.jpeg" alt="Dennys - Dueña de DennysKbellos" class="owner-photo">
          <div class="image-badge">Dueña & Estilista</div>
        </div>

        <div class="owner-text">
          <span class="subtitle">La experta tras tu cambio</span>
          <h2>Pasión por resaltar tu magia y tu esencia</h2>
          <p>
            ¡Hola! Soy <strong>Dennys Castillo</strong>. Estilista profesional y una eterna apasionada por el arte de
            transformar. Crecí rodeada de la magia que solo el mundo de la belleza puede brindar, y hoy, esa magia vive
            en mis manos.
          </p>
          <p>
            En <strong>DennysKbellos</strong>, no solo aplicamos técnica; hacemos magia con tu cabello. Diseñamos un
            estilo personalizado
            usando productos premium para que cada hebra cuente tu propia historia de brillo y confianza.
          </p>
          <div class="signature">K'bellos by Dennys</div>
        </div>
      </div>
    </section>

    <!-- --- SECCIÓN SERVICIOS --- -->
    <section class="servicios-section">
      <h2 class="section-title">Nuestros Servicios</h2>
      <div class="grid-servicios">
        <router-link v-for="s in servicios" :key="s.id" :to="{ name: 'DetalleServicio', params: { id: s.id } }"
          class="card-servicio">
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
</script>

<style scoped>
body {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

/* --- ESTILOS EXISTENTES (HERO) --- */
.hero {
  /* Usamos background-size: cover y background-position: center para que no se estire */
  background: linear-gradient(rgba(78, 52, 46, 0.6), rgba(78, 52, 46, 0.9)),
    url('@/assets/portada2.png');
  background-size: cover;      /* 👈 Esto evita que se distorsione */
  background-position: center;   /* 👈 Centra la imagen siempre */
  background-repeat: no-repeat;
  
  color: white;
  padding: 100px 20px;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  
  /* Cambiamos min-height por height para asegurar que en celular se vea bien */
  min-height: 80vh; /* Ocupa el 80% de la altura de la pantalla del celular */
  margin: 0;
  overflow: hidden;
}

.brand-title {
  font-family: 'Playfair Display', serif;
  font-size: 4rem;
  margin-bottom: 10px;
  letter-spacing: 3px;
}

.hero-subtitle {
  font-size: 1.5rem;
  font-style: italic;
  margin-bottom: 30px;
  color: #fce4ec;
}

.btn-glitter-main {
  background: linear-gradient(45deg, #ff80ab, #f48fb1, #fce4ec);
  background-size: 200% 200%;
  padding: 15px 40px;
  color: white;
  font-size: 1.2rem;
  font-weight: bold;
  border-radius: 50px;
  text-decoration: none;
  transition: 0.5s;
  box-shadow: 0 5px 20px rgba(255, 128, 171, 0.4);
}

.btn-glitter-main:hover {
  background-position: right center;
  transform: translateY(-3px);
}

/* --- ESTILOS SECCIÓN DUEÑA (NUEVO) --- */
.about-owner {
  padding: 100px 10%;
  background-color: #fffaf9;
}

.about-container {
  display: flex;
  align-items: center;
  gap: 60px;
  max-width: 1100px;
  margin: 0 auto;
}

.owner-image-wrapper {
  position: relative;
  flex: 1;
}

.owner-photo {
  width: 100%;
  border-radius: 20px;
  /* Sombra sólida café que combina con tu footer */
  box-shadow: 20px 20px 0px #4e342e;
}

.image-badge {
  position: absolute;
  bottom: 20px;
  right: -15px;
  background-color: #ff80ab;
  color: white;
  padding: 10px 20px;
  font-weight: bold;
  border-radius: 5px;
  font-size: 0.9rem;
}

.owner-text {
  flex: 1.2;
  text-align: justify;
}

.subtitle {
  color: #ff80ab;
  text-transform: uppercase;
  font-size: 0.9rem;
  letter-spacing: 2px;
  font-weight: bold;
}

.owner-text h2 {
  color: #4e342e;
  font-size: 2.8rem;
  margin: 15px 0;
  line-height: 1.1;
  font-family: 'Playfair Display', serif;
}

.owner-text p {
  color: #5d4037;
  line-height: 1.7;
  margin-bottom: 20px;
  font-size: 1.1rem;
}

.signature {
  font-size: 2.2rem;
  color: #4e342e;
  font-family: 'Dancing Script', cursive;
  /* Si no tienes esta fuente, usa 'serif' */
  margin-top: 20px;
}

/* --- ESTILOS SERVICIOS (MODIFICADOS) --- */
.servicios-section {
  padding: 100px 5%;
  background-color: #fdfaf9;
}

.section-title {
  text-align: center;
  color: #4e342e;
  font-size: 3rem;
  margin-bottom: 60px;
  font-family: 'Playfair Display', serif;
}

.grid-servicios {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 40px;
  max-width: 1200px;
  margin: 0 auto;
}

.card-servicio {
  background: white;
  padding: 45px 35px;
  border-radius: 20px;
  text-align: center;
  border: 1px solid #fce4ec;
  transition: 0.4s ease;
  text-decoration: none;
}

.card-servicio:hover {
  transform: translateY(-12px);
  border-color: #ff80ab;
  box-shadow: 0 15px 35px rgba(255, 128, 171, 0.2);
}

.leer-mas {
  display: block;
  margin-top: 25px;
  font-size: 0.9rem;
  font-weight: bold;
  color: #ff80ab;
  text-transform: uppercase;
}

/* --- RESPONSIVIDAD --- */
@media (max-width: 900px) {
  .about-container {
    flex-direction: column;
    text-align: center;
    gap: 40px;
  }

  .owner-photo {
    box-shadow: 15px 15px 0px #4e342e;
  }
}

@media (max-width: 768px) {
  .hero {
    /* Ajuste específico para iOS */
    min-height: 70vh; 
    background-attachment: scroll; /* El iPhone odia el 'fixed', mejor dejarlo en scroll */
  }

  .brand-title {
    font-size: 2.2rem; /* Un poco más pequeño para iPhone SE o modelos angostos */
    white-space: nowrap; /* Evita que el nombre se parta en dos líneas feas */
  }
}
</style>