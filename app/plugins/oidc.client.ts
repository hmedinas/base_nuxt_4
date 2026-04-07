import { UserManager, WebStorageStateStore } from 'oidc-client-ts';

export default defineNuxtPlugin(async (nuxtApp) => {

    const configRuntime = useRuntimeConfig()
    const currentEnv = configRuntime.public.envStage;


    const isProduction = currentEnv === 'production';

    // Cargar la configuración desde el archivo JSON
    // Cargar la configuración desde el archivo config.json
    const config = await import('@/config/config.json');

    // Seleccionar la configuración adecuada según el entorno
    /*const envConfig = config.default[currentEnv];*/
    const envConfig = configRuntime.public.appConfig

    const userManager = new UserManager({
        authority: envConfig.autentification.authority,
        client_id: envConfig.autentification.clientId,
        response_type: envConfig.autentification.responseType,
        scope: envConfig.autentification.scope,
        filterProtocolClaims: envConfig.autentification.filterProtocolClaims,
        loadUserInfo: envConfig.autentification.loadUserInfo,
        automaticSilentRenew: envConfig.autentification.automaticSilentRenew,
        silentRequestTimeout: envConfig.autentification.silentRequestTimeout,
        accessTokenExpiringNotificationTime: envConfig.autentification.accessTokenExpiringNotificationTime,
        /*metadata: {
            authorization_endpoint: envConfig.autentification.authUrl, // Endpoint de autorización
            token_endpoint: envConfig.autentification.tokenUrl, // Endpoint de obtención de token
        },*/
        // Redirigir dinámicamente dependiendo del entorno
        redirect_uri: `${window.location.origin}/${envConfig.autentification.callback}`,
        silent_redirect_uri: `${window.location.origin}/${envConfig.autentification.silentCallback}`,
        // URI de redirección tras logout
        post_logout_redirect_uri: `${window.location.origin}/${envConfig.autentification.postLogout}`,
        userStore: new WebStorageStateStore({ store: window.localStorage }), // Usamos localStorage para guardar la sesión
    });

   
    // Evento para manejar cuando el token está a punto de expirar
    userManager.events.addAccessTokenExpiring(() => {
        console.log('El token de acceso está a punto de expirar.');
        // Renovar el token en modo silencioso antes de que expire
        userManager.signinSilent().then(() => {
        console.log('Token renovado correctamente.');
        }).catch((err) => {
        console.error('Error al renovar el token en modo silencioso', err);
        // Redirigir al usuario al login si la renovación falla
        userManager.signoutRedirect();
        });
    });

    // Evento para manejar cuando el token ha expirado
    userManager.events.addAccessTokenExpired(() => {
        console.log('El token de acceso ha expirado.');
        // Redirigir al usuario al login
        userManager.signoutRedirect();
    });

    // Evento para manejar si la autenticación ha fallado
    userManager.events.addSilentRenewError((err) => {
        console.error('Error durante la renovación silenciosa', err);
        // Redirigir al login si la renovación falla
        userManager.signoutRedirect();
    });


    return {
        provide: {
            oidcClient: userManager,
        },
    };
});
