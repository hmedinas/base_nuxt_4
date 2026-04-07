export namespace EndPoint {
    // estados generales de la aplicación
    export enum Estados {
        //Obtiene los filtros de cada módulo
        AllEstados = '/estados/estados',

        // Obtiene ubicaciones para los viajes y eventos
        AllUbicaciones = '/estados/ubicaciones',

        // Obtiene los roles para los viajes y eventos
        AllRoles = '/estados/roles',

        // Obtiene todos los tecnicos para los select
        AllTecnicos = '/estados/tecnicos',
    }

    export enum Guardias {
        // Select de tecnicos que hacen guardias 24x7
        ListarTecnicosSelect = '/guardias/tecnicos',

        // lista de guardias
        ListarGuardiasGrid = '/guardias',

        // Crear guardia
        SaveGuardia = '/guardias',

      
    }

    export enum GuardiasOperadores {
        //Todos los Turnos para select y grid
        TurnosSelect = '/guardias-operadores/turnos',

        // Select de tecnicos
        ListarTecnicosSelect = '/guardias-operadores/tecnicos',


        //Calculo de guardias operadores
        CalculoGuardiasOperadores = '/guardias-operadores/calculo-guardia',

        //Cambio guardias operadores
        CambioGuardiasOperadores = '/guardias-operadores/change-guardia',

        //adjudicarCalendario
        AdjudicarCalendario = '/guardias-operadores/active-adjudicadas',
    }

    export enum TurnosOperadores {
          // listar todos los turnos en grid principal
        ListarTurnosGrid = '/turno-operadores',

        //guarda un turno
        SaveTurno = '/turno-operadores',
          // obtiene turno por ID 
        DeleteTurno = '/turno-operadores/',


    }
}
