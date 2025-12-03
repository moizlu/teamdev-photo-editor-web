<script lang="ts">
    import type fabric from 'fabric';
    import type { Canvas as FabricCanvas } from 'fabric';

    import layersLight from "$lib/assets/images/light/features/layers.svg";
    import layersDark from "$lib/assets/images/dark/features/layers.svg";
    import addPhotoLight from "$lib/assets/images/light/add-photo.svg";
    import addPhotoDark from "$lib/assets/images/dark/add-photo.svg";

    import { fade } from "svelte/transition";

    import type { ClassValue } from "svelte/elements";
    import { onMount } from "svelte";

    import { initCanvas, getCanvas, isCanvasCreated } from "./state.svelte.ts";
    import Icon from '$lib/components/ui/Icon/Icon.svelte';
    import Canvas from './Canvas.svelte';
    import CreateCanvasDialog from './CreateCanvasDialog.svelte';

    import UndoButton from './UndoButton.svelte';

    interface Props {
        class?: ClassValue;
    }
    const { class: className }: Props = $props();

    let canvasElement: HTMLCanvasElement | undefined = $state(undefined);
    let container: HTMLDivElement | undefined = $state(undefined);

    let canvas: FabricCanvas | undefined = undefined;

    let isCanvasCreateDialogOpened = $state(false);

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
    });

    const onUploadOverlayClicked = () => {
        document.getElementById("image-upload-input")?.click();
    };

    const onCreateCanvasClicked = () => {
        isCanvasCreateDialogOpened = true;
    };
</script>

<!-- canvasに直接クラスをつけるとなんかおかしくなる -->
<div bind:this={container} class={[className, "w-full h-full relative overflow-hidden flex-center shadow-black shadow-lg/100"]}>
    <!-- <div class="w-full h-full absolute top-0 left-0 flex-center"> -->
        <Canvas bind:canvasElement={canvasElement} bind:container={container} class="p-2" />
    <!-- </div> -->

    <!-- <UndoButton /> -->

    <CreateCanvasDialog bind:isOpened={isCanvasCreateDialogOpened} />

    {#if !isCanvasCreated()}
        <div class="absolute top-0 left-0 w-full h-full bg-base">
            <div class="w-82 h-full mx-auto flex flex-col justify-center itmes-start gap-5">
                <button type="button" title="画像を追加" onclick={onUploadOverlayClicked} class="button-general">
                    <div class="flex-center gap-2">
                        <Icon lightSrc={addPhotoLight} darkSrc={addPhotoDark} width={50} height={50} class="m-1" />
                        <p class="text-3xl">画像を追加　　　</p>
                    </div>
                </button>
                <p class="text-2xl text-center">もしくは</p>
                <button type="button" title="キャンバスを作成" onclick={onCreateCanvasClicked} class="button-general">
                    <div class="flex-center gap-2">
                        <Icon lightSrc={layersLight} darkSrc={layersDark} width={50} height={50} class="m-2" />
                        <p class="text-3xl">キャンバスを作成</p>
                    </div>
                </button>
            </div>
        </div>
    {/if}
</div>