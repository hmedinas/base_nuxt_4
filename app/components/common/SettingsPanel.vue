<template>
    <div class="dark:text-black">
        <!-- Overlay para difuminar el fondo -->
        <div
            v-if="isOpen"
            class="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm transition-opacity duration-300 z-20"
            @click="closePanel"
        ></div>

        <!-- Panel lateral -->
        <div
            :class="[
                'fixed top-0 right-0 h-screen bg-white shadow-lg transition-transform duration-300  z-20',
                isOpen ? 'translate-x-0' : 'translate-x-full',
            ]"
            style="width: 300px"
        >
            <div class="flex justify-between items-center p-4 border-b">
                <h2 class="text-xl font-bold">Configuración</h2>
                <!-- Botón de cerrar el panel -->
                <button @click="closePanel" class="text-gray-600 hover:text-gray-800">
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                    </svg>
                </button>
            </div>

            <div class="p-4 space-y-4">
                <!-- Sección Primary -->
                <div>
                    <h3 class="text-lg font-semibold">Color Primario</h3>
                    <div class="grid grid-cols-7 gap-2 mt-4">
                        <div
                            v-for="(color, index) in primaryColors"
                            :key="'primary-' + index"
                            :class="[
                                color,
                                'w-6 h-6 rounded-full cursor-pointer',
                                color === settingApp.primaryColor ? ' border-4 border-primary-yellow-500' : '',
                            ]"
                            @click="setPrimaryColor(color)"
                        ></div>
                    </div>
                </div>
                <!-- primary text Primary -->
                <div v-show="false">
                    <h3 class="text-lg font-semibold">Primary</h3>
                    <div class="grid grid-cols-7 gap-2 mt-4">
                        <div
                            v-for="(color, index) in primaryColorsText"
                            :key="'primary-' + index"
                            :class="[color, 'w-6 h-6 rounded-full cursor-pointer']"
                        ></div>
                    </div>
                </div>
                <!-- Sección Primary -->
                <div>
                    <h3 class="text-lg font-semibold">Color Fondo</h3>
                    <div class="grid grid-cols-7 gap-2 mt-4">
                        <div
                            v-for="(color, index) in fondoColor"
                            :key="'primary-' + index"
                            :class="[
                                color,
                                'w-6 h-6 rounded-full cursor-pointer',
                                color === settingApp.fondoClass ? ' border-4 border-alternative-red-100' : '',
                            ]"
                            @click="setFondoColor(color)"
                        ></div>
                    </div>
                </div>
                <!-- Sección Surface -->
                <div>
                    <h3 class="text-lg font-semibold">Menu Color</h3>
                    <div class="grid grid-cols-7 gap-2 mt-4">
                        <div
                            v-for="(color, index) in surfaceColors"
                            :key="'surface-' + index"
                            :class="[
                                color,
                                'w-6 h-6 rounded-full cursor-pointer',
                                color === settingApp.menuClass ? ' border-4 border-alternative-red-100' : '',
                            ]"
                            @click="setMenuColor(color)"
                        ></div>
                    </div>
                </div>

                <!-- Sección Color theme (modo oscuro/claro) -->
                <div>
                    <h3 class="text-lg font-semibold">Modo Oscuro</h3>
                    <label class="swap swap-rotate">
                        <!-- this hidden checkbox controls the state -->
                        <input type="checkbox" id="darkMode" v-model="isDarkMode" />

                        <!-- sun icon -->
                        <svg class="swap-on h-10 w-10 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                            <path
                                d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z"
                            />
                        </svg>

                        <!-- moon icon -->
                        <svg class="swap-off h-10 w-10 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                            <path
                                d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z"
                            />
                        </svg>
                    </label>
                </div>

                <!-- Sección Menu Type -->
                <div>
                    <h3 class="text-lg font-semibold">Tipo Menu</h3>
                    <label class="flex cursor-pointer gap-2">
                        <span class="label-text">Vertical</span>
                        <input type="checkbox" class="toggle theme-controller" v-model="isHorizontal" @change="toggleIsHorizontal" />
                        <span class="label-text">Horizontal</span>
                    </label>

                    <div v-if="false" class="mt-2">
                        <label class="flex items-center space-x-2">
                            <input type="radio" name="menuType" value="vertical" v-model="selectedMenuType" @change="setMenuType('vertical')" />
                            <span>Vertical</span>
                        </label>
                        <label class="flex items-center space-x-2 mt-2">
                            <input type="radio" name="menuType" value="horizontal" v-model="selectedMenuType" @change="setMenuType('horizontal')" />
                            <span>Horizontal</span>
                        </label>
                    </div>
                </div>

                <!-- Sección Topbar Theme -->
                <div>
                    <h3 class="text-lg font-semibold">Topbar Theme</h3>

                    <div class="grid grid-cols-7 gap-2 mt-4">
                        <div
                            v-for="(colorClass, index) in topbarColorClasses"
                            :key="'topbar-' + index"
                            :class="[
                                colorClass,
                                'w-6 h-6 rounded-full cursor-pointer',
                                colorClass === settingApp.topbarClass ? ' border-4 border-alternative-red-100' : '',
                            ]"
                            @click="setTopbarColor(colorClass)"
                        ></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
interface Props {
    isOpen: boolean; // Controla si el panel está abierto o no
    closePanel: () => void; // Función para cerrar el panel,
}

const props = defineProps<Props>();
// store de los colores
const colorStore = useColorStore();
const settingApp = colorStore.settingApp;

const emit = defineEmits(['updateTopbarClass', 'updateMenuType', 'updateMenuClass', 'updateFondoClass']);

// Colores de ejemplo
const primaryColors = ref([
    'bg-alternative-red-100',
    'bg-alternative-red-200',
    'bg-alternative-purple-100',
    'bg-alternative-purple-200',
    'bg-alternative-purple-300',
    'bg-alternative-blue-100',
    'bg-alternative-blue-200',
    'bg-alternative-blue-300',
    'bg-alternative-green-100',
    'bg-alternative-green-200',
    'bg-alternative-green-300',
    'bg-alternative-yellow',
    'bg-alternative-orange-100',
    'bg-alternative-orange-200',
]);
const primaryColorsText = ref([
    'text-alternative-red-100',
    'text-alternative-red-200',
    'text-alternative-purple-100',
    'text-alternative-purple-200',
    'text-primary',
    'text-alternative-blue-100',
    'text-alternative-blue-200',
    'text-alternative-blue-300',
    'text-alternative-green-100',
    'text-alternative-green-200',
    'text-alternative-green-300',
    'text-alternative-yellow',
    'text-alternative-orange-100',
    'text-alternative-orange-200',
]);

const fondoColor = ref(['bg-fondo-100', 'bg-fondo-200', 'bg-fondo-300', 'bg-fondo-400', 'bg-fondo-500', 'bg-fondo-600', 'bg-fondo-700']);

const surfaceColors = ref(['bg-application-blue-100', 'bg-application-blue-500', 'bg-application-blue-600']);

// Estado para el tipo de menú seleccionado
const selectedMenuType = ref<'vertical' | 'horizontal'>('vertical');

// Clases de colores para el Topbar
const topbarColorClasses = ref(['bg-application-silver-800', 'bg-application-silver-300', 'bg-application-silver-100']);

// Modo oscuro/claro
// Computed para reflejar el estado real del modo oscuro
const isDarkMode = computed({
    get: () => settingApp.isDark,
    set: (value: boolean) => colorStore.setDarkMode(value),
});
const isHorizontal = ref(false);

// Escuchar cambios en el estado del modo oscuro
watch(isDarkMode, (newVal: boolean) => {
    if (newVal) {
        document.documentElement.classList.add('dark');
    } else {
        document.documentElement.classList.remove('dark');
    }
});

// Tipo de menú (vertical u horizontal)
const menuType = ref('vertical');

// Setters de color
const setPrimaryColor = (colorClass: string) => {
    logger.log('Color primario seleccionado:', colorClass);
    settingApp.primaryColor = colorClass;
    colorStore.setPrimaryColor(colorClass);
    // Aquí puedes aplicar el color a tu diseño
};

const setFondoColor = (colorClass: string) => {
    logger.log('Color de superficie seleccionado:', colorClass);
    settingApp.fondoClass = colorClass;
    emit('updateFondoClass', colorClass);
};

const setMenuColor = (colorClass: string) => {
    logger.log('Color de Menu seleccionado:', colorClass);
    settingApp.menuClass = colorClass;
    emit('updateMenuClass', colorClass);
};

const setTopbarColor = (colorClass: string) => {
    logger.log('Color del topbar seleccionado:', colorClass);
    settingApp.topbarClass = colorClass;
    // se emitira un evento hasta el navBar
    emit('updateTopbarClass', colorClass); // Emitir el evento con la clase seleccionada
};
const setMenuType = (type: string) => {
    emit('updateMenuType', type); // Emitir el evento para cambiar el tipo de menú
};

const toggleIsHorizontal = () => {
    settingApp.isMenuHorizontal = isHorizontal.value;
    if (isHorizontal.value) {
        emit('updateMenuType', 'horizontal');
    } else {
        emit('updateMenuType', 'vertical');
    }
};
</script>

<style scoped>
/* Estilos personalizados aquí */
</style>
