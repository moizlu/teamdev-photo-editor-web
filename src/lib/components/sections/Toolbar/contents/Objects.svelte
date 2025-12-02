<script lang="ts">
    import deleteLight from "$lib/assets/images/light/delete.svg";
    import deleteDark from "$lib/assets/images/dark/delete.svg";
    import visibleLight from "$lib/assets/images/light/visible.svg";
    import visibleDark from "$lib/assets/images/dark/visible.svg";
    import invisibleLight from "$lib/assets/images/light/invisible.svg";
    import invisibleDark from "$lib/assets/images/dark/invisible.svg";
    import touchLight from "$lib/assets/images/light/hand.svg";
    import touchDark from "$lib/assets/images/dark/hand.svg";
    import noTouchLight from "$lib/assets/images/light/no-hand.svg";
    import noTouchDark from "$lib/assets/images/dark/no-hand.svg";

    import type { FabricObject } from "fabric";

    import Icon from "$lib/components/ui/Icon/Icon.svelte";

    import { onDestroy, onMount } from "svelte";
    import { getCanvas } from "../../CanvasContainer/state.svelte";

    let activeObject: FabricObject | undefined = $state(undefined);
    let objects: FabricObject[] = $state([]);

    const viewObjects = () => {
        const canvas = getCanvas();
        if (!canvas) { return; }

        objects = canvas.getObjects();
    };

    const updateObjects = () => {
        const canvas = getCanvas();
        if (!canvas) { return; }
        objects = canvas.getObjects();
    };

    onMount(() => {
        document.addEventListener('canvasInitialized', () => {
            const canvas = getCanvas();
            if (!canvas) { return; }

            canvas.on('object:added', updateObjects);
            // canvas.on('object:modified', updateObjects);
            canvas.on('object:removed', updateObjects);
            canvas.on('selection:updated', () => activeObject = canvas.getActiveObject());

            updateObjects();
        });
    });

    const onButtonClicked = (obj: FabricObject) => {
        return () => {
            const canvas = getCanvas();
            if (!canvas) { return; }
            canvas.setActiveObject(obj);
            canvas.bringObjectToFront(obj);
            activeObject = obj;
        }
    }

    const onButtonKeydown = (event: KeyboardEvent) => {
        if (event.key === 'Enter') {
            (event.target as HTMLDivElement)?.click();
        }
    }

    const onVisibilityChangeButtonClicked = (obj: FabricObject) => {
        return (event: MouseEvent) => {
            event.stopPropagation();

            const canvas = getCanvas();
            if (!canvas) { return; }

            obj.visible = !obj.visible;
            canvas.renderAll();
            objects = objects;

            updateObjects();
        };
    };

    // const onSelectableChangeButton = (obj: FabricObject) => {
    //     return (event: MouseEvent) => {
    //         event.stopPropagation();

    //         const canvas = getCanvas();
    //         if (!canvas) { return; }

    //         obj.selectable = !obj.selectable;
    //         canvas.renderAll();
    //         objects = objects;

    //         updateObjects();
    //     };
    // };

    const onDeleteButtonClicked = (obj: FabricObject) => {
        return (event: MouseEvent) => {
            event.stopPropagation();

            const canvas = getCanvas();
            if (!canvas) { return; }
            canvas.remove(obj);
        }
    };


    const getObjDataUrl = (obj: FabricObject) => {
        const canvas = getCanvas();
        if (!canvas) { return; }

        const visible = obj.visible;
        obj.visible = true;
        const url = obj.toDataURL();
        obj.visible = visible;

        return url;
    }
</script>

<div class="m-2 flex flex-col justify-start">
    {#key activeObject}
    {#key objects}
        <div class="h-100 rounded-xl inset-shadow-sm/100 inset-shadow-black overflow-y-scroll">
                {#each objects as obj}
                    <div role="button" tabindex="0" onkeydown={onButtonKeydown} onclick={onButtonClicked(obj)} class={["m-1 p-2 h-15 button-general", (getCanvas()?.getActiveObject() === obj) ? "bg-turn-on/30" : ""]}>
                        <div class="flex justify-between items-center">
                            <div class="flex-center">
                                <img src={getObjDataUrl(obj)} alt="サムネイル" width={20} height={20} class="w-[30px] h-[30px] m-2 border-label border">
                                <p>{obj.type}</p>
                            </div>

                            <div class="flex-center gap-2">
                                <!-- <button type="button" title="selectable" onclick={onSelectableChangeButton(obj)}>
                                    {#if obj.selectable}
                                        <Icon lightSrc={touchLight} darkSrc={touchDark} />
                                    {:else}
                                        <Icon lightSrc={noTouchLight} darkSrc={noTouchDark} />
                                    {/if}
                                </button> -->

                                <button type="button" title="visibility" onclick={onVisibilityChangeButtonClicked(obj)}>
                                    {#if obj.visible}
                                        <Icon lightSrc={visibleLight} darkSrc={visibleDark} />
                                    {:else}
                                        <Icon lightSrc={invisibleLight} darkSrc={invisibleDark} />
                                    {/if}
                                </button>

                                <button type="button" title="delete" onclick={onDeleteButtonClicked(obj)}>
                                    <Icon lightSrc={deleteLight} darkSrc={deleteDark} />
                                </button>
                            </div>
                        </div>
                    </div>
                {/each}

        </div>
        <!-- {#if objects.length === 1}
            <input type="number" value={objects[0].getRelativeX()}>
        {:else if activeObject}
            <input type="number" value={activeObject.getRelativeX()}>
        {/if} -->

    {/key}
    {/key}
</div>

