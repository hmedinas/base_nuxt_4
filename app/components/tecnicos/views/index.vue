<template>
    <div class="p-0 md:p-1 lg:p-1">
        <div :class="['pb-1 text-sm', 'md:pb-1 md:text-lg', 'lg:pb-1 lg:text-xl', 'xl:pb-1 xl:text-2xl']">Técnicos</div>

        <!-- recuadro principal -->
        <div class="bg-white rounded-md dark:bg-dark-panel dark:text-dark-text w-full">
            <!-- Buscar registros -->
            <div class="p-1 md:p-1 lg:p-2">
                <div class="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0 pt-1 pb-1 shadow-md">
                    <div class="items-start text-justify w-full md:w-1/2 text-base lg:text-xl">Lista de Técnicos</div>

                    <!-- Contenedor de los elementos (búsqueda, filtro, y otros iconos) alineados a la derecha -->
                    <div class="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-2 justify-end w-full md:w-1/2">
                        <!-- InputGroup con caja de texto y botón de búsqueda -->
                        <InputGroup class="text-right w-full md:w-2/4">
                            <InputText v-model="buscar" @keyup.enter="onSearch" placeholder="Buscar por apellidos y nombre" class="w-full" />
                            <InputGroupAddon>
                                <!-- Botón con icono de lupa -->
                                <button class="tooltip tooltip-left" data-tip="Buscar" severity="secondary" variant="text" @click="onSearch">
                                    <font-awesome icon="magnifying-glass" class="w-4 h-4" />
                                </button>
                            </InputGroupAddon>
                        </InputGroup>

                        <!--filtros-->
                        <InputGroup class="text-right w-full md:w-1/4">
                            <InputGroupAddon class="tooltip tooltip-left" data-tip="Filtrar por tipo de técnico">
                                <font-awesome icon="filter" class="w-4 h-4" />
                            </InputGroupAddon>
                            <Select
                                :options="filterTipoTecnico"
                                v-model="selectFilterTipoTecnico"
                                option-value="id"
                                option-label="descripcion"
                                placeholder="Tipo técnico"
                                @change="onFilterGrid"
                                fluid
                            >
                            </Select>
                        </InputGroup>

                        <InputGroup class="text-right w-full md:w-1/4">
                            <InputGroupAddon class="tooltip tooltip-left" data-tip="Filtrar por estado">
                                <font-awesome icon="filter" class="w-4 h-4" />
                            </InputGroupAddon>
                            <Select
                                :options="filterComboBox"
                                v-model="selectFilter"
                                option-value="codigo"
                                option-label="descripcion"
                                placeholder="Seleccione Filtro"
                                @change="onFilterGrid"
                                fluid
                            >
                            </Select>
                        </InputGroup>

                        <!-- Botones de acción (rotar, excel, imprimir) -->
                        <div class="flex space-x-2">
                            <button
                                class="tooltip tooltip-left"
                                data-tip="Refrescar"
                                :class="[
                                    color.textClassPrimary,
                                    'p-1 pr-2 rounded-md',
                                    'hover:text-application-blue-100',
                                    'dark:text-dark-text dark:hover:text-primary-blue-100',
                                ]"
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
                            <!-- Tabla de técnicos-->

                            <DataTable
                                :value="listadoTecnicos"
                                scrollable
                                stripedRows
                                style="font-size: 12px"
                                scroll-height="60vh"
                                class="flex-1 overflow-auto text-xs"
                            >
                                <template #empty>
                                    <div class="text-center text-gray-500 py-4">No hay datos disponibles</div>
                                </template>
                                <!--Columna de botón de ojo con encabezado azul -->
                                <Column header="" style="min-width: 3rem" headerClass="bg-application-silver-300 text-application-blue-600">
                                    <template #body="slotProps">
                                        <div class="tooltip tooltip-right" data-tip="Ver">
                                            <button
                                                @click="openPopupEdit(TecnicosTypeSreen.Tecnico, slotProps.data, false)"
                                                :class="[
                                                    color.textClassPrimary,
                                                    'p-1 pr-2 rounded-md',
                                                    'hover:text-application-blue-100',
                                                    'dark:text-dark-text',
                                                ]"
                                            >
                                                <font-awesome icon="eye" class="w-5 h-5" />
                                            </button>
                                        </div>
                                    </template>
                                </Column>

                                <!-- Otras columnas de la tabla -->
                                <Column
                                    field="nombreCompleto"
                                    header="Apellidos y nombre"
                                    style="min-width: 10rem"
                                    headerClass="bg-application-silver-300 text-application-blue-600"
                                >
                                </Column>
                                <Column
                                    v-if="props.responsable"
                                    field="nivel"
                                    header="Nivel"
                                    style="min-width: 3rem"
                                    header-style="text-align: center"
                                    headerClass="bg-application-silver-300 text-application-blue-600"
                                ></Column>
                                <Column
                                    v-if="props.responsable"
                                    field="fechaNombramiento"
                                    header="F. nombr."
                                    style="min-width: 3rem"
                                    header-style="text-align: center"
                                    headerClass="bg-application-silver-300 text-application-blue-600"
                                />
                                <Column
                                    v-if="props.responsable"
                                    field="fechaCese"
                                    header="F. cese"
                                    style="min-width: 3rem"
                                    header-style="text-align: center"
                                    headerClass="bg-application-silver-300 text-application-blue-600"
                                />

                                <Column
                                    v-if="props.responsable"
                                    field="compensacionNivel"
                                    header="Comp. nivel"
                                    style="min-width: 3rem; text-align: center"
                                    headerClass="bg-application-silver-300 text-application-blue-600"
                                >
                                    <template #body="slotProps">
                                        <i v-if="slotProps.data.compensacionNivel">
                                            <font-awesome icon="square-check" class="w-5 h-5 text-green-500" />
                                        </i>
                                        <i v-else>
                                            <font-awesome icon="rectangle-xmark" class="w-5 h-5 text-red-400" />
                                        </i>
                                    </template>
                                </Column>

                                <Column
                                    v-if="props.responsable"
                                    field="esTecnico"
                                    header="Es técnico"
                                    style="min-width: 3rem; text-align: center"
                                    headerClass="bg-application-silver-300 text-application-blue-600"
                                >
                                    <template #body="slotProps">
                                        <i v-if="slotProps.data.esTecnico">
                                            <font-awesome icon="square-check" class="w-5 h-5 text-green-500" />
                                        </i>
                                        <i v-else>
                                            <font-awesome icon="rectangle-xmark" class="w-5 h-5 text-red-400" />
                                        </i>
                                    </template>
                                </Column>

                                <Column
                                    v-if="props.responsable"
                                    field="miembroDireccion"
                                    header="Miembro dirección"
                                    style="min-width: 1rem; text-align: center"
                                    headerClass="bg-application-silver-300 text-application-blue-600"
                                >
                                    <template #body="slotProps">
                                        <i v-if="slotProps.data.miembroDireccion">
                                            <font-awesome icon="square-check" class="w-5 h-5 text-green-500" />
                                        </i>
                                        <i v-else>
                                            <font-awesome icon="rectangle-xmark" class="w-5 h-5 text-red-400" />
                                        </i>
                                    </template>
                                </Column>
                                  <Column
                                    v-if="props.responsable"
                                    field="comiteDireccion"
                                    header="Comité dirección"
                                    style="min-width: 1rem; text-align: center"
                                    headerClass="bg-application-silver-300 text-application-blue-600"
                                >
                                    <template #body="slotProps">
                                        <i v-if="slotProps.data.comiteDireccion">
                                            <font-awesome icon="square-check" class="w-5 h-5 text-green-500" />
                                        </i>
                                        <i v-else>
                                            <font-awesome icon="rectangle-xmark" class="w-5 h-5 text-red-400" />
                                        </i>
                                    </template>
                                </Column>
                                <Column
                                    v-if="props.responsable"
                                    field="esJefeArea"
                                    header="Jefe área"
                                    style="min-width: 1rem; text-align: center"
                                    headerClass="bg-application-silver-300 text-application-blue-600"
                                >
                                    <template #body="slotProps">
                                        <i v-if="slotProps.data.esJefeArea">
                                            <font-awesome icon="square-check" class="w-5 h-5 text-green-500" />
                                        </i>
                                        <i v-else>
                                            <font-awesome icon="rectangle-xmark" class="w-5 h-5 text-red-400" />
                                        </i>
                                    </template>
                                </Column>
                                <Column
                                    field="haceGuardias24x7"
                                    header="Hace guardias"
                                    style="min-width: 3rem; text-align: center"
                                    headerClass="bg-application-silver-300 text-application-blue-600"
                                >
                                    <template #body="slotProps">
                                        <i v-if="slotProps.data.haceGuardias24x7">
                                            <font-awesome icon="square-check" class="w-5 h-5 text-green-500" />
                                        </i>
                                        <i v-else>
                                            <font-awesome icon="rectangle-xmark" class="w-5 h-5 text-red-400" />
                                        </i>
                                    </template>
                                </Column>
                                <Column
                                    field="haceGuardiasOperadores"
                                    header="Hace guardias operadores"
                                    style="min-width: 3rem; text-align: center"
                                    headerClass="bg-application-silver-300 text-application-blue-600"
                                >
                                    <template #body="slotProps">
                                        <i v-if="slotProps.data.haceGuardiasOperadores">
                                            <font-awesome icon="square-check" class="w-5 h-5 text-green-500" />
                                        </i>
                                        <i v-else>
                                            <font-awesome icon="rectangle-xmark" class="w-5 h-5 text-red-400" />
                                        </i>
                                    </template>
                                </Column>
                                <Column
                                    field="haceViajes"
                                    header="Hace viajes"
                                    style="min-width: 3rem; text-align: center"
                                    headerClass="bg-application-silver-300 text-application-blue-600"
                                >
                                    <template #body="slotProps">
                                        <i v-if="slotProps.data.haceViajes">
                                            <font-awesome icon="square-check" class="w-5 h-5 text-green-500" />
                                        </i>
                                        <i v-else>
                                            <font-awesome icon="rectangle-xmark" class="w-5 h-5 text-red-400" />
                                        </i>
                                    </template>
                                </Column>
                                <Column
                                    v-if="props.responsable"
                                    field="vdTecnicos"
                                    header="VD técnicos"
                                    style="min-width: 1rem; text-align: right"
                                    header-style="text-align: center"
                                    headerClass="bg-application-silver-300 text-application-blue-600"
                                >
                                    <template #body="slotProps">
                                        {{ formatCurrency(slotProps.data.vdTecnicos) }}
                                    </template>
                                </Column>

                                <Column
                                    v-if="props.responsable"
                                    field="vdDireccion"
                                    header="VD dirección"
                                    style="min-width: 2rem; text-align: right"
                                    header-style="text-align: center"
                                    headerClass="bg-application-silver-300 text-application-blue-600"
                                >
                                    <template #body="slotProps">
                                        {{ formatCurrency(slotProps.data.vdDireccion) }}
                                    </template></Column
                                >
                                <Column
                                    v-if="props.responsable"
                                    field="apodo"
                                    header="Apodo"
                                    style="min-width: 1rem"
                                    headerClass="bg-application-silver-300 text-application-blue-600"
                                ></Column>
                                <Column
                                    field="estado"
                                    header="Estado"
                                    style="min-width: 1rem; text-align: center"
                                    headerClass="bg-application-silver-300 text-application-blue-600"
                                >
                                    <template #body="slotProps">
                                        <span
                                            v-if="slotProps.data.estado"
                                            :class="[
                                                'px-2 py-1 rounded text-base font-semibold',
                                                slotProps.data.estado === 'A' ? 'bg-green-200 text-green-800' : 'bg-red-200 text-red-800',
                                            ]"
                                        >
                                            {{ slotProps.data.estado === 'A' ? 'Activo' : 'Baja' }}
                                        </span>
                                    </template>
                                </Column>

                                <Column
                                    header="Acciones"
                                    style="min-width: 8rem; text-align: center"
                                    headerClass="bg-application-silver-300 text-application-blue-600"
                                >
                                    <template #body="slotProps">
                                        <!-- Botón de historico v-if="props.responsable"-->
                                        <div v-if="false" class="tooltip tooltip-left" data-tip="Histórico">
                                            <button
                                                @click="openPopup(TecnicosTypeSreen.Historico, slotProps.data.idUser)"
                                                :class="[
                                                    'p-1 pr-2 rounded-md mr-2',
                                                    color.textClassPrimary,
                                                    'hover:text-application-blue-100',
                                                    'dark:text-dark-text',
                                                ]"
                                            >
                                                <font-awesome icon="timeline" class="w-5 h-5" />
                                            </button>
                                        </div>

                                        <div v-if="slotProps.data.estado != 'B'" class="tooltip tooltip-left" data-tip="Modificar">
                                            <button
                                                @click="openPopupEdit(TecnicosTypeSreen.Tecnico, slotProps.data, true)"
                                                :class="[
                                                    'p-1 pr-2 rounded-md mr-2',
                                                    color.textClassPrimary,

                                                    'hover:text-application-blue-100',
                                                    'dark:text-dark-text',
                                                ]"
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
                                ></Paginator>
                            </div>
                        </div>
                    </div>
                    <!-- Contenedor de Leyenda -->
                </div>
            </div>
        </div>
    </div>
    <PopupTecnicos
        :open="modalOpen"
        :typePopup="typeScreen"
        @close="closePopup"
        @closeReload="closeReload"
        :idTecnico="idTecnico"
        :isEdit="isEdit"
        :responsable="props.responsable"
        :acceso="props.acceso"
    />

    <!-- ConfirmDialog para confirmación de borrado -->
    <ConfirmDialog />
    <Toast position="top-center" group="tc" />
</template>
<script lang="ts" setup>
import Loading from '~/components/common/loading.vue';
import type { Valores } from '~/types/valores.interface';
import PopupTecnicos from '../common/popupTecnicos.vue';
import type { ResponseApi } from '~/types/responseApi.interface';
import { TecnicoService } from '~/services/tecnicos.service';
import { TypeFileExport } from '~/types/typeFileExport.enum';
import { TecnicosTypeSreen, type ListadoTecnicos, type ListadoTecnicosFilter } from '../interfaces';

/* ========================================================================
                            1.- PROPIEDADES
===========================================================================*/
interface Props {
    acceso: 'FULL' | 'READ' | 'NONE';
    responsable: boolean;
}

const props = withDefaults(defineProps<Props>(), {
    acceso: 'NONE',
    responsable: false,
});
/* ========================================================================
                            2.- EVENTOS: EMITER
===========================================================================*/

/* ========================================================================
                            3.- ATRIBUTOS
===========================================================================*/
const modalOpen = ref(false);
const typeScreen = ref<TecnicosTypeSreen>(TecnicosTypeSreen.Tecnico);
const colorStore = useColorStore();
const color = colorStore.colorApplication;
const loading = ref(false);

const listadoTecnicos = ref<ListadoTecnicos[]>([]);
const totalRow = ref(0);
const rows = ref(10);
const page = ref(0);
const idTecnico = ref(0);

const orderFilter = ref(0);
const buscar = ref('');
const confirm = useConfirm();
const tecnicosService = await TecnicoService();
const isEdit = ref<boolean>(false);
const selectFilter = ref('A');
const filterComboBox = <Valores[]>[
    { id: 0, codigo: 'A', descripcion: 'Alta' },
    { id: 1, codigo: 'B', descripcion: 'Baja' },
    { id: 2, codigo: 'T', descripcion: '-- TODOS --' },
];
const selectFilterTipoTecnico = ref(0);
const filterTipoTecnico = <Valores[]>[
    { id: 0, codigo: 'T', descripcion: '-- TODOS --' },
    { id: 1, codigo: 'MD', descripcion: 'Miembro Dirección' },
    { id: 2, codigo: 'CD', descripcion: 'Comité Dirección' },
    { id: 3, codigo: 'JA', descripcion: 'Jefe Área' },
    { id: 4, codigo: 'TEC', descripcion: 'Es Técnico' },
];

const filter = ref<ListadoTecnicosFilter>({
    estado: 'A',
    filtro: null,
    tipoTecnico: 0,
    page: page.value,
    limit: rows.value,
});

const toast = useToast();
const showMensaje = (severity: 'success' | 'info' | 'warn' | 'error' | 'secondary' | 'contrast', summary: string, detail: string) => {
    toast.add({ severity, summary, detail, group: 'tc', life: 3000 });
};

const { acceso, responsable } = useAccesoPantalla(['SGPyG-Direccion', 'DEVELOPER']);

logger.log(' Acceso a Técnicos:', acceso);
logger.log(' ¿Es responsable?', responsable);
/* ========================================================================
                            4.- CONSTRUCTORES
===========================================================================*/
onMounted(async () => {
    LoadDataGrid();
});

watch(page, (newVal: number) => {
    LoadDataGrid();
});
watch(rows, (newVal: number) => {
    LoadDataGrid();
});

watch(buscar, (newVal: string) => {
    if (!newVal) {
        // Si el campo de búsqueda está vacío, recarga la tabla
        page.value = 0;
        filter.value.filtro = null;
        LoadDataGrid();
    }
});

/* ========================================================================
                            5.- METODOS
===========================================================================*/
const openPopupNew = (_typePopup: TecnicosTypeSreen) => {
    openPopup(_typePopup, 0, true);
};

const openPopupEdit = (_typePopup: TecnicosTypeSreen, registro: ListadoTecnicos, _isEdit?: boolean) => {
    const _idTecnico = registro.idUser;
    openPopup(_typePopup, _idTecnico, _isEdit ?? false);
};

const openPopup = (_typePopup: TecnicosTypeSreen, _idTecnico: number | 0, _isEdit?: boolean) => {
    idTecnico.value = _idTecnico;
    modalOpen.value = true;
    typeScreen.value = _typePopup;
    isEdit.value = _isEdit ?? false;
};
const closePopup = () => {
    modalOpen.value = false;
    idTecnico.value = 0;
};

// Método de búsqueda
const onSearch = () => {
    if (!buscar.value || buscar.value.trim() === '') {
        return;
    }

    page.value = 0;
    filter.value.filtro = buscar.value.trim();

    LoadDataGrid(); // Llamar a la carga de datos con el filtro de búsqueda
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
    loading.value = true;

    try {
        const copyFilter: ListadoTecnicosFilter = {
            filtro: filter.value.filtro,
            estado: filter.value.estado,
            tipoTecnico: filter.value.tipoTecnico,
            limit: totalRow.value,
            page: 1,
        };

        let estadoNombre: string = 'Estado_Desconocido';
        switch (copyFilter.estado) {
            case 'A':
                estadoNombre = 'ALTA';
                break;
            case 'B':
                estadoNombre = 'BAJA';
                break;
            case 'T':
                estadoNombre = 'TODOS';
                break;
        }

        const response = await tecnicosService.GetListTecnicos(copyFilter);
        const allServicios = response.data;

        const demos = await ExportFile();

        demos.exportWord('REL_TÉCNICOS', TypeFileExport.Tecnicos, allServicios, estadoNombre);
    } catch (error) {
        showMensaje('error', 'Error exportando el archivo Word', 'error');
        logger.error('Error exportando el archivo Word:', error);
    } finally {
        loading.value = false;
    }
};

//grid
const LoadDataGrid = async () => {
    loading.value = true;
    try {
        filter.value.estado = selectFilter.value;
        filter.value.tipoTecnico = selectFilterTipoTecnico.value;
        filter.value.page = rows.value ? page.value / rows.value + 1 : 1;
        filter.value.limit = rows.value;
        const response: ResponseApi<ListadoTecnicos[]> = await tecnicosService.GetListTecnicos(filter.value as ListadoTecnicosFilter);
        totalRow.value = response.totalRows;
        listadoTecnicos.value = response.data;
    } catch (error) {
        showMensaje('error', 'Error', 'Error al cargar los técnicos.');
        logger.error('Error al cargar los técnicos.', error);
        listadoTecnicos.value = [];
        totalRow.value = 0;
    } finally {
        loading.value = false; // Desactivar el spinner después de cargar
    }
};

const closeReload = () => {
    modalOpen.value = false;
    idTecnico.value = 0;
    onRefresh();
};
</script>
<style scoped>
button:disabled {
    cursor: not-allowed;
    opacity: 0.5;
}
</style>
