import { isModalOperating } from "../../state.svelte";

type Status = "ready" | "initiate" | "download" | "progress" | "done";

export const inferenceProgress = $state({
    _isProcessing: false,
    _progress: 0,
    _name: "",
    _file: "",
    _status: "ready" as Status,

    start: () => {
        inferenceProgress._isProcessing = true;
        isModalOperating.set(true);
    },
    end: () => {
        inferenceProgress._isProcessing = false;
        isModalOperating.set(false);
    },

    update: ({ progress, name, file, status}: { progress: number, name: string, file: string, status: Status}) => {
        inferenceProgress._progress = progress;
        inferenceProgress._name     = name;
        inferenceProgress._file     = file;
        inferenceProgress._status   = status;
    },

    getStatus: () => {
        return {
            isProcessing: inferenceProgress._isProcessing,
            progress:     inferenceProgress._progress,
            name:         inferenceProgress._name,
            file:         inferenceProgress._file,
            status:       inferenceProgress._status
        }
    },

    isProcessing: () => {
        return inferenceProgress._isProcessing;
    }
})