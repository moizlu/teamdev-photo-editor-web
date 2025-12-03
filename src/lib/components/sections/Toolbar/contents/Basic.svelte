<script lang="ts">
    import arrowBothLight from "$lib/assets/images/light/arrow-both.svg";
    import arrowBothDark from "$lib/assets/images/dark/arrow-both.svg";

    import { onMount } from "svelte";
    import { Canvas, FabricImage } from "fabric";

    import Icon from "$lib/components/ui/Icon/Icon.svelte";

    import { getCanvas } from "../../CanvasContainer/state.svelte";

    import ToggleButton from "$lib/components/ui/ToggleButton/ToggleButton.svelte";

    const onFlipHorizontal = () => {
        const canvas = getCanvas();
        if (!canvas) { return; }
        let obj = canvas.getActiveObject();
        if (!obj) {
            let objects = canvas.getObjects();
            if (objects.length === 1) {
                obj = objects[1];
            } else {
                return;
            }
        }

        obj.flipX = !obj.flipX;

        canvas.renderAll();
    };

    const onFlipVertical = () => {
        const canvas = getCanvas();
        if (!canvas) { return; }
        let obj = canvas.getActiveObject();
        if (!obj) {
            let objects = canvas.getObjects();
            if (objects.length === 1) {
                obj = objects[1];
            } else {
                return;
            }
        }

        obj.flipY = !obj.flipY;

        canvas.renderAll();
    };

</script>

<div class="m-2 flex flex-col justify-start">
    <button type="button" title="水平に反転" onclick={onFlipHorizontal} class="m-2 py-2 button-general flex justify-start items-center">
        <Icon lightSrc={arrowBothLight} darkSrc={arrowBothDark} class="rotate-90 m-2" />
        <p>水平方向に反転</p>
    </button>
    <button type="button" title="水平に反転" onclick={onFlipVertical} class="m-2 py-2 button-general flex justify-start items-center">
        <Icon lightSrc={arrowBothLight} darkSrc={arrowBothDark} class="m-2" />
        <p>垂直方向に反転</p>
    </button>
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
