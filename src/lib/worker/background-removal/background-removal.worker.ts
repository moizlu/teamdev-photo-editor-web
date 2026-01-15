import { inferenceProgress } from "$lib/components/sections/Toolbar/Tabs/AI/state.svelte";
import { canvasState, fabricState, transformersState } from "$lib/state";
import type { BackgroundRemovalPipeline } from "@huggingface/transformers";

let remover: BackgroundRemovalPipeline | undefined = undefined;

self.onmessage = async (e) => {
    console.log("aaaaa");

    const { dataURL } = e.data;
    if (!dataURL) { return; }

    const transformers = transformersState.get();
    const canvas = canvasState.get();
    const fabric = fabricState.get();
    if (!transformers || !canvas || !fabric) { return; }

    if (!remover) {
        remover = await transformers.pipeline('background-removal', "Xenova/modnet", {
            progress_callback: (info) => {
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                inferenceProgress.update(info as any);
                console.log(inferenceProgress.getStatus().status);
            }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        }) as any;
    }
    if (!remover) { return; }

    const output = await remover(dataURL);
    const result = await (output[0].toCanvas() as OffscreenCanvas).convertToBlob({ type: 'image/png' });

    postMessage({ status: "complete",  blob: result });
};
