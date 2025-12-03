<script lang="ts">
    import deleteLight from "$lib/assets/images/light/delete.svg";
    import deleteDark from "$lib/assets/images/dark/delete.svg";
    import visibleLight from "$lib/assets/images/light/visible.svg";
    import visibleDark from "$lib/assets/images/dark/visible.svg";
    import invisibleLight from "$lib/assets/images/light/invisible.svg";
    import invisibleDark from "$lib/assets/images/dark/invisible.svg";
    import refreshLight from "$lib/assets/images/light/refresh.svg";
    import refreshDark from "$lib/assets/images/dark/refresh.svg";
    import plusLight from "$lib/assets/images/light/plus.svg";
    import plusDark from "$lib/assets/images/dark/plus.svg";

    import type { FabricObject } from "fabric";

    import Icon from "$lib/components/ui/Icon/Icon.svelte";

    import { onDestroy, onMount } from "svelte";
    import { getCanvas, getFabric } from "../../CanvasContainer/state.svelte";

    import AccordionItem from "$lib/components/ui/AccordionItem/AccordionItem.svelte";

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

        if (objects.length === 1) {
            canvas.setActiveObject(objects[0]);
            activeObject = canvas.getActiveObject();
        }
    };

    onMount(() => {
        document.addEventListener('canvasInitialized', () => {
            const canvas = getCanvas();
            if (!canvas) { return; }

            canvas.on('object:added', updateObjects);
            canvas.on('object:modified', updateObjects);
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
            canvas.renderAll();
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

            updateObjects();
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
    };


    const onAddRectClicked = () => {
        const fabric = getFabric();
        const canvas = getCanvas();
        if (!fabric || !canvas) { return; }

        const rect = new fabric.Rect({
            width: 100,
            height: 100,
            fill: "#FF0000"
        });
        canvas.add(rect);
        canvas.centerObject(rect);
        canvas.setActiveObject(rect);
        canvas.renderAll();

        updateObjects();
    };
</script>

<div class="m-2 flex flex-col justify-start">
    <div class="flex-center">
        <p class="m-2 text-xl">オブジェクト一覧</p>
        <button type="button" title="再読み込み" onclick={updateObjects} class="group button-general m-2">
            <Icon lightSrc={refreshLight} darkSrc={refreshDark} width={40} height={40} class="transition-all duration-300 group-hover:rotate-22 group-active:rotate-90" />
        </button>
    </div>
    {#key activeObject}
    {#key objects}
        <div class="h-100 rounded-xl inset-shadow-sm/100 inset-shadow-black overflow-y-scroll">
                {#if objects.length === 0}
                    <div class="w-full h-full flex-center">
                        <p class="text-xl">オブジェクトなし</p>
                    </div>
                {/if}
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

                                <button type="button" title="visibility" onclick={onVisibilityChangeButtonClicked(obj)} class="transition-all duration-200 hover:scale-110 active:scale-120">
                                    {#if obj.visible}
                                        <Icon lightSrc={visibleLight} darkSrc={visibleDark} width={40} height={40} />
                                    {:else}
                                        <Icon lightSrc={invisibleLight} darkSrc={invisibleDark} width={40} height={40}  />
                                    {/if}
                                </button>

                                <button type="button" title="delete" onclick={onDeleteButtonClicked(obj)} class="transition-all duration-200 hover:scale-110 active:scale-120">
                                    <Icon lightSrc={deleteLight} darkSrc={deleteDark} width={40} height={40} />
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
    <p class="m-2 text-sm">アクティブにならない時は<br>選択し直してみてください</p>

    {#snippet addMenuHeader()}
        <div class="flex">
            <Icon lightSrc={plusLight} darkSrc={plusDark} />
            <p>オブジェクトを追加</p>
        </div>
    {/snippet}
    <AccordionItem header={addMenuHeader}>
        <button type="button" title="四角形を追加" onclick={onAddRectClicked} class="w-full my-2 p-2 button-general">
            <p>四角形を追加</p>
        </button>
    </AccordionItem>

    {#key activeObject}
        {#if activeObject}
            {typeof activeObject.fill}
        {/if}
    {/key}
</div>

