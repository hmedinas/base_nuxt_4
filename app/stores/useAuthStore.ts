import { useLocalStorage } from '@vueuse/core';
import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { ErrorResponse } from '~/types/error.interface';
import type { User } from '~/types/user.interface';

export const useAuthStore = defineStore(
    'auth',
    () => {
        const user = ref<User | undefined>();
        const imageUser = ref<string>('');
        const token = ref(useLocalStorage<string>('token', ''));
        const errorResponse = ref<ErrorResponse | null>(null);
        const tokenExpirationTime = ref<number>(0);

        const login = (accessToken: string, expiresIn: number = 600) => {
            debugger
            if (accessToken) {
                token.value = accessToken;
                const now = new Date().getTime();
                tokenExpirationTime.value = now + expiresIn * 1000; // Almacena el timestamp de expiración
            }
            console.log('--- Debug Login ---');
            console.log('Valor de expiresIn:', expiresIn);
            console.log('Tipo de expiresIn:', typeof expiresIn);
            console.log('Cálculo previsto:', new Date().getTime() + (expiresIn * 1000));
        };

        const logout = () => {
            token.value = '';
            user.value = undefined;
            imageUser.value = '';
            tokenExpirationTime.value = 0;
        };

        const completeUser = (userAccess: User) => {
            if (token.value) {
                user.value = userAccess;
            } else {
                user.value = undefined;
                token.value = '';
            }
        };

        const completeImageUser = (imageUrl: string) => {
            if (token.value) {
                imageUser.value = imageUrl;
            } else {
                imageUser.value = '';
            }
        };

        const setError = (_type: number, _error: string) => {
            // Si errorResponse.value es null, lo inicializamos con un objeto vacío
            if (!errorResponse.value) {
                errorResponse.value = {
                    type: 0,
                    fecha: new Date(),
                    descripcion: '',
                };
            }

            // Ahora podemos modificar las propiedades de errorResponse.value sin problemas
            errorResponse.value.type = _type;
            errorResponse.value.fecha = new Date();
            errorResponse.value.descripcion = _error ?? '';
        };
        const cleanError = () => {
            errorResponse.value = null;
        };
        const refreshToken = (accessToken: string, expiresIn: number = 600) => {
            login(accessToken, expiresIn);
        };

        //añadimos id user
        const completeIdUserTecnico = (idUser: number) => {
            if (user.value) {
                user.value = { ...user.value, idUser };
            }
        };

        const pageError = computed(() => {
            switch (errorResponse.value?.type) {
                case 401:
                    return '/error/401';
                case 403:
                    return 'error/403';
                case 404:
                    return 'error/404';
                case 500:
                    return 'error/500';
                default:
                    return 'error/500';
            }
            return '/500';
        });

        return {
            // properties
            // user,

            user: computed(() => user.value), // Si `user.value` es undefined, devuelve un array vacío
            token: computed(() => token.value),
            imageUser: computed(() => imageUser.value),
            // getters
            isAuthenticated: computed(() => token.value !== ''),
            getError: computed(() => errorResponse.value),
            redirectPageError: pageError,
            tokenExpirationTime: computed(() => tokenExpirationTime.value),
            // action
            login,
            logout,
            completeUser,
            completeImageUser,
            setError,
            cleanError,
            refreshToken,
            completeIdUserTecnico,
        };
    },
    /*,
{
  persist:{
    key:'auth',
    storage:  piniaPluginPersistedstate.localStorage(),
    pick: ['token']
  }
}*/
);
