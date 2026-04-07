export const logger = {
    log: (...args: any[]) => {
        const configRuntime = useRuntimeConfig();
        const envConfig = configRuntime.public.appConfig;

        if (envConfig.isActiveConsole) {
            console.log(...args);
        }
    },

    warn: (...args: any[]) => {
        if (process.dev) {
            console.warn(...args);
        }
    },

    info: (...args: any[]) => {
        if (process.dev) {
            console.info(...args);
        }
    },

    error: (...args: any[]) => {
        // Los errores normalmente sí interesa verlos siempre
        console.error(...args);
    },
};
