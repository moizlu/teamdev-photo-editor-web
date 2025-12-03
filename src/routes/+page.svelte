<script lang="ts">
    import uploadLight from "$lib/assets/images/light/upload.svg";
    import uploadDark from "$lib/assets/images/dark/upload.svg";

    import { onMount } from "svelte";

    import { getCanvas } from "$lib/components/sections/CanvasContainer/state.svelte";

    import Icon from "$lib/components/ui/Icon/Icon.svelte";

    import CanvasContainer from "$lib/components/sections/CanvasContainer/CanvasContainer.svelte";
    import Toolbar from "$lib/components/sections/Toolbar/Toolbar.svelte";

    let canEdit = $state(false);

    onMount(() => {
        document.addEventListener('canvasInitialized', () => {
            const canvas = getCanvas();

            if (canvas) {
                const updateObjectCount = () => {
                    canEdit = (canvas?.getObjects().length ?? 0) !== 0;
                }

                canvas.on('object:added', updateObjectCount);
                canvas.on('object:removed', updateObjectCount);
            }
        });
    });

    const onUploadOverlayClick = () => {
        document.getElementById("image-upload-input")?.click();
    }
</script>

<main class="relative w-full h-full">
    <div class="w-full h-full grid max-lg:grid-rows-[1fr_300px] lg:grid-cols-[400px_1fr]">
        <Toolbar class="order-2 lg:order-1" />
        <CanvasContainer class="order-1 lg:order-2" />
    </div>
</main>
