<script lang="ts">
    import type { ClassValue } from "svelte/elements";

    import CloseIcon from "$lib/assets/icons/close.svelte";

    import { canvasState } from "$lib/state";
    import { dialog } from "$lib/components/ui/Dialog";
    import StartGuideOverlay from "./StartGuideOverlay.svelte";

    import Canvas from "./Canvas.svelte";
    import SvgIcon from "$lib/components/ui/SvgIcon/SvgIcon.svelte";

    interface Props {
        class?: ClassValue;
    }
    const { class: className }: Props = $props();

    let canvasWidth = $state(1920);
    let canvasHeight = $state(1080);

    const onCanvasCreateButtonClicked = () => {
        canvasState.create({ width: canvasWidth, height: canvasHeight });
        dialog.deactivate();
    };
</script>

{#snippet createCanvasDialog()}
    <div class="relative flex-col-center">
        <h1 class="text-xl mt-3 mb-5">キャンバスを作成</h1>
        <div class="w-full flex-center gap-2">
            <p>幅　</p>
            <input type="number" bind:value={canvasWidth} class="w-20">
            <p>px</p>
        </div>
        <div class="w-full flex-center gap-2">
            <p>高さ</p>
            <input type="number" bind:value={canvasHeight} class="w-20">
            <p>px</p>
        </div>

        <button type="button" onclick={onCanvasCreateButtonClicked} class="button-general m-2 py-2 px-5">
            <p>作成</p>
        </button>

        <button type="button" onclick={() => dialog.deactivate()} class="absolute top-0 right-0 cursor-pointer">
            <SvgIcon Svg={CloseIcon} size={50} />
        </button>
    </div>
{/snippet}

<StartGuideOverlay />

<div id="main-canvas-container" class={[className, "relative w-full h-full overflow-hidden flex-center"]}>
    <Canvas />
</div>
