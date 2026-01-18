import { inferenceProgress } from "$lib/components/sections/Toolbar/Tabs/AI/state.svelte";
// import { canvasState, fabricState, transformersState } from "$lib/state";
import type { BackgroundRemovalPipeline } from "@huggingface/transformers";

import { pipeline } from "@huggingface/transformers";

let remover: BackgroundRemovalPipeline | undefined = undefined;

self.addEventListener('message', async (e) => {
    const { dataURL } = e.data;
    if (!dataURL) {
        postMessage({
            status: "error",
            detail: "データURLが渡されていません。"
        });
        return;
    }

    if (!remover) {
        remover = await pipeline('background-removal', "Xenova/modnet", {
            progress_callback: (info: unknown) => {
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                inferenceProgress.update(info as any);
            }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        }) as any;
    }
    if (!remover) {
        postMessage({
            status: "error",
            detail: "モデルの読み込みに失敗しました。"
        });
        return;
    }

    const output = await remover(dataURL);
    const result = await (output[0].toCanvas() as OffscreenCanvas).convertToBlob({ type: 'image/png' });

    postMessage({ status: "complete", blob: result });
});
