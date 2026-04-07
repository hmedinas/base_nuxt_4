// composables/useAccesoPantalla.ts

export function useAccesoPantalla(rolesPermitidos: string[]) {
    const authStore = useAuthStore();

    const rolesUsuario = authStore.user?.roles ?? [];

   //  Muestra todos los roles del usuario al entrar
    console.log('Roles del usuario:', rolesUsuario.map(r => r.rolName));


    let acceso: 'FULL' | 'READ' | 'NONE' = 'NONE';
    let responsable = false;

    //recorre los roles de usuario
    for (const userRol of rolesUsuario) {
        /* excepciones */
        if (userRol.rolName === 'DEVELOPER') {
            acceso = 'FULL';
            
            console.log(`Acceso FULL con el rol: ${userRol.rolName}`);
            return { acceso, responsable };
        } 

        //determina si es dirección
        if (userRol.rolName === 'Direccion' || userRol.rolName === 'JefeArea') {
            responsable = true;
             acceso = 'FULL';
        }

        //Recorre todos los roles que sí están autorizados a entrar a la pantalla.

        for (const rolPermitido of rolesPermitidos) {
            //Si el rol del usuario coincide con uno permitido:
            if (userRol.rolName === rolPermitido) {
                //Entonces revisa el nivel de acceso:
                if (userRol.permissionName === 'Editor') {
                    acceso = 'FULL';
                    console.log(`Acceso FULL con el rol: ${userRol.rolName}`);
                    return { acceso, responsable };
                }
                if (userRol.permissionName === 'Lector') {
                    acceso = 'READ';
                    console.log(`Acceso READ con el rol: ${userRol.rolName}`);
                }
            }
        }
    }
    // Al terminar de revisar todos los roles Devuelve el nivel de acceso (FULL, READ, NONE) y si es responsable o no.
    return { acceso, responsable };
    /*
 return { acceso: 'READ', responsable: false } // solo para prueba
 */
}
