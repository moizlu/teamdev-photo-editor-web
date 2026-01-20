<script lang="ts">
    import { browser } from "$app/environment";
    import { onMount } from "svelte";

    import type { HTMLCanvasAttributes } from "svelte/elements";

    import { canvasState, originalSize } from "$lib/state";

    interface Props extends Omit<HTMLCanvasAttributes, 'id'> {}
    const { class: className, ...props }: Props = $props();

    let canvasElement: HTMLCanvasElement | undefined = $state(undefined);
    let resizeDebounceTimer: NodeJS.Timeout | undefined = undefined;

    const resizeCanvas = () => {
        if (!browser) { return; }
        if (!canvasState.get() || !canvasState.container || !canvasElement) { return; }

        clearTimeout(resizeDebounceTimer);
        resizeDebounceTimer = setTimeout(() => {
            const canvas = canvasState.get();
            if (!canvas || !canvasState.container || !canvasElement) { return; }

            const containerWidth = (canvasState.container?.clientWidth ?? 20) - 20;
            const containerHeight = (canvasState.container?.clientHeight ?? 20) - 20;

            const scale = Math.min(
                containerWidth / originalSize.width,
                containerHeight / originalSize.height,
                // 1
            );

            canvas.setZoom(scale);
            canvas.requestRenderAll();
            canvas.setDimensions({
                width: originalSize.width * scale,
                height: originalSize.height * scale
            });

            canvas.setZoom(scale);
            canvas.renderAll();
        }, 100);
    };

    onMount(() => {
        resizeCanvas();

        document.addEventListener('initialized', resizeCanvas);
        document.addEventListener('canvasCreated', resizeCanvas);
        window.addEventListener('resize', resizeCanvas);

        return () => {
            document.removeEventListener('initialized', resizeCanvas);
            document.removeEventListener('canvasCreated', resizeCanvas);
            window.removeEventListener('resize', resizeCanvas);
        };
    });
</script>

<div class="w-full h-full absolute top-0 left-0 flex-center">
    <canvas bind:this={canvasElement} id="main-canvas" class={[className, "shadow-black shadow-md/100"]} {...props}></canvas>
</div>
