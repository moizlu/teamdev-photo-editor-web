<script lang="ts">
    import { onMount } from "svelte";
    import { Canvas, FabricImage } from "fabric";

    import cv from "@techstark/opencv-js";

    import { getCanvas } from "../../CanvasContainer/state.svelte";

    import ToggleButton from "../../ToggleButton/ToggleButton.svelte";

    let verticalInvert = $state(false);
    let horizontalInvert = $state(false);

    let canvas: Canvas | undefined = undefined;

    onMount(() => {
        document.addEventListener('canvasInitialized', () => {
            canvas = getCanvas();
        });
    });

    const onChangeHorizontal = () => {
        if (!canvas) { return; }
        let image = canvas.backgroundImage as FabricImage | undefined;
        if (!image) { return; }

        image.flipX = !image.flipX;

        canvas.renderAll();

        console.log("done")
    };

</script>

<div class="m-2 flex flex-col justify-start">
    <ToggleButton bind:checked={horizontalInvert} onclick={onChangeHorizontal} class="flex justify-start items-center">
        <p>水平方向に反転</p>
    </ToggleButton>
    <ToggleButton bind:checked={verticalInvert} class="flex justify-start items-center">
        <p>垂直方向に反転</p>
    </ToggleButton>

</div>

<!-- <script lang="ts">
    import { onMount } from "svelte";
    import type { Canvas } from "fabric";

    import { getCanvas } from "../../CanvasContainer/state.svelte";

    import AccordionItem from "../../AccordionItem/AccordionItem.svelte";
    import Number from "../../Number/Number.svelte";
    import ToggleButton from "../../ToggleButton/ToggleButton.svelte";

    let canvas: Canvas | undefined = undefined;

    let isChanging = $state(false);

    let width = $state(0);
    let height = $state(0);

    let isKeepAspect = $state(true);
    let isFitImage = $state(true);

    const onChangeWidth = () => {
        if (!canvas || isChanging) { return; }
        isChanging = true;

        if (!width) {
            width = 0;
        }

        if (isKeepAspect) {
            const ratio = canvas.getHeight() / canvas.getWidth();

            height = Math.floor(width * ratio);
        }

        canvas.setDimensions({
            width: width,
            height: height
        });

        isChanging = false;
    };

    const onChangeHeight = () => {
        if (!canvas || isChanging) { return; }
        isChanging = true;

        if (!height) {
            height = 0;
        }

        if (isKeepAspect) {
            const ratio = canvas.getWidth() / canvas.getHeight();

            width = Math.floor(height * ratio);
        }

        canvas.setDimensions({
            width: width,
            height: height
        });

        isChanging = false;
    };

    const oninput = (event: Event) => {
        if (!event.target) { return; }
        let value = (event.target as HTMLInputElement).value;

        if (!value) {
            (event.target as HTMLInputElement).value = "0";
        }
    };

    onMount(() => {
        document.addEventListener('canvasInitialized', () => {
            canvas = getCanvas();

            width = canvas?.getWidth() ?? 0;
            height = canvas?.getHeight() ?? 0;
        });

        if (!canvas) { canvas = getCanvas(); }
        width = canvas?.getWidth() ?? 0;
        height = canvas?.getHeight() ?? 0;
    });
</script> -->

<!-- {#snippet header()}
    <p>解像度</p>
{/snippet}
<AccordionItem {header} class="m-2">
    <div class="mt-2 flex flex-col justify-start gap-2">
        <div class="flex gap-2 flex-row items-center lg:flex-col lg:justify-start lg:items-start">
            <p>幅</p>
            <Number bind:value={width} {oninput} onchange={onChangeWidth} min={0} max={2000} step={1} class="w-full" />
            <p>高さ</p>
            <Number bind:value={height} {oninput} onchange={onChangeHeight} min={0} max={2000} step={1} class="w-full" />
        </div>
        <ToggleButton bind:checked={isKeepAspect} class="flex justify-start items-center"><p>アスペクト比を維持する</p></ToggleButton>
        <ToggleButton bind:checked={isFitImage} class="flex justify-start items-center"><p>画像の解像度に合わせる</p></ToggleButton>
    </div>
</AccordionItem> -->
