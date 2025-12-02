<script lang="ts">
    import { onMount } from "svelte";
    import { getCanvas, logicSize } from "./state.svelte";
    import type { HTMLCanvasAttributes } from "svelte/elements";

    interface Props extends HTMLCanvasAttributes {
        canvasElement: HTMLCanvasElement | undefined;
        container: HTMLDivElement | undefined;
    }
    let { canvasElement = $bindable(), container = $bindable(), class: className, ...props }: Props = $props();

    let resizeTimerId: NodeJS.Timeout | undefined = undefined;

    const resizeCanvas = () => {
        if (!canvasElement || !container) { return; }
        const canvas = getCanvas();
        if (!canvas) { return; }

        clearTimeout(resizeTimerId);
        resizeTimerId = setTimeout(() => {
            let containerWidth = container.clientWidth;
            let containerHeight = container.clientHeight;

            const aspect = logicSize.width / logicSize.height;

            let scale = Math.min(
                containerWidth / logicSize.width,
                containerHeight / logicSize.height,
                1
            );

        canvas.setZoom(scale);
        canvas.requestRenderAll();
            canvas.setDimensions({
                width: logicSize.width * scale,
                height: logicSize.height * scale
            });

            canvas.setZoom(scale);
            canvas.renderAll();
        }, 500);
    };

    onMount(() => {
        document.addEventListener('canvasInitialized', () => {
            const canvas = getCanvas();
            resizeCanvas();
            canvas?.on('object:added', () => {
                resizeCanvas();
            })
        });
        window.addEventListener('resize', resizeCanvas);
    });
</script>

<canvas id="main-canvas" bind:this={canvasElement} class={[className, " shadow-black shadow-lg/50"]} {...props}></canvas>