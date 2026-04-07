<template>
    <div class="p-0 md:p-1 lg:p-1">
        <div :class="['pb-1 text-sm', 'md:pb-1 md:text-lg', 'lg:pb-1 lg:text-xl', 'xl:pb-1 xl:text-2xl']">Viajes</div>

        <!-- Recuadro principal -->
        <div class="bg-white rounded-md dark:bg-dark-panel dark:text-dark-text w-full">
            <div class="p-1 md:p-1 lg:p-2">
                <!-- Cabecera con búsqueda y acciones -->
                <div class="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0 pt-1 pb-1 shadow-md">
                    <div class="items-start text-justify w-full md:w-1/2 text-base lg:text-xl">Lista de Viajes</div>

                    <div class="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-2 justify-end w-full md:w-1/2">
                        <!-- Buscador -->
                        <InputGroup class="text-right w-full md:w-2/4">
                            <InputText v-model="buscar" @keyup.enter="onSearch" placeholder="Buscar por técnico o destino" class="w-full" />
                            <InputGroupAddon>
                                <button class="tooltip tooltip-left" data-tip="Buscar" @click="onSearch">
                                    <font-awesome icon="magnifying-glass" class="w-4 h-4" />
                                </button>
                            </InputGroupAddon>
                        </InputGroup>

                        <!-- Filtro por estado -->
                        <InputGroup class="text-right w-full md:w-1/4">
                            <InputGroupAddon class="tooltip tooltip-left" data-tip="Filtrar por estado">
                                <font-awesome icon="filter" class="w-4 h-4" />
                            </InputGroupAddon>
                            <Select
                                :options="filterEstados"
                                v-model="selectFilterEstado"
                                option-value="id"
                                option-label="descripcion"
                                placeholder="Estado"
                                @change="onFilterGrid"
                                fluid
                            />
                        </InputGroup>

                        <!-- Botones de acción -->
                        <div class="flex space-x-2">
                            <!-- Nuevo viaje -->
                            <button
                                v-if="props.acceso === 'FULL'"
                                class="tooltip tooltip-left"
                                data-tip="Nuevo viaje"
                                :class="[color.textClassPrimary, 'p-1 pr-2 rounded-md', 'hover:text-application-blue-100', 'dark:text-dark-text']"
                                @click="openPopupNew"
                            >
                                <font-awesome icon="plus" class="w-5 h-5" />
                            </button>
                            <button
                                class="tooltip tooltip-left"
                                data-tip="Refrescar"
                                :class="[color.textClassPrimary, 'p-1 pr-2 rounded-md', 'hover:text-application-blue-100', 'dark:text-dark-text dark:hover:text-primary-blue-100']"
                                @click="onRefresh"
                            >
                                <font-awesome icon="rotate" class="w-5 h-5" />
                            </button>
                            <button
                                class="tooltip tooltip-left"
                                data-tip="Imprimir"
                                :class="[color.textClassPrimary, 'p-1 pr-2 rounded-md', 'hover:text-application-blue-100', 'dark:text-dark-text']"
                                @click="onExport"
                            >
                                <font-awesome icon="print" class="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                </div>

                <div class="w-full border-b border-gray-600 mb-0 shadow-md"></div>

                <!-- Indicador de carga -->
                <Loading v-if="loading" />

                <div v-else>
                    <div class="text-right p-3">Total de registros: {{ totalRow }}</div>

                    <div class="h-[70vh] flex flex-col">
                        <div class="card flex flex-col flex-1">
                            <!-- Tabla de viajes -->
                            <DataTable
                                :value="listadoViajes"
                                scrollable
                                stripedRows
                                style="font-size: 12px"
                                scroll-height="60vh"
                                class="flex-1 overflow-auto text-xs"
                            >
                                <template #empty>
                                    <div class="text-center text-gray-500 py-4">No hay datos disponibles</div>
                                </template>

                                <!-- Botón ver -->
                                <Column header="" style="min-width: 3rem" headerClass="bg-application-silver-300 text-application-blue-600">
                                    <template #body="slotProps">
                                        <div class="tooltip tooltip-right" data-tip="Ver">
                                            <button
                                                @click="openPopupEdit(slotProps.data, false)"
                                                :class="[color.textClassPrimary, 'p-1 pr-2 rounded-md', 'hover:text-application-blue-100', 'dark:text-dark-text']"
                                            >
                                                <font-awesome icon="eye" class="w-5 h-5" />
                                            </button>
                                        </div>
                                    </template>
                                </Column>

                                <!-- Técnico -->
                                <Column
                                    field="nombreCompleto"
                                    header="Técnico"
                                    style="min-width: 10rem"
                                    headerClass="bg-application-silver-300 text-application-blue-600"
                                />

                                <!-- Destino -->
                                <Column
                                    field="destino"
                                    header="Destino"
                                    style="min-width: 8rem"
                                    headerClass="bg-application-silver-300 text-application-blue-600"
                                />

                                <!-- Fecha inicio -->
                                <Column
                                    field="fechaInicio"
                                    header="F. inicio"
                                    style="min-width: 5rem"
                                    headerClass="bg-application-silver-300 text-application-blue-600"
                                />

                                <!-- Fecha fin -->
                                <Column
                                    field="fechaFin"
                                    header="F. fin"
                                    style="min-width: 5rem"
                                    headerClass="bg-application-silver-300 text-application-blue-600"
                                />

                                <!-- Observaciones -->
                                <Column
                                    field="observaciones"
                                    header="Observaciones"
                                    style="min-width: 10rem"
                                    headerClass="bg-application-silver-300 text-application-blue-600"
                                />

                                <!-- Estado -->
                                <Column
                                    field="estado"
                                    header="Estado"
                                    style="min-width: 5rem; text-align: center"
                                    headerClass="bg-application-silver-300 text-application-blue-600"
                                >
                                    <template #body="slotProps">
                                        <span
                                            v-if="slotProps.data.estado"
                                            :class="['px-2 py-1 rounded text-xs font-semibold', getEstadoClass(slotProps.data.idEstado)]"
                                        >
                                            {{ slotProps.data.estado }}
                                        </span>
                                    </template>
                                </Column>

                                <!-- Acciones -->
                                <Column
                                    header="Acciones"
                                    style="min-width: 6rem; text-align: center"
                                    headerClass="bg-application-silver-300 text-application-blue-600"
                                >
                                    <template #body="slotProps">
                                        <div
                                            v-if="props.acceso === 'FULL' && slotProps.data.idEstado !== 3 && slotProps.data.idEstado !== 4"
                                            class="tooltip tooltip-left"
                                            data-tip="Modificar"
                                        >
                                            <button
                                                @click="openPopupEdit(slotProps.data, true)"
                                                :class="[color.textClassPrimary, 'p-1 pr-2 rounded-md mr-2', 'hover:text-application-blue-100', 'dark:text-dark-text']"
                                            >
                                                <font-awesome icon="pen" class="w-5 h-5" />
                                            </button>
                                        </div>
                                    </template>
                                </Column>
                            </DataTable>

                            <div class="pt-2">
                                <Paginator
                                    v-if="totalRow >= 10"
                                    v-model:first="page"
                                    v-model:rows="rows"
                                    :totalRecords="totalRow"
                                    :rowsPerPageOptions="[10, 20, 30, 40, 50]"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <PopupViajes
        :open="modalOpen"
        :typePopup="typeScreen"
        @close="closePopup"
        @closeReload="closeReload"
        :idViaje="idViaje"
        :isEdit="isEdit"
        :acceso="props.acceso"
    />

    <ConfirmDialog />
    <Toast position="top-center" group="tc" />
</template>

<script lang="ts" setup>
import Loading from '~/components/common/loading.vue';
import PopupViajes from '../common/popupViajes.vue';
import type { ResponseApi } from '~/types/responseApi.interface';
import { ViajeService } from '~/services/viajes.service';
import { ViajesTypeScreen, type ListadoViajes, type ListadoViajesFilter } from '../interfaces';

/* ========================================================================
                            1.- PROPIEDADES
===========================================================================*/
interface Props {
    acceso: 'FULL' | 'READ' | 'NONE';
}

const props = withDefaults(defineProps<Props>(), {
    acceso: 'NONE',
});

/* ========================================================================
                            3.- ATRIBUTOS
===========================================================================*/
const modalOpen = ref(false);
const typeScreen = ref<ViajesTypeScreen>(ViajesTypeScreen.Viaje);
const colorStore = useColorStore();
const color = colorStore.colorApplication;
const loading = ref(false);

const listadoViajes = ref<ListadoViajes[]>([]);
const totalRow = ref(0);
const rows = ref(10);
const page = ref(0);
const idViaje = ref(0);
const isEdit = ref<boolean>(false);
const buscar = ref('');

const selectFilterEstado = ref<number | null>(null);
const filterEstados = [
    { id: null, descripcion: '-- TODOS --' },
    { id: 1, descripcion: 'Inicial' },
    { id: 2, descripcion: 'Aprobado' },
    { id: 3, descripcion: 'Realizado' },
    { id: 4, descripcion: 'Cancelado' },
];

const filter = ref<ListadoViajesFilter>({
    filtro: null,
    idEstado: null,
    page: page.value,
    limit: rows.value,
});

const toast = useToast();
const showMensaje = (severity: 'success' | 'info' | 'warn' | 'error' | 'secondary' | 'contrast', summary: string, detail: string) => {
    toast.add({ severity, summary, detail, group: 'tc', life: 3000 });
};

const viajesService = await ViajeService();

/* ========================================================================
                            4.- CONSTRUCTORES
===========================================================================*/
onMounted(async () => {
    LoadDataGrid();
});

watch(page, () => { LoadDataGrid(); });
watch(rows, () => { LoadDataGrid(); });

watch(buscar, (newVal: string) => {
    if (!newVal) {
        page.value = 0;
        filter.value.filtro = null;
        LoadDataGrid();
    }
});

/* ========================================================================
                            5.- METODOS
===========================================================================*/
const getEstadoClass = (idEstado: number): string => {
    switch (idEstado) {
        case 1: return 'bg-blue-100 text-blue-800';
        case 2: return 'bg-green-200 text-green-800';
        case 3: return 'bg-gray-200 text-gray-700';
        case 4: return 'bg-red-200 text-red-800';
        default: return 'bg-gray-100 text-gray-600';
    }
};

const openPopupNew = () => {
    idViaje.value = 0;
    modalOpen.value = true;
    typeScreen.value = ViajesTypeScreen.Nuevo;
    isEdit.value = true;
};

const openPopupEdit = (registro: ListadoViajes, _isEdit?: boolean) => {
    idViaje.value = registro.idViaje;
    modalOpen.value = true;
    typeScreen.value = ViajesTypeScreen.Viaje;
    isEdit.value = _isEdit ?? false;
};

const closePopup = () => {
    modalOpen.value = false;
    idViaje.value = 0;
};

const onSearch = () => {
    if (!buscar.value || buscar.value.trim() === '') return;
    page.value = 0;
    filter.value.filtro = buscar.value.trim();
    LoadDataGrid();
};

const onFilterGrid = () => {
    page.value = 0;
    LoadDataGrid();
};

const onRefresh = () => {
    page.value = 0;
    LoadDataGrid();
};

const onExport = async () => {
    showMensaje('info', 'Exportar', 'Funcionalidad de exportación en desarrollo.');
};

const LoadDataGrid = async () => {
    loading.value = true;
    try {
        filter.value.idEstado = selectFilterEstado.value;
        filter.value.page = rows.value ? page.value / rows.value + 1 : 1;
        filter.value.limit = rows.value;
        const response: ResponseApi<ListadoViajes[]> = await viajesService.GetListViajes(filter.value as ListadoViajesFilter);
        totalRow.value = response.totalRows;
        listadoViajes.value = response.data;
    } catch (error) {
        showMensaje('error', 'Error', 'Error al cargar los viajes.');
        logger.error('Error al cargar los viajes.', error);
        listadoViajes.value = [];
        totalRow.value = 0;
    } finally {
        loading.value = false;
    }
};

const closeReload = () => {
    modalOpen.value = false;
    idViaje.value = 0;
    onRefresh();
};
</script>

<style scoped>
button:disabled {
    cursor: not-allowed;
    opacity: 0.5;
}
</style>
