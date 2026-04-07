import { useNuxtApp } from '#app';
import type { UserRoles } from '~/types/userRoles.interface';
import type { User } from '../types/user.interface';
import type { UserApplication } from '~/types/userApplication.interface';


export const UserService = async () => {
    // Cargar la configuración desde el archivo config.json
    const config = await import('@/config/config.json');
    const configRuntime = useRuntimeConfig()
    const currentEnv = configRuntime.public.envStage;

    const envConfig = configRuntime.public.appConfig
    /*

    // Establecer el entorno actual (development por defecto)
    const currentEnv = process.env.NODE_ENV || 'development';

    // Seleccionar la configuración adecuada según el entorno
    const envConfig = config.default[currentEnv];
*/
    const { $axiosUser } = useNuxtApp();

    const GetProfile = async (): Promise<User> => {
        try {
            
            if (config.configuration.useMockUser) return await __getProfileMock();

            const result = await $axiosUser.get(`/Profile?applicationName=${envConfig.usuarios.appName}`);

            try{
                const data  = result.data as User;
                return data;
            }
            catch
            {
                const authStore = useAuthStore();
                authStore.setError(result.data.detail, result.data.status)
                throw result.data.detail;
            }
           
/*
            const { data } = await $axiosUser.get<User>(`/Profile?applicationName=${envConfig.usuarios.appName}`);
            return data;*/
        } catch (error) {
         

            logger.error(error);
            throw error;
        }
    };
    const GetImageUser = async (hash: string): Promise<string> => {
        try {
            debugger 
            if (config.configuration.useMockUser) return `${envConfig.pathGlobal}person.jpg`;
            
            const url = `/Profile/${hash}/image?imageSize=2`;
            const response = await $axiosUser.get(url, {
                responseType: 'blob', // Esto nos asegura que recibimos la imagen como un archivo binario
            });

                    
            // Crear un URL temporal para mostrar la imagen
            const imageUrl = URL.createObjectURL(response.data);

            // Retorna la URL de la imagen o úsala para mostrarla en el frontend
            //const fullURL = `${basePathApp()}${imageUrl}`;

            return imageUrl;
        } catch (error) {
            logger.error('Error :', error);
            return  `${envConfig.pathGlobal}nophoto.jpg`;
        }
    };
    const GetRoles = async (): Promise<UserRoles[]> => {
        try{
            if (config.configuration.useMockUser) return await __getRoleMock();

            const result = await $axiosUser.get(`/roles?applicationName=${envConfig.usuarios.appName}`);
            const data  = result.data as UserRoles[];
            return data;
        }
        catch(error){
            logger.error(error)
            throw error;
        }
    }
    const GetApplicationUser = async (): Promise<UserApplication> => {
        try {
            
            if (config.configuration.useMockUser) return await __getApplicationUserMock();

            const result = await $axiosUser.get(`/ApplicationUsers?applicationName=${envConfig.usuarios.appName}`);
            try{
                const data  = result.data as UserApplication;
                return data;
            }
            catch
            {
                const authStore = useAuthStore();
                authStore.setError(result.data.detail, result.data.status)
                throw result.data.detail;
            }
           
/*
            const { data } = await $axiosUser.get<User>(`/Profile?applicationName=${envConfig.usuarios.appName}`);
            return data;*/
        } catch (error) {
         

            logger.error(error);
            throw error;
        }
    }

    const __getProfileMock = async (): Promise<User> => {
        try {
            const mock = await import('@/mock/auth.mock.json');

            return mock.user;
        } catch (error) {
            logger.error('Error al obtener los datos del usuario:', error);
            throw error;
        }
    };
    const __getRoleMock = async():Promise<UserRoles[]> => {
        try {
            const mock = await import('@/mock/auth.mock.json');

            return mock.roles;
        } catch (error) {
            logger.error('Error al obtener los datos del usuario:', error);
            throw error;
        }
    }
    const __getApplicationUserMock = async():Promise<UserApplication> => {
        try {
            const mock = await import('@/mock/auth.mock.json');

            return mock.applicationUser;
        } catch (error) {
            logger.error('Error al obtener los datos del usuario:', error);
            throw error;
        }
    }

    return {
        GetProfile,
        GetRoles,
        GetImageUser,
        GetApplicationUser
    };
};
