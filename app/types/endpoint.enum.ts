export namespace EndPoint {

    export enum Viajes {
        // Listado de viajes
        ListarViajesGrid = '/viajes',

        // Crear/actualizar viaje
        SaveViaje = '/viajes',

        // Obtener viaje por ID
        ViajeById = '/viajes/',

        // Borrar viaje
        DeleteViaje = '/viajes/',
    }

    export enum Tecnicos {
        // listado de tecnicos
        ListarTecnicosGrid = '/tecnicos',

        // Crear técnico
        SaveTecnico = '/tecnicos',

        //Obtener técnicos por ID
        TecnicoById = '/tecnicos/',

        //Borrar técnico
        DeleteTecnico = '/tecnicos/',

        //Histórico de logs por técnico.
        HistoricoById = '/historico/',

        //Histórico de logs por fecha
        HistoricoByFecha = '/historico/historico-by-fecha',
    }
    
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

        //Obtiene los departamentos para select de unidades
        AllDepartamentos = '/estados/departamentos',

        // colores guardias operadores
        ColoresTurnos = '/estados/color-guardia-operadores',
        
        //icono guardias operadores
        IconoTurnos = '/estados/icono-guardia-operadores',

        // sincroniza festivos con cronos
        SaveFestivosSincronizar = '/estados/save-festivos',

        //Obtiene el username del técnico o tambien por el iduser
        GetIdTecnico = '/estados/tecnico-id',
    }



}
