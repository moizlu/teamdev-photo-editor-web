<script lang="ts">
    import CloseIcon from "$lib/assets/icons/close.svelte";
    import CheckIcon from "$lib/assets/icons/check.svelte";
    import ArrowIcon from "$lib/assets/icons/arrow.svelte";

    import { fade } from "svelte/transition";

    import { isMenuOpened } from "./state.svelte";

    import type { Snippet } from "svelte";
    import SvgIcon from "../SvgIcon/SvgIcon.svelte";
    import type { IconType } from "../SvgIcon/SvgIcon.svelte";

    interface Props {
        isOpened?: boolean;
        icon: IconType;
        title: string;
        onApply?: () => void;
        children: Snippet;
    }
    let { isOpened = $bindable(false), icon, title, onApply, children }: Props = $props();

    const onclick = () => {
        isOpened = !isOpened;
    }

    $effect(() => {
        isMenuOpened.set(isOpened);
    });
</script>

<div class="w-30 lg:w-full max-lg:h-30 flex flex-col justify-center items-stretch">
    <button {onclick} class="max-lg:flex-col flex justify-between items-center gap-2 rounded-xl button-general bg-base hover:bg-label/30 active:bg-label/50 mb-3 p-1">
        <SvgIcon Svg={icon} size={70} class="lg:w-7.5 lg:h-7.5" />
        <h1 class="text-xl lg:text-xl">{title}</h1>
        <!-- メニューの矢印 -->
        <SvgIcon Svg={ArrowIcon} size={30} class={["hidden lg:block", (!isOpened) && "rotate-180"]} />
    </button>

    {#if isOpened}
        <div transition:fade={{duration: 200}} class="overflow-x-clip w-full h-full absolute lg:static top-0 left-0 flex flex-col justify-between items-center max-lg:bg-base">
            <div class="flex-center lg:hidden">
                <SvgIcon Svg={icon} size={20} class="lg:w-7.5 lg:h-7.5" />
                <h1 class="text-sm">{title}</h1>
            </div>

            {@render children()}
            <div class="w-full flex justify-stretch items-center gap-2">
                <button onclick={() => isOpened = false} class="lg:hidden flex-1 flex justify-start items-center button-general button-bg-danger">
                    <SvgIcon Svg={CloseIcon} size={40} />
                    <p class="flex-1 text-center">キャンセル</p>
                </button>
                <button onclick={() => { onApply?.(); isOpened = false; }} class="lg:hidden flex-1 flex justify-start items-center button-general button-bg-turn-on">
                    <SvgIcon Svg={CheckIcon} size={40} />
                    <p class="flex-1 text-center">適用</p>
                </button>
            </div>
        </div>
    {/if}
</div>
