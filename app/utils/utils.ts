export const parseDateToYearNumber = (date: Date): number => {
    const year = date.getFullYear(); // Año de 4 dígitos

    return year;
};

//formatear fechas al formado dd/MM/yyyy
export const parseDateToStr = (date: Date): string => {
    const day = ('0' + date.getDate()).slice(-2); // Día con 2 dígitos
    const month = ('0' + (date.getMonth() + 1)).slice(-2); // Mes con 2 dígitos
    const year = date.getFullYear(); // Año de 4 dígitos

    return `${day}/${month}/${year}`;
};
//formatear horas al formado hh:mm

export const parseTimeToStr = (time: Date): string => {
    const hours = ('0' + time.getHours()).slice(-2); // Hora con 2 dígitos
    const minutes = ('0' + time.getMinutes()).slice(-2); // Minutos con 2 dígitos

    return `${hours}:${minutes}`;
};

export const parseDateStrToDate = (dateStr?: string): Date | null => {
    if (!dateStr || !dateStr.includes('/')) {
        return null; // o new Date() si prefieres la fecha actual
    }

    const [day, month, year] = dateStr.split('/').map(Number);
    return new Date(year, month - 1, day);
};
export const parseHourStrToDate = (hora: string) => {
    // Concatenar la fecha actual con la hora de HoraInicial
    const currentDate = new Date(); // Obtener la fecha actual
    const [hours, minutes] = hora.split(':').map(Number); // Desglosar hora y minutos

    // Crear una nueva fecha con la hora actual y la hora de item.HoraInicial
    currentDate.setHours(hours, minutes, 0, 0);

    return currentDate;
};

//funcion para sleep
export const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

//funcion para convertir error en string
export const getErrorMessage = (error: unknown): string => {
    if (typeof error === 'string') {
        return error; // Si el error es un string, lo devolvemos directamente
    }
    if (error instanceof Error) {
        return error.message; // Si el error es una instancia de Error, devolvemos su mensaje
    }
    return 'Ocurrió un error'; // Caso genérico para errores desconocidos
};

// función para validar hora
export const validarHora = (hora: string): string | null => {
    // Validar formato HH:MM
    if (!hora || !/^\d{2}:\d{2}$/.test(hora)) {
        return 'El formato de hora es incorrecto. Debe ser HH:MM';
    }

    const [hours, minutes] = hora.split(':').map(Number);

    // Validar que la hora no sea mayor que 23:59
    if (hours > 23 || minutes > 59) {
        return `La hora ${hora} no es válida. Debe estar entre 00:00 y 23:59.`;
    }

    return null; // Si la hora es válida
};

export const basePathApp = (): string => {
    const path = process.env.NODE_ENV === 'production' ? '/SGPyG/' : '/';

    return path;
};

//formateo de numeros a 1.000,00 €
export const formatCurrency = (importe: string | number): string => {
    // Convertir a número si es string
    const value = typeof importe === 'string' ? parseFloat(importe) : importe;
    // Validar si es un número válido
    if (isNaN(value) || value === undefined || value === null) return '0,00 €';

    return value.toLocaleString('es-ES', {
        style: 'currency',
        currency: 'EUR',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    });
};

//formateo de numeros a 1.000,00 € devuelve vacio si no hay valor
export const formatCurrencyDefault = (importe: string | number): string => {
    // Convertir a número si es string
    const value = typeof importe === 'string' ? parseFloat(importe) : importe;
    // Validar si es un número válido
    if (isNaN(value) || value === undefined || value === null) return '';

    return value.toLocaleString('es-ES', {
        style: 'currency',
        currency: 'EUR',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    });
};

export function parseHoraToDecimal(hora?: string): number {
    if (!hora) return 0;
    const [hh, mm] = hora.split(':').map(Number);
    return parseFloat((hh + mm / 60).toFixed(2)); // Redondea a 2 decimales
}

export function pathGlobalApp(): string {
    const config = import('@/config/config.json');
    const configRuntime = useRuntimeConfig();
    const currentEnv = configRuntime.public.envStage;
    const envConfig = configRuntime.public.appConfig;

    return `${envConfig.pathGlobal}`;
}

export function defaultJefeArea(): string {

    return 'GA542B782a'
}

export function pathCRM(): string {
    const configRuntime = useRuntimeConfig();
    const envConfig = configRuntime.public.appConfig;

    return `${envConfig.urlCRM}`;
}

export function formatDateToSpanish(dateString: string): string {

    if(dateString.length != 10){
      console.error("Error fecha invalida");
      throw "Error fecha invalida";
    }

    const fecha = dateString.split('/');
    let month: string;

    switch (fecha[1]) {
        case '01':
            month = 'Enero';
            break;
        case '02':
            month = 'Febrero';
            break;
        case '03':
            month = 'Marzo';
            break;
        case '04':
            month = 'Abril';
            break;
        case '05':
            month = 'Mayo';
            break;
        case '06':
            month = 'Junio';
            break;
        case '07':
            month = 'Julio';
            break;
        case '08':
            month = 'Agosto';
            break;
        case '09':
            month = 'Septiembre';
            break;
        case '10':
            month = 'Octubre';
            break;
        case '11':
            month = 'Noviembre';
            break;
        case '12':
            month = 'Diciembre';
            break;
        default:
            month = 'Mes inválido';
    }

    return `Madrid, ${fecha[0]} de ${month} de ${fecha[2]}.`;
}



