<template>
    <header :class="[topbarClass, 'h-16 flex items-center justify-between px-4  navbar shadow-md w-auto', 'dark:bg-dark-panel dark:text-dark-text']">
        <div class="navbar-start">
            <button v-if="!isHorizontal" class="btn btn-square btn-ghost hover:text-application-blue-500" @click="toggleMenu">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="inline-block h-5 w-5 stroke-current">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
                </svg>
            </button>
            <div v-else class="text-white">
                <img src="/assets/img/logo_blue.png" alt="Logo" class="transition-all duration-300" style="width: 180px;" />
            </div>
        </div>

        <div class="navbar-end">
            <div class="dropdown dropdown-end">
                <div tabindex="0" role="button" class="btn btn-ghost btn-circle avatar tooltip tooltip-left" data-tip="Datos de Usuario">
                    <div class="w-10 rounded-full">
                        <img alt="Persona" :src="imageUser" />
                    </div>
                </div>
                <ul
                    tabindex="0"
                    :class="[
                        'bg-application-blue-600',
                        'transition-all menu menu-sm dropdown-content text-white rounded-box z-[1] mt-3 w-80 p-2 shadow-lg dark:bg-dark-panel dark:text-dark-text',
                    ]"
                >
                    <li>
                        <a>
                            <font-awesome icon="user" class="w-4 h-4" />
                            {{ displayName }}
                        </a>
                    </li>
                    <li>
                        <a>
                            <font-awesome icon="desktop" class="w-4 h-4" />
                            {{ departmentDesc }}</a
                        >
                    </li>
                    <li>
                        <a>
                            <font-awesome icon="clock-rotate-left" class="w-4 h-4" />
                            {{ lastAccess }}</a
                        >
                    </li>
                    <li>
                        <a>
                            <font-awesome icon="tag" class="w-4 h-4" />
                            © v.{{ appVersion }}</a
                        >
                    </li>
                    <li @click="logout" @mouseover="isHover = true" @mouseleave="isHover = false">
                        <a :class="['text-application-yellow-500', 'font-bold']">
                            <font-awesome :icon="isHover ? 'person-walking-arrow-right' : 'arrow-right-from-bracket'" class="w-5 h-5 text-red-500" />
                            Cerrar Sesión
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    </header>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import type { User } from '~/types/user.interface';

/* ========================================================================
                            1.- PROPIEDADES
===========================================================================*/

/* ========================================================================
                            2.- EVENTOS: EMITER
===========================================================================*/

interface Props {
    isHorizontal: boolean;
    topbarClass: string;

    /*
  topbarClass: {
    type: String,
    default: , // Clase por defecto, puedes cambiarla
  },*/
    toggleMenu: () => void; // Función que viene del layout para colapsar el menú
}

withDefaults(defineProps<Props>(), {
    topbarClass: 'bg-color-pgp-silver-300',
});

/* ========================================================================
                            3.- ATRIBUTOS
===========================================================================*/
const colorStore = useColorStore();
const color = colorStore.colorApplication;
const settingApp = colorStore.settingApp;
const isHover = ref(false);

const router = useRouter();
const authStore = useAuthStore();
const displayName = ref<string>('');
const departmentDesc = ref<string>('');
const lastAccess = ref<string>('');

const imageUser = ref<string>('');
const title = ref<string>('');
const config = await import('@/config/config.json');
const appVersion = config.configuration.version;
/* ========================================================================
                            4.- CONSTRUCTORES
===========================================================================*/
onMounted(async () => {
    const usuario = authStore.user as User;
    displayName.value = usuario.displayName;
    departmentDesc.value = usuario.departmentDesc;
    title.value = usuario.title;

    const rawAccess = usuario.userApplication?.lastAccess;
    //const rawAccess = "2026-01-27T11:24:16.563"

    lastAccess.value =
        rawAccess && rawAccess !== ''
            ? new Date(rawAccess)
                  .toLocaleString('es-ES', {
                      day: '2-digit',
                      month: '2-digit',
                      year: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit',
                  })
                  .replace(',', '')
            : 'Sin Información';

    imageUser.value = authStore.imageUser;
});

/* ========================================================================
                            5.- METODOS
===========================================================================*/

const logout = async () => {
    alert("Menu NavBar logout");
    
    authStore.logout();
    navigateTo('/logout');
};

const goToHelp = () => {
    router.push('/ayuda'); // Navega a la página de ayuda.vue
};
</script>

<style scoped></style>
