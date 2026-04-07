<template>
    <div class="flex items-center justify-center min-h-screen">
        <div class="mx-auto max-w-screen-sm text-center">
            <h1 class="mb-4 text-7xl tracking-tight font-extrabold lg:text-9xl text-primary-600 dark:text-primary-500">403</h1>
            <p class="mb-4 text-3xl tracking-tight font-bold text-gray-900 md:text-4xl dark:text-white">
                No tiene permiso para acceder a esta página de la aplicación.
            </p>
            <p class="mb-4 text-lg font-light text-gray-500 dark:text-gray-400">Póngase en contacto con el CAU para solicitar acceso.</p>
            <div class="mt-10 flex items-center justify-center gap-x-6">
                <button
                    @click="goToHome"
                    class="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                    Volver a Inicio
                </button>
            </div>
            <button
                v-if="viewError"
                @click="toggleErrorDetails"
                class="mt-4 text-sm font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none"
            >
                {{ showErrorDetails ? 'Ocultar detalles del error' : 'Mostrar detalles del error' }}
            </button>

            <!-- Detalles del error (colapsable) -->
            <div v-if="viewError && showErrorDetails" class="mt-6 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg text-left">
                <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Detalles del error:</h3>
                <pre class="mt-2 text-sm text-gray-600 dark:text-gray-400 whitespace-pre-wrap">{{ errorDetailts }}</pre>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import type { ErrorResponse } from '~/types/errorResponse.interface';

definePageMeta({
    layout: 'blank',
});

const goToHome = () => {
    authStore.cleanError();
    navigateTo('/home');
};
useHead({
    title: 'Página no encontrada',
});

const viewError = ref<boolean>(false);
const errorDetailts = ref<string>(''); // Almacena los detalles del error
const authStore = useAuthStore();
const showErrorDetails = ref<boolean>(false); // Controla si se muestran los detalles del error

onMounted(async () => {
   
    const existeError = authStore.getError;
    if (existeError !== null) {
        viewError.value = true;
        errorDetailts.value = JSON.stringify(existeError, null, 2);
    }
});

// Función para alternar la visibilidad de los detalles del error
const toggleErrorDetails = () => {
    showErrorDetails.value = !showErrorDetails.value;
};
</script>
