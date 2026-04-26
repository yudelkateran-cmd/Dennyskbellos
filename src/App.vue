<template>
  <div id="app">
    <HeaderView :usuario="usuarioActivo" />

    <main class="main-content">
      <router-view :key="$route.fullPath" />
    </main>

    <FooterView />
  </div>
</template>

<script setup>
import { computed, onMounted } from 'vue';
import { useStore } from 'vuex'; // Importamos el Store
import { auth } from './firebase';
import { onAuthStateChanged } from 'firebase/auth';
import HeaderView from '@/components/HeaderView.vue';
import FooterView from '@/components/FooterView.vue';

const store = useStore();

// Obtenemos el usuario directamente desde el Store (estado reactivo)
const usuarioActivo = computed(() => store.state.user);

onMounted(() => {
  // Vigilante de Firebase: se activa al entrar, salir o refrescar la página
  onAuthStateChanged(auth, (user) => {
    if (user) {
      // Guardamos los datos importantes en el Store usando la acción que creamos
      store.dispatch('updateUser', {
        uid: user.uid,
        email: user.email,
        nombre: user.displayName || 'Usuario',
        foto: user.photoURL
      });
      console.log("Usuario detectado:", user.email);
    } else {
      // Si no hay usuario, limpiamos el Store
      store.dispatch('updateUser', null);
      console.log("No hay sesión activa");
    }
  });
});
</script>
<style>
html,
body {
  scroll-behavior: auto !important;
  height: auto !important;
  overflow-x: hidden;
}
</style>
