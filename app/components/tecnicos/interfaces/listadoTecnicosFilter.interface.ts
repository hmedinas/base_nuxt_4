import type { PaginationPage } from "~/types/paginationPage.interface";

export interface ListadoTecnicosFilter extends PaginationPage{
    estado: string | null;
    filtro: string | null;
    tipoTecnico: number | null;

}

export enum Estado {
    Alta = 'A' ,
    Baja = 'B',
    Todos ='T',
}
