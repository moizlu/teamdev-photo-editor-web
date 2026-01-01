<script lang="ts">
    import Toolbar from "$lib/components/sections/Toolbar";
    import Canvas from "$lib/components/sections/Canvas";
</script>

<main class="w-full h-full grid max-lg:grid-rows-[1fr_250px] lg:grid-cols-[400px_1fr]">
    <Toolbar class="order-2 lg:order-1 shadow-black lg:shadow-md/100" />
    <Canvas class="order-1 lg:order-2 shadow-black max-lg:shadow-sm/100" />
</main>
