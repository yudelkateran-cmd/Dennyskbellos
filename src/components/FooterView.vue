<template>
  <footer class="main-footer">
    <div class="footer-content">
      <div class="footer-section brand-section">
        <h4>DennysKbellos</h4>
        <p class="slogan">Expertos en Colorimetría y Estilo.</p>
        
        <a href="https://www.instagram.com/dennys_kbellos" target="_blank" class="instagram-card">
          <div class="insta-header">
            <div class="insta-logo-placeholder">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M7.8 2h8.4C19.4 2 22 4.6 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8C4.6 22 2 19.4 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2zm-.2 2A3.6 3.6 0 0 0 4 7.6v8.8a3.6 3.6 0 0 0 3.6 3.6h8.8a3.6 3.6 0 0 0 3.6-3.6V7.6A3.6 3.6 0 0 0 16.4 4H7.6zm8.4 2.8a1.2 1.2 0 1 1 0 2.4 1.2 1.2 0 0 1 0-2.4zM12 7.2a4.8 4.8 0 1 1 0 9.6 4.8 4.8 0 0 1 0-9.6zm0 2a2.8 2.8 0 1 0 0 5.6 2.8 2.8 0 0 0 0-5.6z"></path>
              </svg>
            </div>
            <div class="insta-info">
              <span class="insta-handle">@dennyskbellos</span>
              <span class="insta-action">Ver Portafolio</span>
            </div>
          </div>
          <div class="insta-grid-placeholder">
            <div class="insta-box"></div>
            <div class="insta-box"></div>
            <div class="insta-box"></div>
            <div class="insta-box"></div>
          </div>
        </a>
      </div>

      <div class="footer-section contact-section">
        <h4>Contacto</h4>
        <p class="address">
          <span>📍</span> 
          <span class="address-text">JJ. La Torre 461, Puertas del Mar, La Serena, Chile</span>
        </p>
        
        <a href="https://wa.me/56956919142?text=Hola!%20Me%20gustaría%20agendar%20una%20cita%20en%20DennysKbellos" 
           target="_blank" 
           class="whatsapp-link">
           <span class="wa-icon">📱</span> 
           <span class="wa-number">+56 9 5691 9142</span>
        </a>
      </div>
    </div>
    
    <div class="footer-bottom">
      &copy; 2026 Diseñado por Inv. JRT SPA - DennysKbellos
    </div>
  </footer>
</template>

<style scoped>
/* Colores de la marca */
:root {
  --color-cafe: #4e342e;
  --color-rosado-palido: #fce4ec;
  --color-rosado-hover: #ffffff;
  --color-negro-insta: #262626;
  --color-gris-insta: #8e8e8e;
}

.main-footer {
  background-color: #4e342e;
  color: #fce4ec;
  padding: 50px 8% 30px;
  margin-top: 50px;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; /* Un poco de estilo de fuente */
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
  letter-spacing: 1px;
}

.slogan, .address {
  margin-bottom: 15px;
  font-weight: 300;
}

.address {
  display: flex;
  align-items: flex-start;
  gap: 10px;
}

.address-text {
  flex: 1;
}

/* === ESTILOS TARJETA DE INSTAGRAM === */
.instagram-card {
  display: block;
  background-color: white; /* Color base de la tarjeta */
  border-radius: 12px;
  padding: 15px;
  text-decoration: none;
  color: #262626; /* Color de texto interno */
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  overflow: hidden;
  max-width: 320px; /* Tamaño controlado */
  margin-top: 10px;
}

.instagram-card:hover {
  transform: translateY(-5px); /* Pequeño salto al pasar el mouse */
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3);
}

.insta-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 12px;
}

.insta-logo-placeholder {
  width: 40px;
  height: 40px;
  background: linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  padding: 6px;
}

.insta-logo-placeholder svg {
  width: 100%;
  height: 100%;
}

.insta-info {
  display: flex;
  flex-direction: column;
}

.insta-handle {
  font-weight: 600;
  font-size: 1.1rem;
}

.insta-action {
  font-size: 0.8rem;
  color: #8e8e8e;
}

.insta-grid-placeholder {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 4px;
}

.insta-box {
  background-color: #efefef;
  aspect-ratio: 1 / 1;
  border-radius: 4px;
}

/* === ESTILOS WHATSAPP === */
.whatsapp-link {
  display: flex;
  align-items: center;
  gap: 12px;
  color: #fce4ec;
  text-decoration: none;
  font-size: 1.1rem;
  margin-top: 20px;
  padding: 10px 15px;
  border: 1px solid rgba(252, 228, 236, 0.2);
  border-radius: 8px;
  transition: background-color 0.3s ease, color 0.3s ease;
}

.whatsapp-link:hover {
  background-color: rgba(252, 228, 236, 0.05);
  color: #ffffff;
}

.wa-icon { font-size: 1.2rem; }
.wa-number { font-weight: 500; }

/* === PIE DE PÁGINA === */
.footer-bottom {
  text-align: center;
  border-top: 1px solid rgba(252, 228, 236, 0.2);
  padding-top: 30px;
  font-size: 0.85rem;
  font-weight: 300;
}
</style>