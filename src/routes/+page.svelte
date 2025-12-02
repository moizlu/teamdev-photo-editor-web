<script lang="ts">
    import CanvasContainer from "$lib/components/ui/CanvasContainer/CanvasContainer.svelte";
    import Toolbar from "$lib/components/ui/Toolbar/Toolbar.svelte";
    import Layers from "$lib/components/ui/Layers/Layers.svelte";

    import AccordionItem from "$lib/components/ui/AccordionItem/AccordionItem.svelte";
    import Tooltip from "$lib/components/ui/Tooltip/Tooltip.svelte";

    import ToggleButton from "$lib/components/ui/ToggleButton/ToggleButton.svelte";
    import Slider from "$lib/components/ui/Slider/Slider.svelte";
    import Number from "$lib/components/ui/Number/Number.svelte";

    import TabMenu from "$lib/components/ui/TabMenu/TabMenu.svelte";
    import type { Tab } from "$lib/components/ui/TabMenu/TabMenu.svelte";
</script>

<main class="relative w-full h-full">
    <div class="w-full h-full grid max-lg:grid-rows-[1fr_300px] lg:grid-cols-[400px_1fr]">
        <Toolbar class="order-2 lg:order-1" />
        <CanvasContainer class="order-1 lg:order-2" />
    </div>
</main>