<template>
  <footer class="main-footer">
    <div class="footer-content">
      <!-- Sección Marca -->
      <div class="footer-section brand-section">
        <h4>DennysKbellos</h4>
        <p class="slogan">Expertos en Colorimetría y Estilo.</p>
        
        <!-- Instagram Simplificado -->
        <a href="https://www.instagram.com/dennys_kbellos" target="_blank" class="social-link">
          <span class="icon">📸</span>
          <span class="text">@dennys_kbellos</span>
        </a>
      </div>

      <!-- Sección Contacto y Mapa -->
      <div class="footer-section contact-section">
        <h4>Contacto</h4>
        <p class="address">
          <span>📍</span> 
          <span class="address-text">JJ. La Torre 461, Puertas del Mar, La Serena, Chile</span>
        </p>

        <!-- Contenedor del Mapa -->
        <div class="map-container">
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3459.3475871271613!2d-71.2612349!3d-29.9118747!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9691ca76939634d3%3A0x6095033c462702a!2sJuan%20Jos%C3%A9%20Latorre%20461%2C%20La%20Serena%2C%20Coquimbo!5e0!3m2!1ses!2scl!4v1712580000000!5m2!1ses!2scl" 
            width="100%" 
            height="150" 
            style="border:0;" 
            allowfullscreen 
            loading="lazy">
          </iframe>
        </div>
        
        <a href="https://wa.me/56956919142?text=Hola!%20Me%20gustaría%20agendar%20una%20cita%20en%20DennysKbellos" 
           target="_blank" 
           class="social-link whatsapp-style">
           <span class="icon">📱</span> 
           <span class="text">+56 9 5691 9142</span>
        </a>
      </div>
    </div>
    
    <div class="footer-bottom">
      &copy; 2026 Diseñado por Inv. JRT SPA - DennysKbellos
    </div>
  </footer>
</template>

<style scoped>
.main-footer {
  background-color: #4e342e;
  color: #fce4ec;
  padding: 50px 8% 30px;
  margin-top: 50px;
  font-family: 'Segoe UI', Tahoma, sans-serif;
}

.footer-content {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 40px;
  margin-bottom: 40px;
}

.footer-section {
  flex: 1 1 300px;
  max-width: 450px;
}

h4 { 
  color: white; 
  margin-bottom: 20px; 
  font-size: 1.4rem;
}

/* Estilo unificado para enlaces sociales (Instagram y WhatsApp) */
.social-link {
  display: flex;
  align-items: center;
  gap: 12px;
  color: #fce4ec;
  text-decoration: none;
  font-size: 1.1rem;
  margin-top: 15px;
  padding: 10px 15px;
  border: 1px solid rgba(252, 228, 236, 0.2);
  border-radius: 8px;
  transition: all 0.3s ease;
  width: fit-content;
}

.social-link:hover {
  background-color: rgba(252, 228, 236, 0.1);
  color: #ffffff;
  transform: translateX(5px);
}

/* Estilos para el Mapa */
.map-container {
  margin: 15px 0;
  border-radius: 12px;
  overflow: hidden;
  border: 2px solid rgba(252, 228, 236, 0.1);
}

.address {
  display: flex;
  gap: 10px;
  line-height: 1.4;
}

.footer-bottom {
  text-align: center;
  border-top: 1px solid rgba(252, 228, 236, 0.2);
  padding-top: 30px;
  font-size: 0.85rem;
  opacity: 0.8;
}
</style>