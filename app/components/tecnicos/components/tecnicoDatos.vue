<template>
    <Loading v-if="isLoading" />

    <div v-else>
        <div class="card flex justify-center">
            <div class="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 xl:grid-cols-1 gap-2 pt-1">
                <div class="flex pb-1 text-base border-b-2 border-b-surface-400">
                    <Box />
                    Identificación
                </div>
                <div class="input-group">
                    <span class="input-group-text width-filter">Apellidos y nombre</span>
                    <input
                        v-model="nombreCompleto"
                        type="text"
                        placeholder="Ingrese apellidos y nombre"
                        :class="['control flex-1 input input-bordered  w-full uppercase']"
                        maxlength="30"
                        :disabled="true"
                    />
                </div>
            </div>
            <div v-if="props.responsable" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-2 pt-1">
                <div class="input-group">
                    <span class="input-group-text width-filter">Nivel</span>
                    <input
                        v-model="nivel"
                        type="number"
                        placeholder="INGRESE EL NIVEL"
                        :class="['control flex-1 input input-bordered w-full uppercase', advertencia && !nivel ? 'p-invalid' : '']"
                        min="0"
                        maxlength="60"
                        :disabled="true"
                    />
                </div>
                <div class="input-group">
                    <span class="input-group-text width-filter">Comp. nivel</span>
                    <div class="flex items-center">
                        <input type="checkbox" v-model="compensacionNivel"
                        class="super-custom-toggle" :disabled="true"  />
                        <div class="ml-0 w-4 mr-2">
                            <span>{{ compensacionNivel ? 'Sí' : 'No' }}</span>
                        </div>
                    </div>
                </div>
            </div>

            <div v-if="props.responsable" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-2 pt-1">
                <div class="input-group">
                    <span class="input-group-text width-filter">Fecha nombramiento</span>
                    <DatePicker
                        v-model="fechaNombramiento"
                        showIcon
                        fluid
                        :class="['flex-1 w-full control', advertencia && !fechaNombramiento ? 'p-invalid' : '']"
                        placeholder="SELECCIONE FECHA"
                        dateFormat="dd/mm/yy"
                        :disabled="true"
                    />
                </div>
                <div class="input-group">
                    <span class="input-group-text width-filter">Fecha cese</span>
                    <DatePicker
                        v-model="fechaCese"
                        showIcon
                        fluid
                        class="control flex-1 w-full"
                        placeholder="FECHA DE CESE"
                        dateFormat="dd/mm/yy"
                        :disabled="true"
                    />
                </div>
            </div>
            <div v-if="props.responsable" class="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-4 gap-2 pt-1">
                <div class="input-group">
                    <span class="input-group-text width-filter">Es técnico</span>
                    <div class="flex items-center">
                        <input type="checkbox" v-model="esTecnico" class="controlCheck super-custom-toggle m-2" :disabled="!props.isEdit" />
                        <div class="ml-0 w-4 mr-2">
                            <span>{{ esTecnico ? 'Sí' : 'No' }}</span>
                        </div>
                    </div>
                </div>
                <div class="input-group">
                    <span class="input-group-text width-filter">Jefe de área</span>
                    <div class="flex items-center">
                        <input type="checkbox" v-model="esJefeArea" class="controlCheck super-custom-toggle m-2" :disabled="!props.isEdit" />
                        <div class="ml-0 w-4 mr-2">
                            <span>{{ esJefeArea ? 'Sí' : 'No' }}</span>
                        </div>
                    </div>
                </div>
                 <div class="input-group">
                    <span class="input-group-text width-filter">Comité dirección</span>
                    <div class="flex items-center">
                        <input type="checkbox" v-model="comiteDireccion" class="controlCheck super-custom-toggle m-2" :disabled="!props.isEdit" />
                        <div class="ml-0 w-4 mr-2">
                            <span>{{ comiteDireccion ? 'Sí' : 'No' }}</span>
                        </div>
                    </div>
                </div>
                <div class="input-group">
                    <span class="input-group-text width-filter">Miembro dirección</span>
                    <div class="flex items-center">
                        <input type="checkbox" v-model="miembroDireccion" class="controlCheck super-custom-toggle m-2" :disabled="!props.isEdit" />
                        <div class="ml-0 w-4 mr-2">
                            <span>{{ miembroDireccion ? 'Sí' : 'No' }}</span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="flex pb-1 text-base border-b-2 border-b-surface-400 pt-2">
                <Box />
                ¿Qué servicios realiza?
            </div>
            <div class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-2 pt-1">
                <div class="input-group">
                    <span class="input-group-text width-filter">Guardias</span>
                    <div class="flex items-center">
                        <input type="checkbox" v-model="haceGuardias24x7" class="controlCheck super-custom-toggle m-2" :disabled="!props.isEdit" />
                        <div class="ml-0 w-4 mr-2">
                            <span>{{ haceGuardias24x7 ? 'Sí' : 'No' }}</span>
                        </div>
                    </div>
                </div>

                <div class="input-group">
                    <span class="input-group-text width-filter">Viajes</span>
                    <div class="flex items-center">
                        <input type="checkbox" v-model="haceViajes" class="controlCheck super-custom-toggle m-2" :disabled="!props.isEdit" />
                        <div class="ml-0 w-4 mr-2">
                            <span>{{ haceViajes ? 'Sí' : 'No' }}</span>
                        </div>
                    </div>
                </div>
                <div class="input-group">
                    <span class="input-group-text width-filter">Guardias operadores</span>
                    <div class="flex items-center">
                        <input
                            type="checkbox"
                            v-model="haceGuardiasOperadores"
                            class="controlCheck super-custom-toggle m-2"
                            :disabled="!props.isEdit"
                        />
                        <div class="ml-0 w-4 mr-2">
                            <span>{{ haceGuardiasOperadores ? 'Sí' : 'No' }}</span>
                        </div>
                    </div>
                </div>
            </div>

            <div v-if="props.responsable" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-2 pt-2">
                <div>
                    <div class="flex pb-1 text-base border-b-2 border-b-surface-400">
                        <Box />
                        Importe
                    </div>
                    <div class="grid grid-cols-1 pt-1">
                        <div class="input-group">
                            <span class="input-group-text width-filter">VD técnicos</span>

                            <InputNumber
                                v-model="vdTecnicos"
                                :min="0"
                                :max="9999999.99"
                                :minFractionDigits="2"
                                :maxFractionDigits="2"
                                inputId="currency-spain"
                                mode="currency"
                                currency="EUR"
                                locale="es-ES"
                                maxlength="60"
                                placeholder="VALORACIÓN DIRECTA TÉCNICOS"
                                class="control flex-1"
                                :disabled="!props.isEdit"
                            />
                        </div>
                    </div>
                  
                    <div class="grid grid-cols-1 pt-1">
                        <div class="input-group">
                            <span class="input-group-text width-filter">VD dirección</span>
                            <InputNumber
                                v-model="vdDireccion"
                                inputId="currency-spain"
                                :min="0"
                                :max="9999999.99"
                                :minFractionDigits="2"
                                :maxFractionDigits="2"
                                mode="currency"
                                currency="EUR"
                                locale="es-ES"
                                placeholder="VALORACIÓN DIRECTA DIRECCIÓN"
                                class="control flex-1"
                                :disabled="!props.isEdit"
                            />
                        </div>
                    </div>
                </div>
                <div>
                    <div class="flex pb-1 text-base border-b-2 border-b-surface-400">
                        <Box />
                        Personal
                    </div>
                    <div>
                        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 pt-1 gap-2">
                            <div class="input-group col-span-1 md:col-span-2 lg:col-span-2 w-full">
                                <span class="input-group-text width-filter">Apodo</span>
                                <input
                                    v-model="apodo"
                                    type="text"
                                    placeholder="Ingrese apodo"
                                    class="control flex-1 input input-bordered w-full uppercase"
                                    maxlength="45"
                                    :disabled="true"
                                />
                            </div>
                        </div>
                        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 pt-1 gap-2">
                            <div class="input-group col-span-1 md:col-span-2 lg:col-span-2 w-full">
                                <span class="input-group-text width-filter">Estado</span>
                                <Select
                                    v-model="estado"
                                    :options="estadoSeleccion"
                                    optionValue="codigo"
                                    optionLabel="descripcion"
                                    class="flex-1 w-full control"
                                    placeholder="Seleccione un estado"
                                    :disabled="true"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import Box from '~/components/common/Box.vue';
import { TecnicoService } from '~/services/tecnicos.service';
import { TypeResponse } from '~/types/responseApi.interface';
import type { SaveTecnico, Tecnico } from '../interfaces';
import { TypeTransaction, type Transaction } from '~/types/transaction.interface';
import Loading from '~/components/common/Loading.vue';

/* ======================================================================== 
                            1.- PROPIEDADES
===========================================================================*/
interface Props {
    open: boolean;
    idTecnico: number;
    save: boolean;
    isEdit: boolean;
    responsable: boolean;
    acceso: 'FULL' | 'READ' | 'NONE';
}

const props = withDefaults(defineProps<Props>(), {
    open: false,
    idTecnico: 0,
    save: false,
    isEdit: false,
    responsable: false,
    acceso: 'NONE',
});
/* ======================================================================== 
                            2.- EVENTOS: EMITER 
===========================================================================*/
const emit = defineEmits<{
    saveAction: [value: boolean];
    closeReload: [void];
}>();

/* ======================================================================== 
                            3.- ATRIBUTOS
===========================================================================*/
const confirm = useConfirm();
const toast = useToast();
const showMensaje = (severity: 'success' | 'info' | 'warn' | 'error' | 'secondary' | 'contrast', summary: string, detail: string) => {
    toast.add({ severity, summary, detail, group: 'tc', life: 3000 });
};

/* aplicar los color a la aplicacion */
const colorStore = useColorStore();
const color = colorStore.colorApplication;
const colorWindows = colorStore.settingApp;
const appColor = colorStore.settingApp;

//Variables formulario
const nombreCompleto = ref<string>('');
const nivel = ref<number>(0);
const compensacionNivel = ref<boolean>(false);
const fechaNombramiento = ref<Date | null>(null);
const fechaCese = ref<Date | null>(null);
const esTecnico = ref<boolean>(false);
const esJefeArea = ref<boolean>(false);
const miembroDireccion = ref<boolean>(false);
const comiteDireccion = ref<boolean>(false);
const haceGuardias24x7 = ref<boolean>(false);
const haceGuardiasOperadores = ref<boolean>(false);
const haceViajes = ref<boolean>(false);
const vdTecnicos = ref<number>(0);
const vdDireccion = ref<number>(0);
const apodo = ref<string>('');
const estado = ref<string>('');
const idTecnico = ref(0);
//variables validaciones
const advertencia = ref<boolean>(false);
const advertenciaBack = ref<boolean>(false);
const isLoading = ref<boolean>(false);
const estadoSeleccion = [
    { codigo: 'A', descripcion: 'ACTIVO' },
    { codigo: 'B', descripcion: 'BAJA' },
];
//Servicio Api
const tecnico = await TecnicoService();

/* ======================================================================== 
                            4.- CONSTRUCTORES 
===========================================================================*/
onMounted(async () => {
    isLoading.value = true;
    LimpiarDatos();
    if (props.idTecnico !== 0) {
        await getByID(props.idTecnico);
    }
    isLoading.value = false;
});

// Watch para la propiedad 'save'
watch(
    () => props.save,
    (newSave) => {
        if (newSave === true) {
            showSaveConfirmation();
        }
    },
);

// para limpiar datos
watch(
    () => props.open,
    (newOpen) => {
        if (newOpen) {
            if (props.idTecnico !== 0) {
                isLoading.value = true;
                getByID(props.idTecnico);
                isLoading.value = false;
            }
        } else LimpiarDatos();
    },
    { deep: true },
);
/* ======================================================================== 
                            5.- METODOS
===========================================================================*/
const getByID = async (id: number) => {
    try {
        const result = await tecnico.GetTecnicoById(id);

        if (result.idResponse === TypeResponse.OK) {
            SetData(result.data);
        } else showMensaje('error', 'Error', result.message);
    } catch (error) {
        showMensaje('error', 'Error', String(error));
        logger.error(error);
    }
};

const SetData = async (item: Tecnico) => {
    isLoading.value = true;
    idTecnico.value = item.idUser;
    apodo.value = item.apodo;
    nivel.value = item.nivel;
    fechaNombramiento.value = parseDateStrToDate(item.fechaNombramiento);
    fechaCese.value = item.fechaCese ? parseDateStrToDate(item.fechaCese) : null;
    compensacionNivel.value = item.compensacionNivel;
    esTecnico.value = item.esTecnico;
    comiteDireccion.value = item.comiteDireccion
    miembroDireccion.value = item.miembroDireccion;
    estado.value = item.estado;
    vdTecnicos.value = item.vdTecnicos;
    vdDireccion.value = item.vdDireccion;
    nombreCompleto.value = item.nombreCompleto;
    haceGuardiasOperadores.value = item.haceGuardiasOperadores;
    haceGuardias24x7.value = item.haceGuardias24x7;
    haceViajes.value = item.haceViajes;
    esJefeArea.value = item.esJefeArea;
    await sleep(1000);
    isLoading.value = false;
};

const showSaveConfirmation = () => {
    if (advertenciaBack.value === true) {
        showMensaje('error', 'Advertencia', 'Error');
        emit('saveAction', false);
        return;
    }
    advertencia.value = false;

    const isValid = ValidarForm();
    if (!isValid) {
        advertencia.value = true;
        emit('saveAction', false);
        return;
    }

    confirm.require({
        message: '¿Está seguro de que desea guardar estos datos del técnico?',
        header: '¿Desea Guardar?',
        icon: 'pi pi-save',
        acceptLabel: 'Aceptar',
        rejectLabel: 'Cancelar',
        accept: () => Guardar(),
        reject: () => handleCancel(),
        onHide: () => handleCancel(),
    });
};

const ValidarForm = (): boolean => {
    let errorMsg = '';

    // Validación para el conductor
    if (!fechaNombramiento.value) {
        errorMsg += '- Debe seleccionar una fecha válida.\n\r';
    }
    if (!nivel.value) {
        errorMsg += '- Ingrese el nivel.\n\r';
    }

    if (errorMsg.length > 0) {
        showMensaje('error', 'Advertencia', errorMsg);
        return false;
    }

    return true;
};

const Guardar = async () => {
    try {
        confirm.close();
    
        // Crear una instancia del objeto ServicioShInsert
        const itemSave: SaveTecnico = {
            idUser: idTecnico.value,
            nivel: nivel.value,
            compensacionNivel: compensacionNivel.value,
            fechaCese: estado.value ? null : fechaCese.value ? parseDateToStr(fechaCese.value) : null,
            esTecnico: esTecnico.value,
            miembroDireccion: miembroDireccion.value,
            comiteDireccion: comiteDireccion.value,
            vdTecnicos: vdTecnicos.value,
            vdDireccion: vdDireccion.value,
            estado: estado.value,
            haceGuardiasOperadores: haceGuardiasOperadores.value,
            haceGuardias24x7: haceGuardias24x7.value,
            haceViajes: haceViajes.value,
            esJefeArea: esJefeArea.value
        };

        const result = (await tecnico.SaveTecnicos(itemSave)) as Transaction;

        if (result.Type === TypeTransaction.ERR) {
            showMensaje('error', 'Error', result.Message);
        } else {
            showMensaje('success', 'Éxito', result.Message);
            LimpiarDatos();
            emit('closeReload');
        }
        // Opcional: limpiar el formulario después de guardar
    } catch (error) {
        showMensaje('error', 'Error', getErrorMessage(error));
        logger.error(error);
    } finally {
        emit('saveAction', false);
    }
};

// Función que se ejecuta cuando se cancela el borrado
const handleCancel = () => {
    confirm.close();
    emit('saveAction', false);
    //emit('closeReload');
};

const LimpiarDatos = () => {
    apodo.value = '';
    nivel.value = 0;
    fechaNombramiento.value = null;
    fechaCese.value = null;
    compensacionNivel.value = false;
    esTecnico.value = false;
    comiteDireccion.value = false;
    miembroDireccion.value = false;
    esJefeArea.value = false;
    haceGuardias24x7.value = false;
    haceGuardiasOperadores.value = false;
    haceViajes.value = false;
    estado.value = '';
    nombreCompleto.value = '';
    advertencia.value = false;
};
</script>
