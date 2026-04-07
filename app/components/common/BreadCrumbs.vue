<template>
    <div class="breadcrumbs text-sm pl-2">
        <ul>
            <li>
                <NuxtLink to="/">
                    <font-awesome icon="home" class="w-3 h-3" />
                    &nbsp;Home
                </NuxtLink>
            </li>
            <li v-for="(crumb, index) in breadcrumbs" :key="index" class="breadcrumb-item">
                <NuxtLink v-if="index < breadcrumbs.length - 1" :to="crumb.path">{{ crumb.name }}</NuxtLink>
                <span v-else>{{ crumb.name }}</span>
            </li>
        </ul>
    </div>
</template>

<script setup lang="ts">
interface Crumb {
    name: string;
    path: string;
}

// Utilizamos `useRoute` para obtener la ruta actual y generar el breadcrumb
const route = useRoute();

const breadcrumbs = computed<Crumb[]>(() => {
    const pathArray = route.path.split('/').filter((p) => p);
    const crumbs: Crumb[] = [];

    pathArray.forEach((segment, index) => {
        // Formateamos el nombre del segmento, capitalizando la primera letra
        const label =
            segment === 'tecnicos'
                ? 'Técnicos'
                 : segment === 'guardias'
                ? 'Guardias24x7'
                : segment === 'guardiasOperadores'
                ? 'Guardias operadores'
                : segment === 'viajesEventos'
                ? 'Viajes y eventos'
                : segment === 'vistaPersonal'
                ? 'Vista Personal'

                : segment.charAt(0).toUpperCase() + segment.slice(1);

        crumbs.push({
            name: label,
            // Creamos el enlace acumulando los segmentos
            path: '/' + pathArray.slice(0, index + 1).join('/'),
        });
    });

    return crumbs;
});
</script>

<style scoped></style>
