import type { User } from "~/types/user.interface";
import type { UserRoles } from "~/types/userRoles.interface";
import type { UserApplication } from "~/types/userApplication.interface";
import { UserService } from "~/services/user.service";


export default defineNuxtRouteMiddleware(async (to, from) => {
  
  
    const authStore = useAuthStore();

    // Rutas públicas a las que se puede acceder sin autenticación
    const publicRoutes = ['/login','/callback','/error','/error/403','/error/404','/error/500','/error/401', '/error/logout','/auth/login-base']; 
    debugger
    if(publicRoutes.includes(to.path)){ 
      
      return;
    }
    
     // si el usuario esta autentificado pero no tiene la informacion del perfil
     if(authStore.isAuthenticated && authStore.user === undefined)
      {
        try{
          debugger
          const userService = await UserService ()
          
          // Validamos el profile siu esta ok
          const user = await userService.GetProfile() as  User
          // vemos los roles
          const roles = await userService.GetRoles() as UserRoles[]

          const userApplication = await userService.GetApplicationUser() as UserApplication
          
          user.roles = roles.filter(x => x.granted === true);
          user.userApplication = userApplication

  
          authStore.completeUser(user);
          const imageUser = await userService.GetImageUser(user.userHash)
          authStore.completeImageUser(imageUser)
        }
        catch(error)
        {
          debugger
          
          if (authStore.getError === null)
            authStore.setError(403, getErrorMessage(error) )
  
          return navigateTo(authStore.redirectPageError);
  
          /*
          
          throw createError({
            statusCode: 403,
            statusMessage: 'obtencion de Acceso a perfil',
            message: getErrorMessage(error)
          })
          */
         // return navigateTo('/403');
        }
      }  
  

    // Comprobar si el usuario está autenticado
    if (!authStore.isAuthenticated)
    {     
      return navigateTo('/auth/login-base');
    }    
   
    if (!authStore.isAuthenticated && !publicRoutes.includes(to.path)) {
      // Si no está autenticado y la ruta no es pública, redirigir a la página de inicio de sesión
      return navigateTo('/auth/login-base');
    }

  })