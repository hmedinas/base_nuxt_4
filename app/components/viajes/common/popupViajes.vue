<template>
    <dialog class="modal p-0 m-0" :open="open" @click.self="emit('close')">
        <div class="modal-box p-0 m-0 border-2 max-w-3xl dark:bg-dark-panel dark:text-dark-text">
            <!-- Cabecera -->
            <div class="p-3 flex justify-between border-b-2 bg-gray-50 dark:bg-dark-panel dark:text-dark-text">
                <h5 v-if="typePopup === ViajesTypeScreen.Viaje" class="text-xl font-semibold">
                    <font-awesome icon="plane" class="w-6 h-6 pt-1 pl-2 pr-2" />
                    Viaje
                </h5>
                <h5 v-if="typePopup === ViajesTypeScreen.Nuevo" class="text-xl font-semibold">
                    <font-awesome icon="plane" class="w-6 h-6 pt-1 pl-2 pr-2" />
                    Nuevo Viaje
                </h5>

                <button class="hover:text-gray-600" @click="emit('close')">
                    <font-awesome icon="x" class="w-5 h-5" />
                </button>
            </div>

            <!-- Contenido -->
            <div class="p-2">
                <ViajeDatos
                    v-if="typePopup === ViajesTypeScreen.Viaje"
                    :open="open"
                    :is-edit="props.isEdit"
                    :idViaje="props.idViaje"
                    :save="saveViaje"
                    @save-action="updateStatusSave"
                    @closeReload="emit('closeReload')"
                    :acceso="props.acceso"
                />
                <ViajeNuevo
                    v-if="typePopup === ViajesTypeScreen.Nuevo"
                    :open="open"
                    :save="saveViaje"
                    @save-action="updateStatusSave"
                    @closeReload="emit('closeReload')"
                />
            </div>

            <!-- Footer -->
            <div class="bg-gray-50 px-4 py-3 flex sm:flex sm:flex-row-reverse sm:px-6 dark:bg-dark-panel dark:text-dark-text">
                <button
                    v-if="typePopup === ViajesTypeScreen.Nuevo || props.isEdit"
                    type="button"
                    :class="[color.buttonClassPrimary, 'button']"
                    @click="guardar"
                >
                    <font-awesome icon="floppy-disk" class="w-4 h-4" />
                    Guardar
                </button>
                <button
                    v-if="typePopup === ViajesTypeScreen.Nuevo || props.isEdit"
                    type="button"
                    class="button buttonCancel dark:bg-dark-panel dark:text-dark-text"
                    @click="emit('close')"
                >
                    <font-awesome icon="ban" class="w-4 h-4" />
                    Cancelar
                </button>
            </div>
        </div>
    </dialog>
    <div v-if="open" class="modal-backdrop fixed top-0 left-0 z-10 bg-black opacity-35 w-screen h-screen"></div>
</template>

<script setup lang="ts">
import ViajeDatos from '../components/viajeDatos.vue';
import ViajeNuevo from '../components/viajeNuevo.vue';
import { ViajesTypeScreen } from '../interfaces';

/* ========================================================================
                            1.- PROPIEDADES
===========================================================================*/
interface Props {
    open: boolean;
    typePopup: ViajesTypeScreen;
    idViaje: number;
    isEdit: boolean;
    acceso: 'FULL' | 'READ' | 'NONE';
}

const props = withDefaults(defineProps<Props>(), {
    open: false,
    typePopup: ViajesTypeScreen.Viaje,
    idViaje: 0,
    isEdit: false,
    acceso: 'NONE',
});

/* ========================================================================
                            2.- EVENTOS: EMITER
===========================================================================*/
const emit = defineEmits<{
    close: [void];
    closeReload: [void];
}>();

/* ========================================================================
                            3.- ATRIBUTOS
===========================================================================*/
const colorStore = useColorStore();
const color = colorStore.colorApplication;

const saveViaje = ref(false);

/* ========================================================================
                            4.- CONSTRUCTORES
===========================================================================*/
onMounted(() => {
    logger.log('PopupViajes:', props.typePopup);
});

/* ========================================================================
                            5.- MÉTODOS
===========================================================================*/
const guardar = () => {
    saveViaje.value = true;
};

const updateStatusSave = (_value: boolean) => {
    saveViaje.value = false;
};
</script>

<style></style>
