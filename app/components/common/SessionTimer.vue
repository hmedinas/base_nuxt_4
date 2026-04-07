<template>
    <div
        v-if="showSessionTimer"
        :class="[
            color.buttonClassPrimary,
            'fixed top-0 left-3/4 mr-2 transform p-2 rounded-b-lg shadow-lg z-10 hover:bg-application-blue-100',
            'rounded-b-lg shadow-lg z-10 bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 text-white text-sm',
        ]"
    >
        <div class="flex items-center justify-between gap-4">
            <div>
                <p class="font-medium">Su sesión expira en:</p>
                <p class="text-xl font-bold">{{ formatTime(remainingTime) }}</p>
            </div>

            <button
                @click="renewSession"
                class="px-3 py-1 bg-white text-blue-600 rounded-md hover:bg-blue-50 transition-colors duration-200"
                :disabled="isRenewing"
            >
                <span v-if="!isRenewing">Renovar</span>
                <span v-else class="flex items-center">
                    <svg class="animate-spin -ml-1 mr-1 h-4 w-4 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                        <path
                            class="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                    </svg>
                    Procesando...
                </span>
            </button>
        </div>
    </div>
</template>
<script setup lang="ts">
const authStore = useAuthStore();
const { $oidcClient } = useNuxtApp();
const color = useColorStore().colorApplication;

const remainingTime = ref(0);
const isRenewing = ref(false);
const showSessionTimer = ref(false);
let countdownInterval: ReturnType<typeof setInterval> | null = null;

// Cargar configuración directamente (SPA - no hay SSR)
const config = await import('@/config/config.json');
const mock = await import('@/mock/auth.mock.json');

onMounted(() => {
    // Iniciar el contador solo si hay una sesión activa
    if (authStore.isAuthenticated && authStore.tokenExpirationTime > 0) {
        startCountdown();
    }
});

onBeforeUnmount(() => {
    stopCountdown();
});

// Iniciar el contador
const startCountdown = () => {
    // Limpiar intervalo previo si existe
    stopCountdown();
    
    // Calcular tiempo inicial
    calculateRemainingTime();
    
    // Actualizar cada segundo
    countdownInterval = setInterval(() => {
        calculateRemainingTime();
        
        // Si llegó a 0, manejar expiración
        if (remainingTime.value <= 0) {
            handleSessionExpiration();
        }
    }, 1000);
};

// Detener el contador
const stopCountdown = () => {
    if (countdownInterval !== null) {
        clearInterval(countdownInterval);
        countdownInterval = null;
    }
};

// Calcular tiempo restante (ya no es async)
const calculateRemainingTime = () => {
    const now = new Date().getTime();
    const expirationTime = authStore.tokenExpirationTime;
    
    // Si no hay tiempo de expiración válido, ocultar timer
    if (!expirationTime || expirationTime <= 0) {
        remainingTime.value = 0;
        showSessionTimer.value = false;
        return;
    }
    
    remainingTime.value = Math.max(0, Math.floor((expirationTime - now) / 1000));
    
    // Mostrar solo cuando falten menos de 10 minutos (600 segundos)
    showSessionTimer.value = remainingTime.value > 0 && remainingTime.value < 600;
};

// Formatea el tiempo en MM:SS
const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
};

// Lógica para renovar la sesión
const renewSession = async () => {
    try {
        isRenewing.value = true;

        if (config.configuration.useMock) {
            // Modo mock
            authStore.refreshToken(mock.accessToken, 610);
        } else {
            // Modo real con OIDC
            const restoreTime = await $oidcClient.signinSilent();

            if (!restoreTime) {
                await $oidcClient.signoutRedirect();
                return;
            }
            
            authStore.refreshToken(restoreTime.access_token, restoreTime.expires_in);
        }

        // Reiniciar el contador con el nuevo tiempo
        startCountdown();
    } catch (error) {
        console.error('Error renovando sesión:', error);
        // Forzar logout si hay error crítico
        await $oidcClient.signoutRedirect();
    } finally {
        isRenewing.value = false;
    }
};

// Manejar expiración de sesión
const handleSessionExpiration = () => {
    alert('Intent close timer')
    stopCountdown();
    showSessionTimer.value = false;
    
    // Logout del store
    authStore.logout();
    
    // Redirigir al login o mostrar mensaje
    navigateTo('/login');
};
</script>

<style scoped>
.session-timer {
    font-size: 1rem;
    color: #ff5722;
}
</style>
