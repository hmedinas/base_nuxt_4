export interface SaveTecnico {
        idUser:                 number;
        fechaCese:              string | null;
        compensacionNivel:      boolean;
        esTecnico:              boolean;
        miembroDireccion:       boolean;
        vdTecnicos:             number;
        vd247?:                  number;
        vdDireccion:            number;
        estado:                 string;
        haceGuardias24x7:       boolean;
        haceGuardiasOperadores: boolean;
        haceViajes:             boolean;
        nivel:                  number;
        esJefeArea:             boolean;
        comiteDireccion:        boolean;
}
