import { defineNuxtPlugin } from '#app';
import PrimeVue from 'primevue/config';
// Importa componentes de PrimeVue que quieras usar de manera global
import ToastService from 'primevue/toastservice'

// Importa componentes globales de PrimeVue si los necesitas
import Button from 'primevue/button'
import Toast from 'primevue/toast'
import ConfirmDialog from 'primevue/confirmdialog'
import ConfirmationService from 'primevue/confirmationservice'

export default defineNuxtPlugin((nuxtApp) => {
  
  if (!nuxtApp.vueApp._primeVueApplied) {
    nuxtApp.vueApp.use(PrimeVue, {
      ripple: true, // aqui se puede agregar funciones globales
    });
    nuxtApp.vueApp.use(ToastService)
    // Evitar múltiples registros del plugin
    nuxtApp.vueApp._primeVueApplied = true; // Asegúrate de que el plugin no se aplique más de una vez


    nuxtApp.vueApp.use(ConfirmationService);

    // Se puede registrar los componentes que se usaran
    nuxtApp.vueApp.component('Button', Button)
    nuxtApp.vueApp.component('Toast', Toast)
    nuxtApp.vueApp.component('ConfirmDialog', ConfirmDialog)
  }

  
});