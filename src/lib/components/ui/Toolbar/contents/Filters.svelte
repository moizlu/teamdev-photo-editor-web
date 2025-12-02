<script lang="ts">
    import { onMount } from "svelte";
    import { FabricImage, type Canvas } from "fabric";
    import cv from "@techstark/opencv-js";

    import AccordionItem from "../../AccordionItem/AccordionItem.svelte";
    import ToggleButton from "../../ToggleButton/ToggleButton.svelte";
    import Number from "../../Number/Number.svelte";

    import { filters } from "fabric";

    import { getCanvas } from "../../CanvasContainer/state.svelte";

    let canvas: Canvas | undefined = undefined;

    onMount(() => {
        document.addEventListener('canvasInitialized', () => {
            canvas = getCanvas();
        });
    });

    const onFilterChange = () => {
        if (!canvas) { return; }

        console.log("aaaaaaaaaaaaaaa");

        canvas.getObjects().forEach(obj => {
            if (obj.type !== "image") { return; }
            const img: FabricImage = obj as FabricImage;

            img.filters.length = 0;
            img.filters.push(new filters.Brightness({brightness: 1 }));

            img.applyFilters();
            img.setCoords();
            canvas?.renderAll();
        });

        canvas.toObject()
    }
</script>

<!-- {#snippet header()}
    フィルタ
{/snippet}
<AccordionItem header={header} class="m-2 w-70">

</AccordionItem> -->

<div class="m-2 flex flex-col gap-2">
    <p>ぼかし</p>
    <Number />
    <input type="range" class="w-full">

    <p>エッジ抽出</p>
    <Number />
    <input type="range" class="w-full">

    <ToggleButton>
        <p>グレイスケール</p>
    </ToggleButton>
</div>
