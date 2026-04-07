import type { ListadoViajes } from '~/components/viajes/interfaces/listadoViajes.interface';
import type { ListadoViajesFilter } from '~/components/viajes/interfaces/listadoViajesFilter.interface';
import type { Viaje } from '~/components/viajes/interfaces/viaje.interface';
import type { SaveViaje } from '~/components/viajes/interfaces/saveViaje.interface';
import { EndPoint } from '~/types/endpoint.enum';
import type { ResponseApi } from '~/types/responseApi.interface';
import { mapToTransaction, type Transaction } from '~/types/transaction.interface';

export const ViajeService = async () => {
    // constructores
    const config = await import('@/config/config.json');
    const { $axiosApp } = useNuxtApp();

    // Método para listar viajes
    const GetListViajes = async (filter: ListadoViajesFilter): Promise<ResponseApi<ListadoViajes[]>> => {
        try {
            if (config.configuration.useMock)
                return await __getListViajes(filter);

            const response = await $axiosApp.get(EndPoint.Viajes.ListarViajesGrid, {
                params: filter,
            });
            return response.data;
        } catch (error) {
            logger.error('Error in ViajeService - GetListViajes: ', error);
            throw error;
        }
    };

    // Obtener viaje por ID
    const GetViajeById = async (idViaje: number): Promise<ResponseApi<Viaje>> => {
        try {
            if (config.configuration.useMock)
                return await __getViajeById();

            const url = `${EndPoint.Viajes.ViajeById}${idViaje}`;
            const response = await $axiosApp.get(url);
            return response.data;
        } catch (error) {
            logger.error('Error al obtener los datos del viaje por ID:', error);
            throw error;
        }
    };

    // Método para guardar datos de los viajes (crear o actualizar)
    const SaveViajes = async (data: SaveViaje): Promise<Transaction> => {
        try {
            const response = await $axiosApp.post(EndPoint.Viajes.SaveViaje, data);
            return mapToTransaction(response.data);
        } catch (error) {
            logger.error('Error al guardar datos del viaje:', error);
            throw error;
        }
    };

    // Método para eliminar un viaje
    const DeleteViaje = async (id: number): Promise<Transaction> => {
        try {
            const response = await $axiosApp.delete(`${EndPoint.Viajes.DeleteViaje}${id}`);
            return mapToTransaction(response.data);
        } catch (error) {
            logger.error(error);
            throw error;
        }
    };

    // Métodos mock privados
    const __getListViajes = async (_filter: ListadoViajesFilter): Promise<ResponseApi<ListadoViajes[]>> => {
        try {
            const mockService = await import('@/mock/getAllViajes.mock.json');
            return mockService as unknown as ResponseApi<ListadoViajes[]>;
        } catch (error) {
            logger.error('Error in ViajesMock - getListViajes: ', error);
            throw error;
        }
    };

    const __getViajeById = async (): Promise<ResponseApi<Viaje>> => {
        try {
            const mockService = await import('@/mock/getIdViaje.mock.json');
            return mockService as unknown as ResponseApi<Viaje>;
        } catch (error) {
            logger.error('Error in ViajesMock - getViajeById: ', error);
            throw error;
        }
    };

    return {
        GetListViajes,
        GetViajeById,
        SaveViajes,
        DeleteViaje,
    };
};
