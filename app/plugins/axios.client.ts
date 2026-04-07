import axios from 'axios';

export default defineNuxtPlugin(async (nuxtApp) => {
debugger
  // Cargar la configuración desde el archivo config.json

  
  const config = await import('@/config/config.json');

  const configRuntime = useRuntimeConfig()
  const currentEnv = configRuntime.public.envStage;

  // Seleccionar la configuración adecuada según el entorno
  /*const envConfig = config.default[currentEnv];*/

  const envConfig = configRuntime.public.appConfig
  
  const authStore = useAuthStore();

    // Crear una instancia de Axios
  const axiosInstance = axios.create({
    baseURL: envConfig.usuarios.url 
  });

  const axiosInstanceApp = axios.create({
    baseURL: envConfig.urlService,
    timeout: 100000, // Opcional: tiempo de espera en ms
  });


    // Interceptores de solicitud (tus headers de autorización)

    // Agregar un interceptor para los encabezados
    axiosInstance.interceptors.request.use((config) => {
        const authStore = useAuthStore();

        if (authStore.isAuthenticated) {
            config.headers['Authorization'] = `Bearer ${authStore.token}`;
        }
        return config;
    });

    axiosInstanceApp.interceptors.request.use(async (config) => {
        const authStore = useAuthStore();

        if (authStore.isAuthenticated) {
            try {
                // solo cuandoq ueden 15 minutos

                const now = Date.now();
                const expiration = Number(authStore.tokenExpirationTime); // fuerza a número
                const timeAudit = (expiration - now) / 1000 / 60;

                // Solo renovar si faltan 15 minutos o menos
                if (Number(timeAudit) < Number(15)) {
                    const { $oidcClient } = useNuxtApp();

                    // console.log('Token actual:', authStore.token);
                    // Esperamos el login silencioso para renovar el token
                    const restoreTime = await $oidcClient.signinSilent();

                    if (restoreTime == null || restoreTime == undefined) {
                        console.error('Error renovando sesión:');
                    } else {
                        // Actualiza el token en el store
                        authStore.refreshToken(restoreTime.access_token, restoreTime.expires_in);
                        // console.log('Token new:', restoreTime.access_token);
                        // console.log('Token new 2:', authStore.token);
                    }
                }

                // Asignar el token actualizado en el header
                config.headers['Authorization'] = `Bearer ${authStore.token}`;
            } catch (error) {
                console.error('Error renovando sesión:', error);
            }
        }
        return config;
    });


// Función para manejar errores de Axios
const handleAxiosError = (error) => {
  
  if (axios.isAxiosError(error)) {
    const status = error.response?.status;
    const message = error.message;
    const data = error.response?.data;

      if (authStore.getError === null)
          authStore.setError(status ?? 500, data)

      // return navigateTo(authStore.redirectPageError);

    // Retorna un error estructurado para manejar en componentes
    return Promise.reject({
      status,
      message,
      data,
    });
  }
  return Promise.reject(error);
};
// Interceptor de errores para la instancia de la aplicación
axiosInstanceApp.interceptors.response.use(
  (response) => response,
  (error) => handleAxiosError(error)
);
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => handleAxiosError(error)
);


  return {
    provide:{
        axiosUser: axiosInstance,
        axiosApp: axiosInstanceApp
    }
  }
});