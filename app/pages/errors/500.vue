<template>   
   <div class="flex items-center justify-center min-h-screen ">
        <div class="mx-auto max-w-screen-sm text-center">
            <h1 class="mb-4 text-7xl tracking-tight font-extrabold lg:text-9xl text-primary-600 dark:text-primary-500">500</h1>
            <p class="mb-4 text-3xl tracking-tight font-bold text-gray-900 md:text-4xl dark:text-white">Ha ocurrido un error inesperado.</p>
            <p class="mb-4 text-lg font-light text-gray-500 dark:text-gray-400">Póngase en contacto con el CAU si el error persiste. </p>
            <div class="mt-10 flex items-center justify-center gap-x-6">
                <button   @click="goToHome"
                class="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                Volver a la aplicación
                </button>            
            </div>
            <button
                    v-if="viewError"
                    @click="toggleErrorDetails"
                    class="mt-6 text-sm font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none dark:text-indigo-400"
                >
                    {{ showErrorDetails ? 'Ocultar detalles del error' : 'Mostrar detalles del error' }}
                </button>

                <div 
                    v-if="viewError && showErrorDetails" 
                    class="mt-4 p-4 bg-gray-100 dark:bg-gray-700 rounded-lg text-left text-sm text-gray-800 dark:text-gray-200"
                >
                    <h3 class="font-semibold mb-2">Detalles del error:</h3>
                    <pre class="overflow-auto max-h-60 p-2 bg-white dark:bg-gray-800 rounded">{{ errorDetails }}</pre>
                </div>
        </div>   
      
    </div>
</template>
<script setup lang="ts">
definePageMeta({
  layout: 'blank'
})

const goToHome = () => {
    clearError({ redirect: '/login' })
}
useHead({
  title: 'Página no encontrada'
})

const viewError = ref<boolean>(false);
const errorDetails = ref<string>(''); // Almacena los detalles del error
const authStore = useAuthStore();
const showErrorDetails = ref<boolean>(false); // Controla si se muestran los detalles del error

onMounted(async () => {
  
    const existeError = authStore.getError;
    if (existeError !== null) {
        viewError.value = true;
        errorDetails.value = JSON.stringify(existeError, null, 2);
    }
});

// Función para alternar la visibilidad de los detalles del error
const toggleErrorDetails = () => {
    showErrorDetails.value = !showErrorDetails.value;
};
</script>

<style scoped>
/* Estilos personalizados si son necesarios */
pre {
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
  line-height: 1.5;
}
</style>