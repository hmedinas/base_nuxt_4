// src/types/historico.interface.ts

export interface Historico {
    idHistorico: number;
    fecha: string;
    hora: string;
    idUser: number;
    nombreCompleto: string;
    fechaNombramientoNew: string;
    fechaNombramientoOld: string;
    fechaCeseNew: string;
    fechaCeseOld: string;
    nivelNew: string;
    nivelOld: string;
    accion: 'A' | 'B' | 'M';
    desUserCreacion: string;
    userCreacion: string;
}

export interface Cambio {
    campo: string;
    valorAnterior: string;
    valorNuevo: string;
}

export interface HistoricoConCambios extends Historico {
    cambios?: Cambio[];
}

export interface GrupoHistorico {
    fecha: string;
    Log: HistoricoConCambios[];
}
