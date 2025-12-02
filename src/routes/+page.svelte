<script lang="ts">
    import CanvasContainer from "$lib/components/sections/CanvasContainer/CanvasContainer.svelte";
    import Toolbar from "$lib/components/sections/Toolbar/Toolbar.svelte";
</script>

<main class="relative w-full h-full">
    <div class="w-full h-full grid max-lg:grid-rows-[1fr_300px] lg:grid-cols-[400px_1fr]">
        <Toolbar class="order-2 lg:order-1" />
        <CanvasContainer class="order-1 lg:order-2" />
    </div>
</main>