<template>
    <dialog id="my_modal_1" class="modal p-0 m-0" :open="open" @click.self="emit('close')">
        <div class="modal-box p-0 m-0 border-2 max-w-6xl dark:bg-dark-panel dark:text-dark-text">
            <div class="p-3 flex justify-between border-b-2 bg-gray-50 dark:bg-dark-panel dark:text-dark-text">
                <h5 v-if="typePopup === TecnicosTypeSreen.Tecnico" class="text-xl font-semibold">
                    <font-awesome icon="user" class="w-6 h-6 pt-1 pl-2 pr-2" />
                    Técnico
                </h5>
                <h5 v-if="typePopup === TecnicosTypeSreen.Historico" class="text-xl font-semibold">
                    <font-awesome icon="timeline" class="w-6 h-6 pt-1 pl-2 pr-2" />
                    Histórico
                </h5>

                <button class="hover:text-gray-600" @click="emit('close')">
                    <font-awesome icon="x" class="w-5 h-5" />
                </button>
            </div>
            <div class="p-2">
                <TecnicoDatos
                    v-if="typePopup === TecnicosTypeSreen.Tecnico"
                    :open="open"
                    :is-edit="props.isEdit"
                    :idTecnico="props.idTecnico"
                    :save="saveTecnico"
                    @save-action="updateStatusSave"
                    @closeReload="emit('closeReload')"
                    :responsable="props.responsable"
                    :acceso="props.acceso"
                />
            </div>
            <div class="p-2">
                <TecnicoHistorico
                    v-if="typePopup === TecnicosTypeSreen.Historico"
                    :open="open"
                    :idTecnico="props.idTecnico"
                    @closeReload="emit('closeReload')"
                />
            </div>
            <div class="bg-gray-50 px-4 py-3 flex sm:flex sm:flex-row-reverse sm:px-6 dark:bg-dark-panel dark:text-dark-text">
                <button v-if="props.isEdit" type="button" :class="[color.buttonClassPrimary, 'button']" @click="guardar">
                    <font-awesome icon="floppy-disk" class="w-4 h-4" />
                    Guardar
                </button>
                <button v-if="props.isEdit" type="button" class="button buttonCancel dark:bg-dark-panel dark:text-dark-text" @click="emit('close')">
                    <font-awesome icon="ban" class="w-4 h-4" />
                    Cancelar
                </button>
            </div>
        </div>
    </dialog>
    <div v-if="open" class="modal-backdrop fixed top-0 left-0 z-10 bg-black opacity-35 w-screen h-screen"></div>
</template>

<script setup lang="ts">
import TecnicoDatos from '../components/tecnicoDatos.vue';
import TecnicoHistorico from '../components/tecnicoHistorico.vue';
import { TecnicosTypeSreen } from '../interfaces';

/* ======================================================================== 
                            1.- PROPIEDADES
===========================================================================*/

interface Props {
    open: boolean;
    typePopup: TecnicosTypeSreen;
    idTecnico: number;
    isEdit: boolean;
    responsable: boolean;
    acceso: 'FULL' | 'READ' | 'NONE';
}

const props = withDefaults(defineProps<Props>(), {
    open: false,
    typePopup: TecnicosTypeSreen.Tecnico,
    idTecnico: 0,
    isEdit: false,
    responsable: false,
    acceso: 'NONE',
});

/* ======================================================================== 
                            2.- EVENTOS: EMITER 
===========================================================================*/

// evento para cerrar el modal
const emit = defineEmits<{
    close: [void];
    closeReload: [void];
}>();

/* ======================================================================== 
                            3.- ATRIBUTOS
===========================================================================*/
/* aplicar los color a la aplicacion */
const colorStore = useColorStore();
const color = colorStore.colorApplication;
const colorWindows = colorStore.settingApp;
const isNew = ref(true);

const confirm = useConfirm();
const toast = useToast();
const showMensaje = (severity: 'success' | 'info' | 'warn' | 'error' | 'secondary' | 'contrast', summary: string, detail: string) => {
    toast.add({ severity, summary, detail, group: 'tc', life: 3000 });
};

const saveTecnico = ref(false);

/* ======================================================================== 
                            4.- CONSTRUCTORES 
===========================================================================*/

onMounted(() => {
    logger.log(props.typePopup);
});

watch(
    props,
    (newProps) => {
        if (newProps.idTecnico !== 0 && newProps.open === true) {
            isNew.value = false;
        } else {
            isNew.value = true;
        }
    },
    { deep: true },
);

/* ======================================================================== 
                            5.- MÉTODOS
===========================================================================*/

const guardar = () => {
    switch (props.typePopup) {
        case TecnicosTypeSreen.Tecnico:
            saveTecnico.value = true;
            break;
    }
};

const updateStatusSave = (value: boolean) => {
    switch (props.typePopup) {
        case TecnicosTypeSreen.Tecnico:
            saveTecnico.value = false;
            break;
    }
};
</script>

<style></style>
