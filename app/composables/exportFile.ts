import PizZip from 'pizzip';

import { TypeFileExport } from '~/types/typeFileExport.enum';
import Docxtemplater from 'docxtemplater';
import type { ListadoTecnicos } from '~/components/tecnicos/interfaces';
import { PathFileExport } from '~/types/pathFileExport.enum';

export const ExportFile = async () => {
    const exportWord = async (nameFile: string, typeFile: TypeFileExport, data: any, extraInfo?: string) => {
        const config = await import('@/config/config.json');

        // Establecer el entorno actual (development por defecto)
        const configRuntime = useRuntimeConfig();
        const currentEnv = configRuntime.public.envStage;

        // Seleccionar la configuración adecuada según el entorno
        /*const envConfig = config.default[currentEnv];*/
        const envConfig = configRuntime.public.appConfig;

        const today = new Date();
        const day = String(today.getDate()).padStart(2, '0');
        const month = String(today.getMonth() + 1).padStart(2, '0');
        const year = today.getFullYear();

        const fullName = `${nameFile}_${day}_${month}_${year}`;

        let dataMapping: any;
        let renderMapping: any;

        let templatePath: string;

        switch (typeFile) {
            case TypeFileExport.Tecnicos:
                dataMapping = data.map((dataTecnicos: ListadoTecnicos) => ({
                    nombre: dataTecnicos.nombreCompleto,
                    nivel: dataTecnicos.nivel,
                    fechaN: dataTecnicos.fechaNombramiento,
                    fCese: dataTecnicos.fechaCese,
                    cNivel: dataTecnicos.compensacionNivel ? 'Sí' : 'No',
                    esTec: dataTecnicos.esTecnico ? 'Sí' : 'No',
                    md: dataTecnicos.miembroDireccion ? 'Sí' : 'No',
                    haceG: dataTecnicos.haceGuardias24x7 ? 'Sí' : 'No',
                    haceGO: dataTecnicos.haceGuardiasOperadores ? 'Sí' : 'No',
                    haceV: dataTecnicos.haceViajes ? 'Sí' : 'No',
                    vdT:
                        typeof dataTecnicos.vdTecnicos === 'number' && !isNaN(dataTecnicos.vdTecnicos)
                            ? `${dataTecnicos.vdTecnicos.toFixed(2).replace('.', ',')} €`
                            : '0,00 €',
                    v24:
                        typeof dataTecnicos.vd247 === 'number' && !isNaN(dataTecnicos.vd247)
                            ? `${dataTecnicos.vd247.toFixed(2).replace('.', ',')} €`
                            : '0,00 €',
                    vdD:
                        typeof dataTecnicos.vdDireccion === 'number' && !isNaN(dataTecnicos.vdDireccion)
                            ? `${dataTecnicos.vdDireccion.toFixed(2).replace('.', ',')} €`
                            : '0,00 €',
                    apodo: dataTecnicos.apodo,
                    es: dataTecnicos.estado === 'A' ? 'Activo' : dataTecnicos.estado === 'B' ? 'Baja' : dataTecnicos.estado,
                }));
                templatePath = PathFileExport.Word.Tecnicos; // Ruta para la plantilla de técnicos

                renderMapping = {
                    data: dataMapping,
                    estado: extraInfo, //estado
                    tecnicos: dataMapping, // Para listado Técnicos
                };
                break;

            default:
                throw new Error('Tipo de archivo no soportado para exportación');
        }
        try {
            // Cargar la plantilla correspondiente
            const urlFileTemplate = `${envConfig.pathGlobal}${templatePath}`;
            const responseTemplate = await fetch(urlFileTemplate);
            if (!responseTemplate.ok) {
                throw new Error(`Error al cargar la plantilla Word desde ${templatePath}`);
            }
            const arrayBuffer = await responseTemplate.arrayBuffer();
            const zip = new PizZip(arrayBuffer);

            const doc = new Docxtemplater(zip, {
                paragraphLoop: true,
                linebreaks: true,
            });

            // Renderizar el documento con los datos mapeados

            doc.render(renderMapping);

            // Generar y descargar el archivo Word
            const output = doc.getZip().generate({
                type: 'blob',
                mimeType: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
            });

            // Crear la URL del blob

            const preUrl = URL.createObjectURL(output);

            //const url = URL.createObjectURL(output);

            const a = document.createElement('a');
            a.href = preUrl;
            a.download = `${fullName}.docx`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(preUrl);
        } catch (error) {
            console.error('Error exportando el archivo Word:', error);
        }
    };

    const exportExcel = () => {
        // Implementar si es necesario
    };

    return {
        exportWord,
        exportExcel,
    };
};
