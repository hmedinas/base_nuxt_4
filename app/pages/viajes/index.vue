<template>
    <div class="dark:text-dark-textSecondary">
        <BreadCrumbs />
        <Viajes :acceso="acceso" />
    </div>
</template>

<script setup lang="ts">
import BreadCrumbs from '~/components/common/BreadCrumbs.vue';
import Viajes from '@/components/viajes/views/index.vue';
import menu from '~/config/menu.json';

/* ========================================================================
                            1.- PROPIEDADES
===========================================================================*/
const route = useRoute();

const rolesPermitidos = computed(() => {
    return menu.menu.find((item) => item.to === route.path)?.role ?? [];
});

const accesoYResponsable = computed(() => useAccesoPantalla(rolesPermitidos.value));

const acceso = computed(() => accesoYResponsable.value.acceso);
</script>
