<script lang="ts">
    import { onMount } from "svelte";

    import { BackgroundRemovalPipeline, RawImage, type ImageSegmentationPipeline } from "@huggingface/transformers";

    import { canvasState, fabricState, transformersState } from "$lib/state";

    let remover: BackgroundRemovalPipeline | undefined = undefined;

    const onclick = async () => {
        const transformers = transformersState.get();
        const canvas = canvasState.get();
        const fabric = fabricState.get();
        if (!transformers || !canvas || !fabric) { return; }

        const dataUrl = canvas.backgroundImage?.toDataURL();
        if (!dataUrl) { return; }

        if (!remover) {
            remover = await transformers.pipeline('background-removal', "Xenova/modnet") as any;
            // const segmenter =  await transformers.pipeline('image-segmentation', 'briaai/RMBG-1.4')
        }
        if (!remover) { return; }

        const output = await remover(dataUrl);
        const result = await (output[0].toCanvas() as OffscreenCanvas).convertToBlob({ type: 'image/png' });

        const newImage = await fabric.FabricImage.fromURL(URL.createObjectURL(result));

        console.log(canvas.backgroundImage?.height);
        console.log(canvas.backgroundImage?.getScaledHeight());

        canvasState.create({
            width: newImage.width,
            height: newImage.height
        }, newImage);

        canvas.backgroundImage = newImage;
        canvas.centerObject(newImage);

        canvas.renderAll()
    }

    onMount(async () => {

        //fabricState.get()?.FabricImage.fromURL(output)

    });
</script>

<div class="w-full h-full">
    <button {onclick} class="w-full p-2 button-general">
        背景を削除する
    </button>
</div>