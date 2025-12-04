<script lang="ts">
    import { getCanvas, setCanvasCreated } from "../../CanvasContainer/state.svelte";
    import { logicSize } from "../../CanvasContainer/state.svelte";

    import AccordionItem from "$lib/components/ui/AccordionItem/AccordionItem.svelte";
  import { onMount } from "svelte";

    let isCreateCanvasDialogOpened = $state(false);

    let width = $state(logicSize.width);
    let height = $state(logicSize.height);

    const validationInput = (event: Event) => {
        if (!event.target) { return; }

        const value = (event.target as HTMLInputElement).value;
        if (!value) {
            (event.target as HTMLInputElement).value = "1";
        }
    };

    const onCreateCanvasClicked = () => {
        const canvas = getCanvas();
        if (!canvas) { return; }

        logicSize.width = width;
        logicSize.height = height;
        canvas.setDimensions({
            width: width,
            height: height
        });

        setCanvasCreated(true);
    };

    onMount(() => {
        document.addEventListener('canvasCreated', () => {
            width = logicSize.width;
            height = logicSize.height;
        });
    })
</script>

{#snippet createCanvasHeader()}
    <p>キャンバスサイズ変更</p>
{/snippet}

<div class="m-2 flex flex-col justify-start">
    <AccordionItem header={createCanvasHeader}>
        <div class="m-2 flex flex-col justify-start">
            <div class="flex justify-start items-center">
                <p class="m-2">　幅</p>
                <input type="number" onchange={validationInput} bind:value={width} min="1" step="1" class="w-30">
                <p class="m-2">px</p>
            </div>
            <div class="flex justify-start items-center">
                <p class="m-2">高さ</p>
                <input type="number" onchange={validationInput} bind:value={height} min="1" step="1" class="w-30">
                <p class="m-2">px</p>
            </div>

            <button onclick={onCreateCanvasClicked} class="button-general m-5 px-10 py-2 text-base-light">
                <p>適用</p>
            </button>
        </div>
    </AccordionItem>
</div>
