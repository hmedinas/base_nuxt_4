import type { Device } from '~/types/device.interface';

export default defineNuxtPlugin(() => {
    const getDevice = (): Device => {
        const userAgent = navigator.userAgent || navigator.vendor || (window as any).opera;
        const width = window.innerWidth;

        // Detectar iPad
        const isIpad = /iPad/.test(userAgent) || 
                      (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);

        // Detectar mobile (teléfonos)
        const isMobile = /Android|webOS|iPhone|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent) && 
                        width < 768;

        // Detectar tablet (incluye iPad y tablets Android)
        const isTablet = (isIpad || /Android/i.test(userAgent)) && 
                        width >= 768 && 
                        width <= 1024;

        return {
            isMobile,
            isTablet,
            isIpad,
        };
    };

    return {
        provide: {
            device: getDevice(),
        },
    };
});
