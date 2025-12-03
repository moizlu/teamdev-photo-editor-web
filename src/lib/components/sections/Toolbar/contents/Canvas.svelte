<script lang="ts">
    import { onMount } from "svelte";
    import { getCanvas, logicSize } from "../../CanvasContainer/state.svelte";

    import AccordionItem from "$lib/components/ui/AccordionItem/AccordionItem.svelte";

    let width = $state(1920);
    let height = $state(1080);

    onMount(() => {
        document.addEventListener('canvasInitialized', () => {
            const canvas = getCanvas();
            if (!canvas) { return; }
        });
    })

    const onchange = (event: Event) => {
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
    };
</script>
{#snippet createCanvasHeader()}
    <p>キャンバスの解像度を変更</p>
{/snippet}
<AccordionItem header={createCanvasHeader} class="mx-2" >
    <div class="m-2 flex flex-col justify-start">
        <div class="flex justify-start items-center">
            <p class="ml-1">高さ</p>
            <input type="number" {onchange} bind:value={width} min="1" step="1">
            <p class="mr-1">px</p>
        </div>
        <div class="flex justify-start items-center">
            <p class="ml-1">　幅</p>
            <input type="number" {onchange} bind:value={height} min="1" step="1">
            <p class="mr-1">px</p>
        </div>
    </div>
    <button type="button" title="適用" onclick={onCreateCanvasClicked} class="w-full p-4 -mx-2 flex-center button-general">
        <p>適用</p>
    </button>
</AccordionItem>