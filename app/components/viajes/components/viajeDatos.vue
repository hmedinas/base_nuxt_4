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
                    <span class="input-group-text width-filter">Técnico</span>
                    <input
                        v-model="nombreCompleto"
                        type="text"
                        placeholder="Nombre del técnico"
                        :class="['control flex-1 input input-bordered w-full uppercase']"
                        maxlength="60"
                        :disabled="true"
                    />
                </div>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-2 pt-1">
                <div class="input-group">
                    <span class="input-group-text width-filter">Fecha inicio</span>
                    <DatePicker
                        v-model="fechaInicio"
                        showIcon
                        fluid
                        :class="['flex-1 w-full control', advertencia && !fechaInicio ? 'p-invalid' : '']"
                        placeholder="SELECCIONE FECHA"
                        dateFormat="dd/mm/yy"
                        :disabled="!props.isEdit"
                    />
                </div>
                <div class="input-group">
                    <span class="input-group-text width-filter">Fecha fin</span>
                    <DatePicker
                        v-model="fechaFin"
                        showIcon
                        fluid
                        :class="['flex-1 w-full control', advertencia && !fechaFin ? 'p-invalid' : '']"
                        placeholder="SELECCIONE FECHA"
                        dateFormat="dd/mm/yy"
                        :disabled="!props.isEdit"
                    />
                </div>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-2 pt-1">
                <div class="input-group">
                    <span class="input-group-text width-filter">Destino</span>
                    <input
                        v-model="destino"
                        type="text"
                        placeholder="Ingrese el destino"
                        :class="['control flex-1 input input-bordered w-full', advertencia && !destino ? 'p-invalid' : '']"
                        maxlength="100"
                        :disabled="!props.isEdit"
                    />
                </div>
                <div class="input-group">
                    <span class="input-group-text width-filter">Estado</span>
                    <Select
                        v-model="idEstado"
                        :options="estadosViaje"
                        optionValue="id"
                        optionLabel="descripcion"
                        class="flex-1 w-full control"
                        placeholder="Seleccione un estado"
                        :class="[advertencia && !idEstado ? 'p-invalid' : '']"
                        :disabled="!props.isEdit"
                    />
                </div>
            </div>

            <div class="grid grid-cols-1 gap-2 pt-1">
                <div class="flex pb-1 text-base border-b-2 border-b-surface-400">
                    <Box />
                    Observaciones
                </div>
                <div class="input-group">
                    <Textarea
                        v-model="observaciones"
                        rows="3"
                        placeholder="Ingrese observaciones"
                        class="control w-full"
                        maxlength="500"
                        :disabled="!props.isEdit"
                    />
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import Box from '~/components/common/Box.vue';
import { ViajeService } from '~/services/viajes.service';
import { TypeResponse } from '~/types/responseApi.interface';
import type { SaveViaje, Viaje } from '../interfaces';
import { TypeTransaction, type Transaction } from '~/types/transaction.interface';
import Loading from '~/components/common/Loading.vue';

/* ========================================================================
                            1.- PROPIEDADES
===========================================================================*/
interface Props {
    open: boolean;
    idViaje: number;
    save: boolean;
    isEdit: boolean;
    acceso: 'FULL' | 'READ' | 'NONE';
}

const props = withDefaults(defineProps<Props>(), {
    open: false,
    idViaje: 0,
    save: false,
    isEdit: false,
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

const colorStore = useColorStore();
const color = colorStore.colorApplication;

// Variables formulario
const idViajeInterno = ref<number>(0);
const idUser = ref<number>(0);
const nombreCompleto = ref<string>('');
const fechaInicio = ref<Date | null>(null);
const fechaFin = ref<Date | null>(null);
const idEstado = ref<number>(1);
const observaciones = ref<string>('');
const destino = ref<string>('');

// Variables validaciones
const advertencia = ref<boolean>(false);
const isLoading = ref<boolean>(false);

const estadosViaje = [
    { id: 1, descripcion: 'Inicial' },
    { id: 2, descripcion: 'Aprobado' },
    { id: 3, descripcion: 'Realizado' },
    { id: 4, descripcion: 'Cancelado' },
];

// Servicio Api
const viajeService = await ViajeService();

/* ========================================================================
                            4.- CONSTRUCTORES
===========================================================================*/
onMounted(async () => {
    isLoading.value = true;
    LimpiarDatos();
    if (props.idViaje !== 0) {
        await getByID(props.idViaje);
    }
    isLoading.value = false;
});

watch(
    () => props.save,
    (newSave) => {
        if (newSave === true) {
            showSaveConfirmation();
        }
    },
);

watch(
    () => props.open,
    (newOpen) => {
        if (newOpen) {
            if (props.idViaje !== 0) {
                isLoading.value = true;
                getByID(props.idViaje);
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
        const result = await viajeService.GetViajeById(id);
        if (result.idResponse === TypeResponse.OK) {
            SetData(result.data);
        } else showMensaje('error', 'Error', result.message);
    } catch (error) {
        showMensaje('error', 'Error', String(error));
        logger.error(error);
    }
};

const SetData = async (item: Viaje) => {
    isLoading.value = true;
    idViajeInterno.value = item.idViaje;
    idUser.value = item.idUser;
    nombreCompleto.value = item.nombreCompleto;
    fechaInicio.value = parseDateStrToDate(item.fechaInicio);
    fechaFin.value = parseDateStrToDate(item.fechaFin);
    idEstado.value = item.idEstado;
    observaciones.value = item.observaciones;
    destino.value = item.destino;
    await sleep(500);
    isLoading.value = false;
};

const showSaveConfirmation = () => {
    advertencia.value = false;

    const isValid = ValidarForm();
    if (!isValid) {
        advertencia.value = true;
        emit('saveAction', false);
        return;
    }

    confirm.require({
        message: '¿Está seguro de que desea guardar los datos del viaje?',
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

    if (!fechaInicio.value) {
        errorMsg += '- Debe seleccionar una fecha de inicio válida.\n\r';
    }
    if (!fechaFin.value) {
        errorMsg += '- Debe seleccionar una fecha de fin válida.\n\r';
    }
    if (!destino.value || destino.value.trim() === '') {
        errorMsg += '- Debe indicar el destino del viaje.\n\r';
    }
    if (!idEstado.value) {
        errorMsg += '- Debe seleccionar un estado.\n\r';
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

        const itemSave: SaveViaje = {
            idViaje: idViajeInterno.value || undefined,
            idUser: idUser.value,
            fechaInicio: fechaInicio.value ? parseDateToStr(fechaInicio.value) : '',
            fechaFin: fechaFin.value ? parseDateToStr(fechaFin.value) : '',
            idEstado: idEstado.value,
            observaciones: observaciones.value,
            destino: destino.value,
        };

        const result = (await viajeService.SaveViajes(itemSave)) as Transaction;

        if (result.Type === TypeTransaction.ERR) {
            showMensaje('error', 'Error', result.Message);
        } else {
            showMensaje('success', 'Éxito', result.Message ?? 'Viaje guardado correctamente.');
            LimpiarDatos();
            emit('closeReload');
        }
    } catch (error) {
        showMensaje('error', 'Error', getErrorMessage(error));
        logger.error(error);
    } finally {
        emit('saveAction', false);
    }
};

const handleCancel = () => {
    confirm.close();
    emit('saveAction', false);
};

const LimpiarDatos = () => {
    idViajeInterno.value = 0;
    idUser.value = 0;
    nombreCompleto.value = '';
    fechaInicio.value = null;
    fechaFin.value = null;
    idEstado.value = 1;
    observaciones.value = '';
    destino.value = '';
    advertencia.value = false;
};
</script>

<style scoped>
::v-deep(.p-select-label) {
    overflow: hidden !important;
}
</style>
