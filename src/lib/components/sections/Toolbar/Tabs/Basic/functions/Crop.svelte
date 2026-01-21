<script lang="ts">
    import CropIcon from "$lib/assets/icons/crop.svelte";

    import { onMount } from "svelte";

    import type { Rect } from "fabric";

    import { fabricState, canvasState } from "$lib/state";
    import AccordionMenu from "$lib/components/ui/AccordionMenu";

    let isCropping = $state(false);

    let rect: Rect | undefined;

    const onclick = () => {
        const fabric = fabricState.get();
        const canvas = canvasState.get();
        if (!fabric || !canvas || !rect) { return; }

        isCropping = !isCropping;

        if (isCropping) {
            canvas.add(rect);
            canvas.setActiveObject(rect);
            canvas.centerObject(rect);
            // canvas.renderAll();
        } else {
            canvas.remove(rect);
        }
    }

    onMount(() => {
        const fabric = fabricState.get();
        const canvas = canvasState.get();
        if (!fabric || !canvas) { return; }

        rect = new fabric.Rect({
            top: 0,
            left: 0,
            width: 200,
            height: 200,
            fill: 'rgba(0,0,0,0)',
            stroke: 'red',
            strokeWidth: 3,
            lockRotation: true
        });

        // @ts-ignore
        rect.croppingRect = true;
    })
</script>

<AccordionMenu title="トリミング" icon={CropIcon} displayApply={false}>
    <label class="w-full flex justify-start items-center">
        <input type="checkbox" bind:checked={isCropping} {onclick}>
        <p class="flex-1 text-center">トリミング</p>
    </label>
    <p>赤い四角で囲われた範囲がダウンロード時に出力されます。</p>
</AccordionMenu>
