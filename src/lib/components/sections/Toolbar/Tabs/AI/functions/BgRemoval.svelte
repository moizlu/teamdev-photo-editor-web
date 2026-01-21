<script lang="ts">
    import { onMount } from "svelte";

    import BackgroundRemovalWorker from "$lib/worker/background-removal.worker?worker"


    import { canvasState, fabricState, transformersState } from "$lib/state";
    import { inferenceProgress } from "../state.svelte";

    let removeWorker: Worker | undefined = undefined;

    const onchange = (e: Event & { currentTarget: EventTarget & HTMLInputElement; }) => {
        const transformers = transformersState.get();
        const canvas = canvasState.get();
        const fabric = fabricState.get();
        if (!transformers || !canvas || !fabric) { return; }

        if (!(e.target as HTMLInputElement).checked) {
            const image = canvasState.getImage();
            if (!image) { return; }
            canvasState.create({
                width: image.width,
                height: image.height
            }, image);
            canvas.backgroundImage = image;
            canvas.centerObject(image);
            canvas.renderAll();
            return;
        }

        const dataURL = canvasState.getImage()?.toDataURL();
        if (!dataURL) { return; }

        inferenceProgress.start();
        removeWorker?.postMessage({
            dataURL: dataURL,
        });
    }

    const onMessageReceived = async ({ data }: { data: { status: string, blob: Blob, detail: string } }) => {
        inferenceProgress.end();

        const { status, blob, detail } = data;

        const transformers = transformersState.get();
        const canvas = canvasState.get();
        const fabric = fabricState.get();
        if (!transformers || !canvas || !fabric) { return; }

        switch (status) {
            case 'error':
                throw new Error(detail);
            case 'complete':
                const newImage = await fabric.FabricImage.fromURL(URL.createObjectURL(blob));

                canvasState.create({
                    width: newImage.width,
                    height: newImage.height
                });

                canvas.backgroundImage = newImage;
                canvas.centerObject(newImage);

                canvas.renderAll()
                break;
            default:
                console.error("背景削除: ステータスが無効です。");
                break;
        }
    }

    onMount(() => {
        // const Worker = await import('$lib/worker/background-removal/background-removal.worker?worker');
        removeWorker = new BackgroundRemovalWorker();
        removeWorker.onmessage = onMessageReceived;
        // removeWorker.onmessage = onMessageReceived;
        //fabricState.get()?.FabricImage.fromURL(output)
    });
</script>

<div class="w-full h-full flex flex-col justify-start items-start">
    <label>
        <input type="checkbox" {onchange} disabled={inferenceProgress.isProcessing()} class="w-full p-2 button-general"/>
        <p>背景削除</p>
    </label>
</div>