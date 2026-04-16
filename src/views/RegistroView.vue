<template>
  <div class="registro-wrapper">
    <button class="close-btn-global" @click="$router.push('/')">×</button>

    <div class="split-card">

      <div class="profile-side">
        <img src="@/assets/dennis.jpeg" alt="Dennys, dueña de DennysKbellos" class="dennys-photo" />
        <div class="profile-caption">
          <h3>"Te espero para resaltar tu belleza"</h3>
          <p>- Dennys -</p>
        </div>
      </div>

      <div class="form-side">
        <h2 class="form-title">Crear Cuenta</h2>
        <p class="form-subtitle">Únete a nuestra comunidad de belleza</p>

        <form @submit.prevent="handleRegistro">
          <div class="input-group">
            <label>Nombre Completo</label>
            <input type="text" v-model="usuario.nombre" placeholder="Tu nombre" required>
          </div>

          <div class="input-group">
            <label>Correo Electrónico</label>
            <input type="email" v-model="usuario.email" placeholder="ejemplo@correo.com" required>
          </div>

          <div class="input-group">
            <label>Contraseña</label>
            <input type="password" v-model="usuario.password" placeholder="********" required>
          </div>

          <button type="submit" class="btn-glitter-submit">Registrarme</button>
        </form>

        <p class="login-link">
          ¿Ya tienes cuenta? <router-link to="/login">Inicia sesión aquí</router-link>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex'; // Importamos el Store
import { auth } from '@/firebase.js'; // Importamos Firebase
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth"; // Métodos de Firebase

const router = useRouter();
const store = useStore();

const usuario = reactive({
  nombre: '',
  email: '',
  password: ''
});

const handleRegistro = async () => {
  try {
    // 1. Crear usuario en Firebase (Reemplaza a MockAPI)
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      usuario.email,
      usuario.password
    );

    // 2. Guardar el nombre en el perfil de Firebase
    await updateProfile(userCredential.user, {
      displayName: usuario.nombre
    });

    // 3. Avisar al Store de la nueva sesión
    store.dispatch('updateUser', {
      uid: userCredential.user.uid,
      email: userCredential.user.email,
      nombre: usuario.nombre
    });

    alert(`¡Bienvenida ${usuario.nombre}!`);
    router.push('/agendar-cita');
  } catch (error) {
    console.error("Error en Registro:", error.code);
    // Errores comunes: email-already-in-use o weak-password
    alert("Error: " + error.message);
  }
};
</script>

<style scoped>
/* Contenedor principal para fondo y centrado */
.registro-wrapper {
  min-height: 90vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #fffafb;
  /* Fondo suave rosado */
  position: relative;
  /* Para el botón de cerrar global */
  padding: 40px 20px;
}

/* El card dividido en dos */
.split-card {
  display: flex;
  background: white;
  border-radius: 20px;
  box-shadow: 0 15px 35px rgba(78, 52, 46, 0.08);
  width: 100%;
  max-width: 900px;
  /* Un poco más ancho para las dos columnas */
  overflow: hidden;
  /* Para que la foto respete las esquinas redondeadas */
}

/* COLUMNA IZQUIERDA: Foto */
.profile-side {
  flex: 1;
  /* Ocupa el 50% */
  position: relative;
  background-color: #4e342e;
  /* Color café base por si no carga la foto */
}

.dennys-photo {
  width: 100%;
  height: 100%;
  object-fit: cover;
  /* Importante para que no se deforme */
  display: block;
}

.profile-caption {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 30px;
  background: linear-gradient(to top, rgba(78, 52, 46, 0.9), transparent);
  color: white;
  text-align: center;
}

.profile-caption h3 {
  font-family: 'Playfair Display', serif;
  font-style: italic;
  font-weight: 400;
  font-size: 1.3rem;
  margin-bottom: 5px;
}

.profile-caption p {
  font-size: 0.9rem;
  opacity: 0.8;
  letter-spacing: 1px;
}

/* COLUMNA DERECHA: Formulario */
.form-side {
  flex: 1;
  /* Ocupa el otro 50% */
  padding: 50px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

/* Tus estilos de formulario anteriores adaptados */
.form-title {
  color: #4e342e;
  font-family: 'Playfair Display', serif;
  margin-bottom: 10px;
  font-size: 1.8rem;
}

.form-subtitle {
  color: #6d4c41;
  margin-bottom: 30px;
  font-size: 0.95rem;
}

form {
  width: 100%;
  max-width: 320px;
}

.input-group {
  text-align: left;
  margin-bottom: 20px;
}

.input-group label {
  display: block;
  font-size: 0.85rem;
  color: #4e342e;
  margin-bottom: 5px;
  font-weight: 500;
}

.input-group input {
  width: 100%;
  padding: 12px;
  border: 1px solid #fce4ec;
  border-radius: 10px;
  outline: none;
  transition: all 0.3s;
}

.input-group input:focus {
  border-color: #ff80ab;
  box-shadow: 0 0 5px rgba(255, 128, 171, 0.2);
}

.btn-glitter-submit {
  width: 100%;
  padding: 12px;
  margin-top: 10px;
  border: none;
  border-radius: 50px;
  background: linear-gradient(45deg, #ff80ab, #f48fb1, #fce4ec);
  color: white;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  box-shadow: 0 4px 10px rgba(255, 128, 171, 0.3);
  transition: transform 0.2s, box-shadow 0.2s;
}

.btn-glitter-submit:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 15px rgba(255, 128, 171, 0.4);
}

.login-link {
  margin-top: 25px;
  font-size: 0.85rem;
  color: #6d4c41;
}

.login-link a {
  color: #ff80ab;
  text-decoration: none;
  font-weight: bold;
}

/* El botón de cerrar (ahora es global) */
.close-btn-global {
  position: absolute;
  top: 20px;
  right: 20px;
  background: rgba(78, 52, 46, 0.6);
  color: white;
  border: none;
  border-radius: 50%;
  width: 36px;
  height: 36px;
  font-size: 1.4rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.3s;
  z-index: 10;
}

.close-btn-global:hover {
  background: #4e342e;
}

/* Responsive para celulares */
@media (max-width: 768px) {
  .split-card {
    flex-direction: column;
    /* Una columna en móvil */
  }

  .profile-side {
    height: 250px;
    /* Foto más baja arriba */
  }

  .form-side {
    padding: 30px;
  }
}
</style>