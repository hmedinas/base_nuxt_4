<template>
    <!-- Botón flotante para configuración -->
    <button
        :class="[
            color.buttonClassPrimary,
            'fixed right-0 top-1/2 transform -translate-y-1/2 hover:bg-application-blue-100  p-2 pt-3 rounded-l-lg shadow-lg z-10',
        ]"
        @click="togglePanel"
    >
        <!-- Icono de engranaje -->
        <font-awesome icon="cog" class="'w-6 h-6" />
    </button>
</template>

<script setup lang="ts">
const props = defineProps<{
    togglePanel: () => void; // Recibe la función para abrir/cerrar el panel
}>();

const color = useColorStore().colorApplication;
</script>
