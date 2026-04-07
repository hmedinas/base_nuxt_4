<template>
    <div class="h-[500px]">
        <!-- recuadro principal -->
        <div class="bg-white rounded-md dark:bg-dark-panel dark:text-dark-text w-full">
            <!-- Buscar registros -->
            <div class="p-0 md:p-0 lg:p-0">
                <div class="flex pb-1 text-base border-b-2 border-b-surface-400">
                    <Box />
                    Histórico de nivel, fecha de nombramiento y cese
                </div>

                <div v-if="false" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-2 pt-2 pb-2">
                    <div class="input-group">
                        <span class="input-group-text width-filter">Inicio</span>
                        <DatePicker v-model="fechaInicio" showIcon fluid :class="['control']" dateFormat="dd/mm/yy" placeholder="Seleccione Fecha" />
                    </div>
                    <!--Fin Servicio-->
                    <div class="input-group">
                        <span class="input-group-text width-filter">Fin</span>
                        <DatePicker
                            v-model="fechaFin"
                            showIcon
                            fluid
                            dateFormat="dd/mm/yy"
                            placeholder="Seleccione Fecha"
                            :class="['control flex-1 pr-2']"
                        />

                        <button
                            :class="[
                                color.buttonClassPrimary,
                                'p-2 text-xs md:text-sm lg:text-base xl:text-base rounded-md hover:bg-application-blue-100',
                                'dark:bg-secondary-dark dark:text-white',
                                'w-1/4',
                            ]"
                            @click="onFilterLogs"
                        >
                            <font-awesome icon="magnifying-glass" class="w-4 h-4" />
                            Buscar
                        </button>
                    </div>
                </div>

                <div class="p-4 pl-4">
                    <!-- Timeline filtrado -->
                    <div v-if="isloading">
                        <Loading />
                    </div>
                    <div v-else-if="historico.length === 0" class="text-center py-4 text-gray-500">No hay datos disponibles</div>
                    <div v-else>
                        <ul class="timeline timeline-snap-icon max-md:timeline-compact timeline-vertical">
                            <li v-for="(hist, index) in historico" :key="index">
                                <div
                                    class="timeline-middle tooltip tooltip-bottom"
                                    :data-tip="collapsed[index] ? 'Expandir' : 'Colapsar'"
                                    @click="toggleCollapse(index)"
                                >
                                    <span class="flex w-8 h-8 items-center justify-center text-white rounded-full z-10 shadow-sm bg-primary">
                                        <font-awesome :icon="collapsed[index] ? 'angle-right' : 'angle-down'" class="w-6 h-6 text-white" />
                                    </span>
                                </div>
                                <div class="timeline-end mb-6 mt-3 ml-2">
                                    <time class="text-primary">{{ hist.fecha }} </time>

                                    <div
                                        v-if="!collapsed[index]"
                                        class="card bg-gray-200 p-4 border-2 border-primary w-full max-w-full md:w-[600px] lg:w-[800px]"
                                    >
                                        <div v-for="(entry, entryIndex) in hist.Log" :key="entryIndex">
                                            <div>
                                                <span
                                                    v-if="entry.accion === 'B'"
                                                    class="px-2 py-1 rounded text-sm font-semibold text-white bg-red-500"
                                                >
                                                    <font-awesome icon="user-minus" class="w-4 h-4" />
                                                    BAJA</span
                                                >
                                                <span
                                                    v-else-if="entry.accion === 'A'"
                                                    class="px-2 py-1 rounded text-sm font-semibold text-white bg-green-600"
                                                >
                                                    <font-awesome icon="user-plus" class="w-4 h-4" />
                                                    ALTA</span
                                                >
                                                <span
                                                    v-else-if="entry.accion === 'M'"
                                                    class="px-2 py-1 rounded text-sm font-semibold text-white bg-blue-700"
                                                >
                                                    <font-awesome icon="user-pen" class="w-4 h-4" /> MODIFICACIÓN</span
                                                >
                                            </div>

                                            <p class="p-2 text-gray-800 dark:text-gray-300">
                                                <!-- Mensaje común -->
                                                El técnico <strong class="text-primary">{{ entry.nombreCompleto }}</strong> fue actualizado por el
                                                usuario <strong>{{ entry.desUserCreacion }}</strong> a las {{ entry.hora }} h.

                                                <!-- Acción específica -->
                                                <template v-if="entry.accion === 'B'">
                                                    <br />
                                                    <li class="bg-white p-2 rounded-md">
                                                        <span class="text-primary font-semibold">Se registró la baja del técnico </span>
                                                        <font-awesome icon="arrow-right" class="w-4 h-4 text-primary pl-2 pr-2" />
                                                        <span class="text-red-600 font-semibold"> {{ hist.fecha }}.</span>
                                                    </li>
                                                </template>
                                                <template v-else-if="entry.accion === 'A'">
                                                    <br />
                                                    <li class="bg-white p-2 rounded-md">
                                                        <span class="text-primary font-semibold">Se registró la fecha de nombramiento </span>
                                                        <font-awesome icon="arrow-right" class="w-4 h-4 text-primary pl-2 pr-2" />
                                                        <span class="text-green-600 font-semibold"> {{ hist.fecha }}.</span>
                                                    </li>
                                                </template>
                                                <template v-else-if="entry.accion === 'M'">
                                                    <br />
                                                    <span>Se realizaron las siguientes modificaciones:</span>
                                                    <ul>
                                                        <li v-for="(cambio, i) in entry.cambios" :key="i" class="bg-white p-2 rounded-md">
                                                            <span class="text-primary font-semibold pr-2">{{ cambio.campo }}:</span>
                                                            <span class="text-red-500 line-through">{{ cambio.valorAnterior }}</span>
                                                            <font-awesome icon="arrow-right" class="w-4 h-4 text-primary pl-2 pr-2" />
                                                            <span class="text-green-600 font-semibold">{{ cambio.valorNuevo }}</span>
                                                        </li>
                                                    </ul>
                                                </template>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <hr />
                            </li>
                            <li v-if="historico.length > 0" class="timeline-middle flex items-start justify-start pb-2">
                                <font-awesome icon="circle" class="w-4 h-4 text-primary pl-2" />
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import Box from '~/components/common/Box.vue';
import Loading from '~/components/common/Loading.vue';
import type { Cambio, GrupoHistorico, Historico, HistoricoConCambios } from '../interfaces';

/* ======================================================================== 
                        1.- PROPIEDADES
===========================================================================*/
interface Props {
    open: boolean;
    idTecnico: number;
}

const props = withDefaults(defineProps<Props>(), {
    open: false,
    idTecnico: 0,
});

/* ======================================================================== 
                      2.- EVENTOS: EMITER 
===========================================================================*/
const emit = defineEmits<{
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

// Fechas de inicio y fin para los filtros
const fechaInicio = ref<Date | null>(null); // Fecha de inicio
const fechaFin = ref<Date | null>(null); // Fecha de fin
const colorStore = useColorStore();
const color = colorStore.colorApplication;
const collapsed = ref<boolean[]>([]); // Mantener el estado de colapso de cada ítem
const isloading = ref<boolean>(false);
const historico = ref<GrupoHistorico[]>([]);

// Variables para el filtrado
const filteredLogs = ref(historico.value);

/* ======================================================================== 
                      4.- CONSTRUCTORES 
===========================================================================*/

onMounted(() => {
    if (props.open) {
        limpiarDatos();
    }
});

watch(
    () => props.open,
    (newOpen) => {
        if (newOpen) {
            limpiarDatos(); // Cargar histórico
        }
    },
);

/* ======================================================================== 
                          5.- METODOS
===========================================================================*/


// Función para filtrar los logs según las fechas seleccionadas
const onFilterLogs = async () => {
    isloading.value = true;
    if (!fechaInicio.value || !fechaFin.value) {
        filteredLogs.value = historico.value; // Mostrar todos los logs si no se seleccionan fechas
    } else {
        const startDate = fechaInicio.value ? parseDateToStr(fechaInicio.value) : '';
        const endDate = fechaFin.value ? parseDateToStr(fechaFin.value) : '';
         showMensaje('error', 'Error', "No implementado");
        
    }
};

const toggleCollapse = (index: number) => {
    collapsed.value[index] = !collapsed.value[index]; // Cambiar el estado de colapso para el ítem correspondiente
};

const limpiarDatos = () => {
    collapsed.value = historico.value.map(() => false);
};
</script>

<style scoped>
.timeline-vertical:where(.timeline-snap-icon) > li {
    --timeline-col-start: minmax(0, 0fr);
}
</style>
