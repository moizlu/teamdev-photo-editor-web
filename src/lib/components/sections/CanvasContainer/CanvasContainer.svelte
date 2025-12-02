<script lang="ts">
    import type fabric from 'fabric';
    import type { Canvas as FabricCanvas } from 'fabric';

    import uploadLight from "$lib/assets/images/light/upload.svg";
    import uploadDark from "$lib/assets/images/dark/upload.svg";
    import undoLight from "$lib/assets/images/light/undo.svg";
    import undoDark from "$lib/assets/images/dark/undo.svg";

    import { fade } from "svelte/transition";

    import type { ClassValue } from "svelte/elements";
    import { onMount } from "svelte";

    import { initCanvas, getCanvas } from "./state.svelte.ts";
    import Icon from '$lib/components/ui/Icon/Icon.svelte';
    import Canvas from './Canvas.svelte';

    import UndoButton from './UndoButton.svelte';

    interface Props {
        class?: ClassValue;
    }
    const { class: className }: Props = $props();

    let canvasElement: HTMLCanvasElement | undefined = $state(undefined);
    let uploadButton: HTMLInputElement | undefined = $state(undefined);
    let container: HTMLDivElement | undefined = $state(undefined);

    let canvas: FabricCanvas | undefined = undefined;

    let objectCount = $state(0);

    onMount(() => {
        document.addEventListener('canvasInitialized', () => {
            canvas = getCanvas();

            if (canvas) {
                const updateObjectCount = () => {
                    objectCount = canvas?.getObjects().length ?? 0;
                }

                canvas.on('object:added', updateObjectCount);
                canvas.on('object:removed', updateObjectCount);
            }
        });

        initCanvas(canvasElement);

        uploadButton = document.getElementById("image-upload-input") as (HTMLInputElement | null) ?? undefined;
    });

    const onUploadOverlayClick = () => {
        uploadButton?.click();
    }
</script>

<!-- canvasに直接クラスをつけるとなんかおかしくなる -->
<div bind:this={container} class={[className, "w-full h-full relative overflow-hidden flex-center shadow-black shadow-lg/100"]}>
    <!-- <div class="w-full h-full absolute top-0 left-0 flex-center"> -->
        <Canvas bind:canvasElement={canvasElement} bind:container={container} class="p-2" />
    <!-- </div> -->

    <!-- <UndoButton /> -->

    {#if objectCount == 0}
        <div  class="absolute top-0 left-0 w-full h-full bg-base flex-center">
            <button type="button" onclick={onUploadOverlayClick} class="group w-50 h-50 lg:w-100 lg:h-100 flex-col-center gap-10 button-general rounded-xl bg-turn-on/20 hover:bg-turn-on/30 active:bg-turn-on/50">
                <div class="transition-all duration-200 group-hover:-translate-y-2.5 group-active:-translate-y-5 lg:group-hover:-translate-y-5 lg:group-active:-translate-y-10">
                    <Icon lightSrc={uploadLight} darkSrc={uploadDark} width={100} height={100} />
                </div>
                <p class="text-sm lg:text-3xl">画像を追加してください。</p>
            </button>
        </div>
    {/if}
</div>