<template>
    <div>
        <!-- Menu vertical-->
        <!-- Overlay para difuminar el fondo -->
        <div
            v-if="isFloatMenu && isOpen"
            class="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm transition-opacity duration-300 z-20"
            @click="closePanel"
        ></div>

        <aside v-if="!isHorizontal">
            <!-- solo para mobiles -->
            <div
                v-if="isFloatMenu"
                :class="[
                    menuClass,
                    'top-0 left-0 fixed h-screen text-white  shadow-lg transition-transform duration-300 ease-in-out z-20',
                    isOpen ? 'translate-x-0 w-32' : '-translate-x-full w-32',
                ]"
            >
                <div class="flex flex-col space-y-2 p-1 pt-4 pb-0 items-center">
                    <!-- Logo del menú (opcional) -->
                    <div class="text-white items-center">
                        <img src="/assets/img/icon_app.png" alt="Logo" class="transition-all duration-300 w-20" />
                    </div>
                    <div class="w-full border-b border-gray-600 pt-2"></div>
                    <ul class="flex-1">
                        <li v-for="item in menuItems" :key="item.id">
                            <div
                                :class="[
                                    'flex items-center transition-all duration-300 hover:bg-application-blue-100 flex-col pl-0 pt-3',
                                    selectedItem === item.id ? 'border-r-4  border-application-yellow-500 bg-application-blue-300' : '',
                                ]"
                                @click="selectItem(item.id)"
                            >
                                <!-- Icono del menú -->
                                <font-awesome :icon="item.icon" class="w-5 h-5 md:w-5 md:h-5 lg:w-6 lg:h-6 xl:w-6 xl:h-6 2xl:w-6 2xl:h-6" />
                                <!-- Texto debajo del icono si el menú está colapsado -->
                                <span v-if="isCollapsed" class="text-base mt-1 text-center transition-opacity duration-300">
                                    {{ item.label }}
                                </span>
                                <!-- Texto al lado del icono si el menú no está colapsado -->
                                <span v-else class="ml-4 text-white text-center">
                                    {{ item.label }}
                                </span>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
            <!--Los demas dispositivos de tabletas y demas  -->
            <div
                v-else
                :class="[
                    menuClass,
                    'relative text-white h-screen transition-all duration-300 flex-shrink-0',
                    isCollapsed ? 'w-24' : 'w-64',
                    'dark:bg-dark-panel dark:text-dark-text',
                ]"
            >
                <div :class="['flex flex-col space-y-2 ', !isCollapsed ? 'p-1 pl-2 ' : 'p-1 pt-3 pb-0', 'justify-between']">
                    <!-- Logo del menú (opcional) -->
                    <div>
                        <div class="text-white">
                            <div v-if="isCollapsed">
                                <img width="" src="/assets/img/icon_app.png" alt="Logo" class="transition-all duration-300 pb-2" />
                            </div>
                            <div v-else>
                                <img src="/assets/img/logo_white.png" alt="Logo" class="transition-all duration-300 pb-2" width="180px" />
                            </div>
                        </div>
                        <div :class="['w-full border-b border-gray-600 ', !isCollapsed ? '' : 'pt-1']"></div>
                        <!-- Foto de usuario y descripción (solo visible cuando el menú está expandido) -->
                        <div v-if="!isCollapsed" class="text-white flex items-center transition-all duration-300 pt-2">
                            <!-- Imagen circular del usuario -->
                            <img :src="imageUser" alt="User Photo" class="w-16 h-16 rounded-full object-cover border-2 border-gray-300 mb-2" />

                            <!-- Descripción del usuario (visible solo cuando el menú está expandido) -->
                            <div class="ml-4">
                                <p class="font-semibold text-sm">{{ displayName }}</p>
                                <p class="text-xs text-gray-400">{{ departmentDesc }}</p>
                            </div>
                            <!-- Línea divisoria debajo de la información del usuario -->
                        </div>
                        <div v-if="!isCollapsed" class="w-full border-b border-gray-600 mb-4"></div>
                        <!--menu -->
                        <ul class="flex-1">
                            <li v-for="item in menuItems" :key="item.id">
                                <div
                                    :class="[
                                        'cursor-pointer flex items-center transition-all duration-300 hover:bg-application-blue-100',
                                        isCollapsed ? 'flex-col' : 'flex-row',
                                        isCollapsed ? 'pl-0 pt-3' : 'pl-3 pt-3  pb-3',
                                        isCollapsed ? '' : '',
                                        selectedItem === item.id ? 'border-r-4  border-application-yellow-500 bg-application-blue-300' : '',
                                    ]"
                                    @click="selectItem(item.id)"
                                >
                                    <!-- Icono del menú -->
                                    <font-awesome :icon="item.icon" class="w-4 h-4 md:w-5 md:h-5 lg:w-6 lg:h-6 xl:w-6 xl:h-6 2xl:w-6 2xl:h-6" />
                                    <!-- Texto debajo del icono si el menú está colapsado -->
                                    <span v-if="isCollapsed" class="text-xs mt-1 text-center transition-opacity duration-300">
                                        {{ item.label }}
                                    </span>
                                    <!-- Texto al lado del icono si el menú no está colapsado -->
                                    <span v-else class="ml-4 text-white text-center">
                                        {{ item.label }}
                                    </span>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>

                <!-- Div fijo en la parte inferior del menú lateral -->
                <div
                    :class="[
                        'absolute   bottom-0 left-0 transition-all duration-300 p-1 bg-application-footer block md:hidden lg:block xl:block 2xl:block',
                        isCollapsed ? 'w-24' : 'w-64',
                    ]"
                >
                    <div class="grid grid-cols-1">
                        <div>
                            <img v-if="!isCollapsed" src="/assets/img/logo-pre.png" alt="Logo" class="transition-all duration-300 pb-1" />
                            <img v-if="isCollapsed" src="/assets/img/logo-pre-min.png" alt="Logo" class="transition-all duration-300 pb-1" />
                        </div>

                        <div class="flex justify-end pt-1">
                              
                              <button
                                v-show="!isCollapsed"
                                :class="['text-application-yellow-500', 'p-0 pr-4 rounded-md', 'hover:text-application-blue-100', 'cursor-default']"
                               
                                class="tooltip tooltip-left"
                              :data-tip="`© v.${appVersion}`"
                            >
                                <font-awesome icon="tag" class="w-5 h-5" />
                            </button>
                            <!-- Contenido del div -->
                            <button
                                v-show="!isCollapsed"
                                :class="['text-application-yellow-500', 'p-0 pr-4 rounded-md', 'hover:text-application-blue-100']"
                                @click="toggleDarkMode"
                                class="tooltip tooltip-left"
                                :data-tip="isDarkMode ? 'Modo Claro' : 'Modo Oscuro'"
                            >
                                <font-awesome :icon="isDarkMode ? 'sun' : 'moon'" class="w-5 h-5" />
                            </button>

                            <button
                                :class="['text-application-yellow-500', 'p-0 pr-4 rounded-md', 'hover:text-application-blue-100']"
                                @click="logout"
                                @mouseover="isHover = true"
                                @mouseleave="isHover = false"
                                class="tooltip tooltip-left"
                                data-tip="Cerrar Sesión"
                            >
                                <font-awesome
                                    :icon="isHover ? 'person-walking-arrow-right' : 'power-off'"
                                    class="w-5 h-5 text-application-yellow-500"
                                />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </aside>

        <!-- Menu Horizontal-->
        <aside v-else>
            <nav :class="[menuClass, 'text-white transition-all duration-300 flex items-center pl-4 p-1', 'dark:bg-dark-panel dark:text-dark-text']">
                <ul class="flex space-x-2">
                    <li v-for="item in menuItems" :key="item.id">
                        <div
                            :class="[
                                'cursor-pointer flex items-start transition-all duration-300 hover:bg-color-pgp-blue-100 px-2 py-1',
                                selectedItem === item.id ? 'border-b-4 border-color-pgp-yelloy-500  bg-application-blue-300' : '',
                                'space-x-2',
                            ]"
                            @click="selectItem(item.id)"
                        >
                            <font-awesome :icon="item.icon" class="w-5 h-5" />
                            <span v-if="!isCollapsed || isHorizontal" class="ml-4 text-white">
                                {{ item.label }}
                            </span>
                        </div>
                    </li>
                </ul>
            </nav>
        </aside>
    </div>
</template>

<script setup lang="ts">
import type { MenuApplication } from '~/types/menuApplication.interface';
import type { User } from '~/types/user.interface';

/* ========================================================================
                            1.- PROPIEDADES
===========================================================================*/

/* ========================================================================
                            2.- EVENTOS: EMITER
===========================================================================*/
interface Props {
    isCollapsed: Boolean; // Propiedad para saber si el menú está colapsado
    isHorizontal: boolean;
    menuClass: string;
    isOpen: boolean;
    isFloatMenu: boolean;
    closePanel: () => void;
}

const props = withDefaults(defineProps<Props>(), {
    menuClass: 'bg-application-blue-600',
});

const { isHorizontal } = toRefs(props);

/* ========================================================================
                            3.- ATRIBUTOS
===========================================================================*/
const authStore = useAuthStore();
const displayName = ref('');
const departmentDesc = ref('');
const isHover = ref(false);

// Obtener el enrutador de Nuxt para la navegación
const router = useRouter();
// constante para el select
const selectedItem = ref(1);

const imageUser = ref<string>('');

// Definir los ítems del menú de navegación
const menujson = await import('@/config/menu.json');
//const menuItems = ref(menujson.default.menu);
const menuItems = ref<MenuApplication[]>([]);
const colorStore = useColorStore();
const isDarkMode = computed(() => colorStore.settingApp.isDark);
const config = await import('@/config/config.json');
const appVersion = config.configuration.version;
/* ========================================================================
                            4.- CONSTRUCTORES
===========================================================================*/
onMounted(async () => {
    const usuario = authStore.user as User;

    displayName.value = usuario.displayName;
    departmentDesc.value = usuario.departmentDesc;
    imageUser.value = authStore.imageUser;
    const tempMenu = menujson.default.menu;
    let itemMenu: MenuApplication;

    tempMenu.forEach((m) => {
        const matchedRole = usuario.roles?.find((x) => m.role.includes(x.rolName) && x.granted === true);
        let perfil: string = '';

        // verifico si la opcion del menu ya esta dada de alta y veop que perfil tiene
        // si tiene granted = true entocnes es un full sino solo tiene lector o editor
        // ahora si ya tiene lector y ahora se le da el editor se cambia automaticamente a full
        if (matchedRole) {
            // Excepción para Técnicos (id = 2)
            if (m.id === 2) {
                // Solo bloquear si el rol que da acceso es BASICO y NO es Editor
                if (matchedRole.rolName === 'SGPyG-Basico' && matchedRole.permissionName !== 'Editor') {
                    return;
                }
            }

            itemMenu = {
                id: m.id,
                label: m.label,
                icon: m.icon,
                to: m.to,
                perfil: perfil,
            } as MenuApplication;

            menuItems.value.push(itemMenu);
        }
    });
    logger.log('Menus: ', menuItems);
});

const selectItem = (index: number) => {
    selectedItem.value = index;
    // Buscar el ítem seleccionado
    const selectedMenuItem = menuItems.value.find((item) => item.id === index);
    // Si el ítem tiene una ruta, redirigir a esa ruta
    if (selectedMenuItem && selectedMenuItem.to) {
        if (props.isFloatMenu) {
            props.closePanel();
        }
        router.push(selectedMenuItem.to);
    }
};

const toggleDarkMode = () => {
  colorStore.setDarkMode(!colorStore.settingApp.isDark);
};

// Escuchar cambios en el estado del modo oscuro
watch(isDarkMode, (newVal: boolean) => {
    if (newVal) {
        document.documentElement.classList.add('dark');
    } else {
        document.documentElement.classList.remove('dark');
    }
});

/* ========================================================================
                            5.- METODOS
===========================================================================*/
const logout = async () => {
    
  alert("Menu Navigator logout");
    authStore.logout();
    navigateTo('/logout'); // Redirige a tu página de logout
};
</script>

<style scoped></style>
