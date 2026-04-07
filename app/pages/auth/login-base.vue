<template>
  <div class="min-h-screen flex items-center justify-center bg-slate-100 px-4 font-sans">
    <div class="max-w-md w-full bg-white p-10 rounded-3xl shadow-2xl">
      
      <div class="flex flex-col items-center mb-8">
        <div class="w-20 h-20  rounded-full flex items-center justify-center shadow-lg">
        
          <img src="/assets/img/icon_app.png" alt="Logo" class="w-20 h-20">
        </div>
        <h1 class="text-3xl font-black text-slate-800 mt-6">Nuxt 4</h1>
        <p class="text-slate-400 font-medium">Proyecto base</p>
      </div>

      <div class="space-y-4">
        <div>
          <label class="text-sm font-bold text-slate-700 ml-1">Usuario</label>
          <input 
            v-model="userField"
            type="text" 
            placeholder="Introduce tu Nombre de Usuario"
            class="w-full mt-1 px-5 py-3 bg-slate-50 border-2 border-transparent rounded-xl focus:border-primary-blue-500 focus:bg-white outline-none transition-all"
          />
        </div>

        <div>
          <label class="text-sm font-bold text-slate-700 ml-1">Contraseña</label>
          <input 
            v-model="passField"
            type="password" 
            placeholder="••••••••"
            class="w-full mt-1 px-5 py-3 bg-slate-50 border-2 border-transparent rounded-xl focus:border-primary-blue-500 focus:bg-white outline-none transition-all"
          />
        </div>
        
        <button 
          @click="login" 
          :disabled="isProcessing"
          class="w-full mt-6 py-4 bg-primary hover:bg-primary-blue-700 text-white font-black rounded-xl shadow-blue-200 shadow-lg active:scale-95 transition-all flex justify-center items-center gap-3"
        >
          <i v-if="isProcessing" class="pi pi-spin pi-spinner text-xl"></i>
          <span>{{ isProcessing ? 'AUTENTICANDO...' : 'INICIAR SESIÓN' }}</span>
        </button>
      </div>

      <transition name="fade">
        <div v-if="errorMessage" class="mt-6 p-4 bg-red-50 border-l-4 border-red-500 text-red-700 text-sm font-bold rounded-r-lg">
          <i class="pi pi-exclamation-circle mr-2"></i>
          {{ errorMessage }}
        </div>
      </transition>

    </div>
  </div>
</template>

<script setup lang="ts">
import FullScreeenLoader from '~/components/common/FullScreeenLoader.vue'
import { useLocalStorage } from "@vueuse/core";

definePageMeta({
    layout: 'session'
})

const { $oidcClient } = useNuxtApp()

const config = await import('@/config/config.json')
const mock = await import('@/mock/auth.mock.json')
const router = useRouter()
const authStore = useAuthStore();
const token = useLocalStorage('token','');


// Estados reactivos simples
const userField = ref('');
const passField = ref('');
const isProcessing = ref(false);
const errorMessage = ref('');


const login = async () => {
  // 1. Validaciones básicas antes de intentar nada
  if (!userField.value || !passField.value) {
    errorMessage.value = "Por favor, completa todos los campos.";
    return;
  }

  isProcessing.value = true;
  errorMessage.value = "";

  try {
    // Simulación de llamada a API (Axios / Fetch)
    await new Promise(resolve => setTimeout(resolve, 1200));

    // sin importar setemoas los valores si esta dado de alto el mock
    if (config.configuration.useMock)
      {            
          if (authStore.isAuthenticated === true){
              router.push('/home')
          }
          else
          {
              authStore.login(mock.accessToken);     
              router.push('/home')
          }
      }
      else
      {
        // Lógica de validación (Ejemplo manual o MOCK)
        if (userField.value === 'admin' && passField.value === '1234') {
          
          // Guardamos el token en el store
          authStore.login('token_generado_exitosamente');
          
          // Redirigimos al Home
          router.push('/home')
          
        } else {
          errorMessage.value = "Usuario o contraseña no válidos.";
        }
      }
  } catch (err) {
    logger.error('Error during login:', err)
    errorMessage.value = "Error crítico en el servidor de autenticación.";
  } finally {
    isProcessing.value = false;
  }
}

// Opcional: Si quieres que "Enter" también funcione sin usar <form>
onMounted(() => {
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && !isProcessing.value) {
      login();
    }
  });
});

</script>

<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
</style>