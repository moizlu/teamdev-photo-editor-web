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
</script>
{#snippet createCanvasHeader()}
    <p>空のキャンバスを作成</p>
{/snippet}
<AccordionItem header={createCanvasHeader} class="mx-2" >
    <div class="m-2 flex flex-col justify-start">
        <div class="flex justify-start items-center">
            <p class="ml-1">高さ</p>
            <input type="number" {onchange} bind:value={width}>
            <p class="mr-1">px</p>
        </div>
        <div class="flex justify-start items-center">
            <p class="ml-1">　幅</p>
            <input type="number" {onchange} bind:value={height}>
            <p class="mr-1">px</p>
        </div>
    </div>
</AccordionItem>