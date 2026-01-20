import { isModalOperating } from "../../state.svelte";

export const operationProgress = $state({
    start: () => {
        isModalOperating.set(true);
    },
    end: () => {
        isModalOperating.set(false);
    },

    isProcessing: () => isModalOperating.get()
});