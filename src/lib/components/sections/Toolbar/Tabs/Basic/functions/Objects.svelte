<script lang="ts">
    import LayersIcon from "$lib/assets/icons/layers.svelte";
    import ReloadIcon from "$lib/assets/icons/reload.svelte";
    import VisibilityOnIcon from "$lib/assets/icons/visibility-on.svelte";
    import VisibilityOffIcon from "$lib/assets/icons/visibility-off.svelte";
    import DeleteIcon from "$lib/assets/icons/delete.svelte";

    import type { FabricObject } from "fabric";
    import { onMount } from "svelte";

    import { canvasState, fabricState } from "$lib/state";
    import AccordionMenu from "$lib/components/ui/AccordionMenu";
    import SvgIcon from "$lib/components/ui/SvgIcon/SvgIcon.svelte";

    let objects: FabricObject[] | undefined = $state(undefined);

    const updateObjects = () => {
        const canvas = canvasState.get();
        if (!canvas) { return; }

        objects = canvas.getObjects();
    }

    const onRowClicked = (obj: FabricObject) => {
        return () => {
            const canvas = canvasState.get();
            if (!canvas) { return; }
            canvas.setActiveObject(obj);
            canvas?.bringObjectToFront(obj);

            updateObjects();
        };
    }

    const onVisibilityToggle = (obj: FabricObject) => {
        return (e: MouseEvent) => {
            e.stopImmediatePropagation();
            obj.visible = !obj.visible;
            canvasState.get()?.renderAll();

            updateObjects();
            objects = objects;
        };
    }

    const onDeleteObject = (obj: FabricObject) => {
        return (e: MouseEvent) => {
            e.stopImmediatePropagation();
            canvasState.get()?.remove(obj);

            updateObjects();
        };
    }

    onMount(() => {
        const canvas = canvasState.get();
        if (!canvas) { return; }
        canvas.on('object:added', updateObjects);
        canvas.on('object:removed', updateObjects);

        return () => {
            const canvas = canvasState.get();
            if (!canvas) { return; }
            canvas.off('object:added', updateObjects);
            canvas.off('object:removed', updateObjects);
        }
    });
</script>

<AccordionMenu title="オブジェクト一覧" icon={LayersIcon} displayApply={false}>
    <button onclick={updateObjects} class="p-2 flex-center button-general gap-1">
        <SvgIcon Svg={ReloadIcon} size={30} />
        <p>最新の状態に更新</p>
    </button>
    <div class="m-2 p-2 w-full h-100 inset-shadow-black inset-shadow-sm/100 rounded-xl overflow-y-scroll flex flex-col justify-start items-stretch gap-2">
        {#key objects}
        {#if objects?.length === 0}
            <p class="h-full flex-center text-center">オブジェクトなし</p>
        {:else}
            {#each objects as obj}
                {#if !(obj as any).croppingRect}
                    <div role="button" tabindex="0" onkeydown={(e) => (e.target as HTMLDivElement).click()} onclick={onRowClicked(obj)} class="p-2 py-3 w-full flex gap-2 button-general rounded-xl">
                        <img src={obj.toDataURL()} alt={obj.type} width={30} height={30} class="w-7.5 h-7.5" >
                        <p class="flex-1">{obj.type}</p>
                        <button onclick={onVisibilityToggle(obj)} class="cursor-pointer">
                            {#if obj.visible}
                                <SvgIcon Svg={VisibilityOnIcon} size={30} />
                            {:else}
                                <SvgIcon Svg={VisibilityOffIcon} size={30} />
                            {/if}
                        </button>
                        <button onclick={onDeleteObject(obj)} class="cursor-pointer">
                            <SvgIcon Svg={DeleteIcon} size={30} />
                        </button>
                    </div>
                {:else}
                    <p class="h-full flex-center text-center">オブジェクトなし</p>
                {/if}
            {/each}
        {/if}
        {/key}
    </div>
</AccordionMenu>
