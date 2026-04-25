<template>
  <footer class="main-footer">
    <div class="footer-content">
      
      <div class="footer-section">
        <h4>DennysKbellos</h4>
        <p class="subtitle">Experta en Colorimetría y Estilo.</p>

        <div class="social-links-container">
          <a href="https://www.instagram.com/dennys_kbellos" target="_blank" class="minimal-btn instagram">
            <i class="bi bi-instagram"></i>
            <span>@dennys_kbellos</span>
          </a>

          <a href="https://wa.me/56956919142" target="_blank" class="minimal-btn whatsapp">
            <i class="bi bi-whatsapp"></i>
            <span>+569 5691 9142</span>
          </a>
        </div>
      </div>

      <div class="footer-section">
        <h4>Contacto</h4>
        <p class="address">
          <span class="icon">📍</span>
          <span class="address-text">JJ. La Torre 461, Puertas del Mar, La Serena, Chile</span>
        </p>
        
        <div class="map-container">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3459.34444!2d-71.261234!3d-29.901234!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjnCsDU0JzA0LjQiUyA3McKwMTUnNDAuNCJX!5e0!3m2!1ses!2scl!4v1620000000000!5m2!1ses!2scl"
            width="100%" height="150" style="border:0;" allowfullscreen loading="lazy">
          </iframe>
        </div>
      </div>

    </div>

    <div class="footer-bottom">
      © 2026 Diseñado por Inv. JRT SPA — DennysKbellos
    </div>
  </footer>
</template>

<style scoped>
/* 1. ESTRUCTURA BASE */
.main-footer {
  background-color: #4e342e;
  color: #fce4ec;
  padding: 60px 8% 30px;
  font-family: 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
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
  color: #ffffff;
  margin-bottom: 20px;
  font-size: 1.5rem;
  font-weight: 600;
}

.subtitle {
  margin-bottom: 25px;
  opacity: 0.9;
}

/* 2. BOTONES SOCIALES (MINIMALISTAS) */
.social-links-container {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.minimal-btn {
  display: flex;
  align-items: center;
  gap: 12px;
  text-decoration: none;
  color: #fce4ec;
  font-size: 1rem;
  width: fit-content;
  transition: all 0.3s ease;
  padding: 5px 0;
  border-bottom: 1px solid transparent;
}

.minimal-btn i {
  font-size: 1.2rem;
  transition: transform 0.3s ease;
}

/* Efectos Hover */
.minimal-btn:hover {
  color: #ffffff;
  border-bottom: 1px solid rgba(252, 228, 236, 0.4);
}

.minimal-btn:hover i {
  transform: scale(1.1);
}

.instagram:hover i { color: #e1306c; }
.whatsapp:hover i { color: #25d366; }

/* 3. CONTACTO Y MAPA */
.address {
  display: flex;
  gap: 10px;
  margin-bottom: 15px;
  line-height: 1.5;
}

.map-container {
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 15px rgba(0,0,0,0.2);
  border: 1px solid rgba(252, 228, 236, 0.1);
}

/* 4. PIE DE PÁGINA */
.footer-bottom {
  text-align: center;
  border-top: 1px solid rgba(252, 228, 236, 0.1);
  padding-top: 25px;
  font-size: 0.85rem;
  opacity: 0.6;
}

/* 5. RESPONSIVE */
@media (max-width: 768px) {
  .main-footer {
    padding: 40px 5% 20px;
    text-align: center;
  }
  
  .footer-content {
    justify-content: center;
  }

  .minimal-btn {
    margin: 0 auto;
  }

  .address {
    justify-content: center;
  }
}
</style>