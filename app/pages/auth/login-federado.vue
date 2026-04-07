<template>
    <div v-if="config.configuration.viewLogin == false" class="h-screen w-screen  flex flex-col justify-center text-center items-center">
      <FullScreeenLoader></FullScreeenLoader>
    </div>
    <div v-else class="flex items-center justify-center min-h-screen ">
        <div class="bg-white p-8 rounded-lg  max-w-sm text-center">
          
            <h1 class="text-3xl font-semibold  mb-6 text-gray-700">Login</h1>

            <div class="flex items-center justify-center mb-6">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-blue-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4" />
            </svg>
            <span class="text-xl font-semibold text-gray-800">Gratificaciones</span>
            </div>
            <button class="btn bg-primary  hover:bg-application-blue-100 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 w-full text-lg"
            @click="login">
                Click para Iniciar
            </button>

            <footer class="mt-6 text-sm text-gray-500">
            &copy; 2026 HMEDINAS. Todos los derechos reservados.
            </footer>
        </div>
    </div>


</template>
<script lang="ts" setup>
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

const login = async () => {
    try {
        
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
             // Si el usuario no está autenticado, se redirige al login federado
             if (!authStore.isAuthenticated) {
                await $oidcClient.signinRedirect();
            } else {
                router.push('/')
            }
        }
    } catch (error) {
    logger.error('Error during login:', error)
    }
}


const checkAuthentication = async () => {
  try {
    if (config.configuration.useMock) {
      // Simulación de autenticación en modo mock
      if (authStore.isAuthenticated) {
        router.push('/home');
      } else {
        authStore.login(mock.accessToken);
        router.push('/hone');
      }
    } else {
      // Si el usuario no está autenticado, se redirige al login federado
      if (!authStore.isAuthenticated) {
        await $oidcClient.signinRedirect();
      }
    }
  } catch (error) {
    logger.error('Error during authentication:', error);
  }
};
/*
onMounted(async () => {
    authStore.logout();  // Limpiar cualquier sesión existente
    checkAuthentication();  // Verificar autenticación
});
*/

</script>
