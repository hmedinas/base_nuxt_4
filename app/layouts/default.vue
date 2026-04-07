<template>
    <section :class="[fondoClass, 'flex h-screen w-full ', 'dark:bg-dark-fondo dark:text-dark-text']">
        <!-- Botón para alternar el menú horizontal/vertical -->
        <button v-show="false" @click="toggleMenuType">Is Horizontal</button>
        <SessionTimer />
        <!-- toats -->
        <MenuNavigation
            v-if="!isMenuHorizontal"
            :isCollapsed="isResponsive ? true : isMenuCollapsed"
            :isHorizontal="isMenuHorizontal"
            :menuClass="menuClass"
            :isFloatMenu="isFloatMenu"
            :isOpen="isMenuCollapsed"
            :closePanel="closeMenu"
        />

        <div class="flex flex-col flex-1 transition-all duration-300 w-full h-screen overflow-hidden">
            <NavBar :toggleMenu="toggleMenu" :topbarClass="topbarClass" :isHorizontal="isMenuHorizontal" />

            <!-- Solo para el menu en la parte superior -->
            <MenuNavigation
                v-if="isMenuHorizontal"
                :isCollapsed="false"
                :isHorizontal="isMenuHorizontal"
                :menuClass="menuClass"
                :isFloatMenu="false"
                :isOpen="false"
                :closePanel="closeMenu"
            />

            <div class="flex-1 p-1 md:p-1 lg:p-1 lg:pl-4 overflow-y-auto">
                <NuxtPage />
            </div>

            <!-- Componente del botón flotante -->
            <FloatingButton v-if="toolsView" :togglePanel="toggleSettingsPanel" />
            <!-- Panel lateral de configuración -->
            <!-- Componente del panel lateral -->
            <SettingsPanel
                :isOpen="isSettingsPanelOpen"
                :closePanel="closeSettingsPanel"
                @updateTopbarClass="updateTopbarClass"
                @updateMenuType="updateMenuType"
                @updateMenuClass="updateMenuClass"
                @updateFondoClass="updateFondoClass"
            />
        </div>
    </section>
</template>

<script setup lang="ts">
import FloatingButton from '~/components/common/FloatingButton.vue';
import SettingsPanel from '~/components/common/SettingsPanel.vue';
import NavBar from '~/components/common/NavBar.vue';
import MenuNavigation from '~/components/common/MenuNavigation.vue';
import type { Device } from '~/types/device.interface';
import type { SettingApp } from '~/types/settingApp.interface';
import { usePrimeVue } from 'primevue/config';
import SessionTimer from '~/components/common/SessionTimer.vue';

const nuxtApp = useNuxtApp();
const device = nuxtApp.$device as Device;
const colorStore = useColorStore();

// Cargar configuración directamente (SPA - no hay SSR)
const mock = await import('@/mock/auth.mock.json');
const config = await import('@/config/config.json');

// Funcion para primevue en español
const primevue = usePrimeVue();
const toolsView = ref<boolean>(true);

primevue.config.locale = {
    firstDayOfWeek: 1, // Lunes como primer día
    dayNames: ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado'],
    dayNamesShort: ['dom', 'lun', 'mar', 'mié', 'jue', 'vie', 'sáb'],
    dayNamesMin: ['D', 'L', 'M', 'X', 'J', 'V', 'S'],
    monthNames: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
    monthNamesShort: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
    today: 'Hoy',
    clear: 'Limpiar',
    fileSizeTypes: ['bytes', 'kb', 'mb', 'gb', 'tb'],
};

// Función para alternar entre horizontal y vertical
const toggleMenuType = () => {
    isMenuHorizontal.value = !isMenuHorizontal.value; // Cambiar el estado del menú
};
// Estado para controlar si el menú está colapsado o no
const isMenuCollapsed = ref(false);
// Estado para controlar si el panel de configuración está abierto o no
const isSettingsPanelOpen = ref(false);
// const topbarClass = ref('bg-color-pgp-silver-300'); // Clase inicial del topbar
const menuClass = ref('bg-application-blue-600');
const topbarClass = ref('bg-application-silver-100');
const isMenuHorizontal = ref(false); // Estado para el tipo de menú
const fondoClass = ref('bg-fondo-100');

// funciones para detectar la resolucion
const screenWidth = ref(window.innerWidth);
const isResponsive = ref(screenWidth.value <= 768);
const isFloatMenu = ref(false);

// Función para manejar el cambio de tamaño de pantalla
const updateScreenSize = () => {
    if (device.isMobile === true) {
        isFloatMenu.value = true;
    } else {
        screenWidth.value = window.innerWidth;

        // si esta vertial u horizontal tableta
        if (device.isTablet === true) {
            isResponsive.value = screenWidth.value <= 1024; // Modo responsive activado para pantallas pequeñas
        }
        if (device.isIpad === true) {
            isResponsive.value = screenWidth.value <= 1024; // Modo responsive activado para pantallas pequeñas
        }
    }
};

onMounted(async () => {
    // agregamos el id del usuarioa pinia
    const authStore = useAuthStore();

    const userName = authStore.user?.userName;
    const idUser = authStore.user?.idUser;

    /*
    if (userName) {
        const newIdUser = await GetIdUserTecnico(idUser, userName);

        if (newIdUser != 0) {
            authStore.completeIdUserTecnico(newIdUser);
        }
    }
        */
    //let newIdUser = await service.GetIdUserTecnico(authStore.user?.userName);
    // authStore.completeIsUserTecnico(newIdUser);

    let settingAppTemp: SettingApp;
    toolsView.value = config.configuration.toolsView;

    if (config.configuration.useMock) {
        settingAppTemp = mock.settingApp.configScreem;
    } else {
        // consultamos si el usaurio tiene algo guradado del color

        // sino tiene obtenermos los colores por defecto de la app
        colorStore.setDefaultColor();
        settingAppTemp = colorStore.settingApp;
    }

    isMenuCollapsed.value = settingAppTemp.isMenuCollapsed;
    isMenuHorizontal.value = settingAppTemp.isMenuHorizontal;
    menuClass.value = settingAppTemp.menuClass;
    topbarClass.value = settingAppTemp.topbarClass;
    fondoClass.value = settingAppTemp.fondoClass;
/* integro 
    if (settingAppTemp.isDark) {
        document.documentElement.classList.add('dark');
    } else {
        document.documentElement.classList.remove('dark');
    }*/

    // Agregar el event listener para el cambio de tamaño
    window.addEventListener('resize', updateScreenSize);
    updateScreenSize(); // Ejecutarlo inicialmente para establecer el valor actual

    await SincronizarFestivos();

    if (colorStore.settingApp.isDark === false) {
      // Solo aplicamos si no hay preferencia guardada
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
      colorStore.setDarkMode(prefersDark)
    }

    // Escucha cambios en tiempo real
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
      colorStore.setDarkMode(e.matches)
    })
});

onUnmounted(() => {
    // Eliminar el listener para evitar fugas de memoria
    window.removeEventListener('resize', updateScreenSize);
});

// Aplicar clase dark en <html>
watch(
    () => colorStore.settingApp.isDark,
    (isDark) => {
        if (isDark) {
            document.documentElement.classList.add('dark')
        } else {
            document.documentElement.classList.remove('dark')
        }
    },
    { immediate: true }
)



// Función para colapsar o expandir el menú
const toggleMenu = () => {
    isMenuCollapsed.value = !isMenuCollapsed.value;
};
const closeMenu = () => {
    isMenuCollapsed.value = !isMenuCollapsed.value;
};

// Función para mostrar/ocultar el panel de configuración
const toggleSettingsPanel = () => {
    isSettingsPanelOpen.value = !isSettingsPanelOpen.value;
};
// Función para cerrar el panel de configuración
const closeSettingsPanel = () => {
    isSettingsPanelOpen.value = false;
};

const updateMenuClass = (colorClass: string) => {
    menuClass.value = colorClass; // Actualizar la clase del topbar
};

const updateTopbarClass = (colorClass: string) => {
    topbarClass.value = colorClass; // Actualizar la clase del topbar
};

const updateMenuType = (type: 'horizontal' | 'vertical') => {
    isMenuHorizontal.value = type === 'horizontal'; // Cambiar el estado del menú
};

const updateFondoClass = (colorClass: string) => {
    fondoClass.value = colorClass; // Actualizar la clase del fondo
};

//festivos
const SincronizarFestivos = async () => {
    try {
        const anio = new Date().getFullYear();
      
        logger.log('Festivos sincronizadoss:');
    } catch (error) {
        logger.error('Error al sincronizar festivos:', error);
    }
};
</script>
<style scoped>
/* Estilos para el layout */
</style>
