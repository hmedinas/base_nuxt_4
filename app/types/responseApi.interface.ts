import type { TypeTransaction } from "./transaction.interface";

export interface ResponseApi<T> {
    idResponse: TypeResponse;
    message: string;
    totalRows : number;
    data: T;
    type: TypeTransaction
}

export enum TypeResponse{
    OK = 200,
    Error = 400
}