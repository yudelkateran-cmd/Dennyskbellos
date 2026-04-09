<template>
  <header class="main-header">
    <div class="logo">DennysKbellos</div>

    <div class="logo-container">
      <router-link to="/">
        <img src="@/assets/logo.jpeg" alt="Logo DennysKbellos" class="logo-img">
      </router-link>
    </div>

    <nav class="nav-menu">
      <router-link to="/" class="nav-link">Inicio</router-link>
      <router-link to="/servicios" class="nav-link">Servicios</router-link>
      <router-link to="/login" class="nav-link">Entrar</router-link>
      <router-link to="/registro" class="btn-glitter">Registrarse</router-link>
    </nav>
  </header>
</template>

<style scoped>
.main-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 5%;
  background: white;
  border-bottom: 1px solid #fce4ec;
}

.logo {
  font-family: 'Playfair Display', serif;
  font-size: 1.8rem;
  color: #4e342e;
  font-weight: bold;
}

.btn-login {
  color: #4e342e !important;
  /* Café premium */
  font-weight: 600;
  padding: 8px 15px;
  border-radius: 20px;
  transition: all 0.3s ease;
}

.btn-login:hover {
  background-color: #fce4ec;
  /* Un fondo rosado muy suave al pasar el mouse */
  color: #ff80ab !important;
  /* Cambia el texto a rosado */
}

.logo-container {
  display: flex;
  align-items: center;
}

.logo-img {
  height: 60px;
  width: auto;
  object-fit: contain;
  transition: transform 0.3s ease;
}

/* AQUÍ ESTÁ EL CAMBIO CLAVE */
.nav-menu {
  display: flex;
  /* Alinea todo en fila */
  align-items: center;
  /* Centra verticalmente el texto con el botón */
  gap: 20px;
  /* Espacio uniforme entre cada elemento */
}

.nav-link {
  text-decoration: none;
  color: #4e342e !important; /* Café premium */
  font-weight: 600;
  padding: 8px 15px;
  border-radius: 20px;
  transition: all 0.3s ease;
}

/** .nav-menu a {
  text-decoration: none;
  color: #4e342e;
  font-weight: 500;
  transition: color 0.3s;
}*/

.nav-menu a:hover {
  color: #ff80ab;
  /* Un toque de color al pasar el mouse */
}
.nav-link:hover {
  background-color: #fce4ec; /* Fondo rosado suave */
  color: #ff80ab !important;  /* Texto rosado */
}

.btn-glitter {
  background: linear-gradient(45deg, #ff80ab, #f48fb1, #fce4ec);
  color: white !important;
  padding: 8px 25px;
  border-radius: 50px;
  text-decoration: none;
  box-shadow: 0 4px 10px rgba(255, 128, 171, 0.3);
  transition: transform 0.3s ease;
}
.btn-glitter:hover {
  transform: scale(1.05);
}
</style>