export interface UserApplication{
    idUserApplication : number,
    idUser : number,
    idApplication : number,
    lastAccess? : string,
    applicationName : string,
    pageForWebInContruction? : boolean,
    exceptionWebConstructorForDevelopers? : boolean,
    isDeveloper? : boolean,
    isActive? : boolean
}