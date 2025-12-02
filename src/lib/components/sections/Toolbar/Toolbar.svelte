<script lang="ts">
    import addLight from "$lib/assets/images/light/add-object.svg";
    import addDark from "$lib/assets/images/dark/add-object.svg";

    import layerLight from "$lib/assets/images/light/features/layers.svg";
    import layerDark from "$lib/assets/images/dark/features/layers.svg";
    import shapesLight from "$lib/assets/images/light/features/shapes.svg";
    import shapesDark from "$lib/assets/images/dark/features/shapes.svg";

    import basicLight from "$lib/assets/images/light/features/basic.svg";
    import basicDark from "$lib/assets/images/dark/features/basic.svg";
    import effectsLight from "$lib/assets/images/light/features/effects.svg";
    import effectsDark from "$lib/assets/images/dark/features/effects.svg";
    import filtersLight from "$lib/assets/images/light/features/filters.svg";
    import filtersDark from "$lib/assets/images/dark/features/filters.svg";

    import { onMount } from "svelte";
    import type { Canvas } from "fabric";

    import { getCanvas } from "$lib/components/sections/CanvasContainer/state.svelte";

    //import AddContent from "./contents/Add.svelte";
    import CanvasContent from "./contents/Canvas.svelte"
    import ObjectsContent from "./contents/Objects.svelte";

    import BasicContent from "./contents/Basic.svelte";
    import EffectsContent from "./contents/Effects.svelte";
    import FiltersContent from "./contents/Filters.svelte";

    import type { Tab } from '$lib/components/ui/TabMenu/TabMenu.svelte';
    import TabMenu from '$lib/components/ui/TabMenu/TabMenu.svelte';
    import Icon from '$lib/components/ui/Icon/Icon.svelte';

    import Number from "$lib/components/ui/Number/Number.svelte";
    import ToggleButton from "$lib/components/ui/ToggleButton/ToggleButton.svelte";

    import AccordionItem from "$lib/components/ui/AccordionItem/AccordionItem.svelte";

    interface Props {
        class?: string;
    }
    const { class: className }: Props = $props();

    let tabs: Record<string, Tab> = {};
    let canvas: Canvas | undefined = undefined;

    // tabs["add"] = {
    //     header: addTab,
    //     content: AddContent
    // };

    // tabs["canvas"] = {
    //     header: canvasTab,
    //     content: CanvasContent
    // }

    tabs["objects"] = {
        header: objectsTab,
        content: ObjectsContent
    }

    tabs["basic"] = {
        header: basicTab,
        content: BasicContent
    };

    // tabs["effects"] = {
    //     header: effectsTab,
    //     content: EffectsContent
    // }

    tabs["filters"] = {
        header: filtersTab,
        content: FiltersContent
    };

    onMount(() => {
        document.addEventListener('canvasInitialized', () => {
            canvas = getCanvas();
        });
    });

</script>

{#snippet tab(name: string, lightSrc: string, darkSrc: string)}
    <div class="flex-col-center">
        <Icon {lightSrc} {darkSrc} width={30} height={30} class="lg:m-2" />
        <p class="text-nowrap text-[9px] lg:text-[11px]">{name}</p>
    </div>
{/snippet}

{#snippet addTab()}
    {@render tab("追加", addLight, addDark)}
{/snippet}

<!-- =======
<<<<<<< Updated upstream:src/lib/components/ui/Toolbar/Toolbar.svelte
        <Icon {lightSrc} {darkSrc} width={30} height={30} class="m-2" />
        <p class="text-[10px]">{name}</p>
    </div>
{/snippet}

        <Icon {lightSrc} {darkSrc} width={30} height={30} class="lg:m-2" />
        <p class="text-[9.5px] lg:text-[11px] text-nowrap">{name}</p>
    </div>
{/snippet} -->

{#snippet canvasTab()}
    {@render tab("キャンバス", layerLight, layerDark)}
{/snippet}

{#snippet objectsTab()}
    {@render tab("オブジェクト", shapesLight, shapesDark)}
{/snippet}


<!--* 基本編集タブ -->
{#snippet basicTab()}
    {@render tab("基本編集", basicLight, basicDark)}
{/snippet}

<!--* エフェクトタブ -->
{#snippet effectsTab()}
    {@render tab("エフェクト", effectsLight, effectsDark)}
{/snippet}

<!--* フィルタータブ -->
{#snippet filtersTab()}
    {@render tab("フィルター", filtersLight, filtersDark)}
{/snippet}

<TabMenu {tabs} class={[className, "grid max-lg:grid-rows-[1fr_70px] lg:grid-cols-[100px_1fr]"]} tabClass="order-2 lg:order-1 flex lg:flex-col p-2 shadow-black shadow-[0_0_10px_0_rgba(0,0,0,0)]" tabItemClass="w-14 h-14 lg:w-18 lg:h-18 p-1 lg:p-2 mx-2 lg:m-2 button-general" activeTabItemClass="scale-110 bg-turn-on/40 shadow-lg/50" contentClass="overflow-auto w-full order-1 lg:order-2" activeTabId="add" />
