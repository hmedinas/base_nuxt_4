import type { ListadoTecnicos } from '~/components/tecnicos/interfaces/listadoTecnicos.interface';
import type { ListadoTecnicosFilter } from '~/components/tecnicos/interfaces/listadoTecnicosFilter.interface';
import type { Tecnico } from '~/components/tecnicos/interfaces/tecnico.interface';
import { EndPoint } from '~/types/endpoint.enum';
import type { ResponseApi } from '~/types/responseApi.interface';
import { mapToTransaction, type Transaction } from '~/types/transaction.interface';

export const TecnicoService = async () => {
    // constructores
    const config = await import('@/config/config.json');
    const { $axiosApp } = useNuxtApp();

    //metodo para listar técnicos

    const GetListTecnicos = async (filter: ListadoTecnicosFilter): Promise<ResponseApi<ListadoTecnicos[]>> => {
        try {
            
            if (config.configuration.useMock)
                return  await __getListTecnicos(filter)
              
            const response = await $axiosApp.get(EndPoint.Tecnicos.ListarTecnicosGrid, {
                params: filter,
            });
            return response.data;
        } catch (error) {
            logger.error('Error in ConstructoresApi: ', error);
            throw error;
        }
    };

    //Obtener técnico por ID
    const GetTecnicoById = async (idTecnico: number): Promise<ResponseApi<Tecnico>> => {
        try {
            const url = `${EndPoint.Tecnicos.TecnicoById}${idTecnico}`;
            const response = await $axiosApp.get(url);
            return response.data;
        } catch (error) {
            logger.error('Error al obtener los datos del técnico por ID:', error);
            throw error;
        }
    }

    //metodo para guardar datos de los técnicos
    const SaveTecnicos = async (data: SaveTecnico): Promise<Transaction> => {
        try {
            const response = await $axiosApp.post(EndPoint.Tecnicos.SaveTecnico, data);
        
            return mapToTransaction(response.data);
        } catch (error) {
            logger.error('Error al guardar datos del técnico:', error);
            throw error;
        }
    }    

    // metodo para dar de baja un tecnico
    const DeleteTecnico = async (id: number): Promise<Transaction> => {
        try{
            const response = await $axiosApp.delete(`${EndPoint.Tecnicos.DeleteTecnico}/${id}`);
            return mapToTransaction(response.data);
        
        }catch (error) {
            logger.error(error);
            throw error;
        }
    }
    // metodo para listar tecnicos con mock
    const __getListTecnicos = async (filter: ListadoTecnicosFilter): Promise<ResponseApi<ListadoTecnicos[]>> => {
        try {
            const mockService = await import('@/mock/listadoTecnicos.mock.json');
            return mockService;
        } catch (error) {
            logger.error('Error in ConstructoresMock: ', error);
            throw error;
        }
    };

    return {
        GetListTecnicos,
        GetTecnicoById,
        SaveTecnicos,
        DeleteTecnico
    };
};
