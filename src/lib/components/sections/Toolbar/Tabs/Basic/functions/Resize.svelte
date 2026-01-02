<script lang="ts">
    import ResizeIcon from "$lib/assets/icons/resize.svelte";
    import ArrowBothIcon from "$lib/assets/icons/arrow-both.svelte";
    import ZoomOutIcon from "$lib/assets/icons/zoom-out.svelte";
    import CheckIcon from "$lib/assets/icons/check.svelte";

    import { onMount } from "svelte";

    import SvgIcon from "$lib/components/ui/SvgIcon/SvgIcon.svelte";

    import AccordionMenu from "$lib/components/ui/AccordionMenu";
    import { canvasState, originalSize } from "$lib/state";

    type ResizeMethod = "width-height" | "width" | "height" | "scale";

    let width = $state(0);
    let height = $state(0);
    let scale = $state(1.0);

    let method: ResizeMethod = $state("width-height");

    const onchange = () => {
        method = (document.querySelector('input[name="basic:resize-method"]:checked') as HTMLInputElement)?.value as ResizeMethod;
    }

    // TODO: 続きを実装する
    const onApply = () => {
        switch (method) {
            case "width-height":
                originalSize.set({
                    width: width,
                    height: height
                });
        }
    }

    onMount(() => {
        width = originalSize.width;
        height = originalSize.height;
    });
</script>

<AccordionMenu icon={ResizeIcon} title="リサイズ" isOpened={false}>
    <div class="max-lg:flex gap-2">
        <form class="flex-1 w-full h-full flex flex-col gap-0.5 justify-center items-stretch">
            <label class="flex justify-between items-center">
                <input {onchange} type="radio" name="basic:resize-method" value="width-height">
                <SvgIcon Svg={ZoomOutIcon} size={30} class="rotate-45" />
                <p class="w-full flex-1 text-center">両方指定</p>
            </label>
            <label class="flex justify-between items-center">
                <input {onchange} type="radio" name="basic:resize-method" value="width">
                <SvgIcon Svg={ArrowBothIcon} size={30} class="rotate-90" />
                <p class="w-full flex-1 text-center">幅を指定</p>
            </label>
            <label class="flex justify-between items-center">
                <input {onchange} type="radio" name="basic:resize-method" value="height">
                <SvgIcon Svg={ArrowBothIcon} size={30} />
                <p class="w-full flex-1 text-center">高さを指定</p>
            </label>
            <label class="flex justify-between items-center">
                <input {onchange} type="radio" name="basic:resize-method" value="scale">
                <SvgIcon Svg={ZoomOutIcon} size={30} />
                <p class="w-full flex-1 text-center">倍率で指定</p>
            </label>
        </form>

        <div class="flex-1 flex-col-center">
            <div class="w-full flex-col-center gap-2 my-2">
                <div class={["transition-all duration-150 w-full flex-center gap-1", (method === "width-height" || method === "width") ? "opacity-100" : "pointer-events-none absolute opacity-0"]}>
                    <p class="text-nowrap">幅　</p>
                    <input type="number" bind:value={width} class="w-30">
                    <p>px</p>
                </div>
                <div class={["transition-all duration-150 w-full flex-center gap-1", (method === "width-height" || method === "height") ? "opacity-100" : "pointer-events-none absolute opacity-0"]}>
                    <p class="text-nowrap">高さ</p>
                    <input type="number" bind:value={height} class="w-30">
                    <p>px</p>
                </div>
                <div class={["transition-all duration-150 w-full flex-center gap-1", (method === "scale") ? "opacity-100" : "pointer-events-none absolute opacity-0"]}>
                    <p class="text-nowrap">倍率</p>
                    <input type="number" bind:value={scale} class="w-30">
                    <p>倍</p>
                </div>
            </div>

            <button onclick={onApply} class="flex-center button-general button-bg-turn-on p-2">
                <SvgIcon Svg={CheckIcon} size={30} />
                <p>適用</p>
            </button>
        </div>
    </div>
</AccordionMenu>