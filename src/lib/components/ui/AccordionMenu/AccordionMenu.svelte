<script lang="ts">
    import CloseIcon from "$lib/assets/icons/close.svelte";
    import ArrowIcon from "$lib/assets/icons/arrow.svelte";

    import { slide, fade } from "svelte/transition";

    import type { Snippet } from "svelte";
    import SvgIcon from "../SvgIcon/SvgIcon.svelte";
    import type { IconType } from "../SvgIcon/SvgIcon.svelte";

    interface Props {
        isOpened?: boolean;
        icon: IconType;
        title: string;
        children: Snippet;
    }
    let { isOpened = $bindable(false), icon, title, children }: Props = $props();

    const onclick = () => {
        isOpened = !isOpened;
    }
</script>

<div class="w-30 lg:w-full max-lg:h-30 flex flex-col justify-center items-stretch">
    <button {onclick} class="max-lg:flex-col flex justify-between items-center gap-2 rounded-xl button-general bg-base hover:bg-label/30 active:bg-label/50 mb-3 p-1">
        <SvgIcon Svg={icon} size={70} class="lg:w-7.5 lg:h-7.5" />
        <h1 class="text-xl lg:text-xl">{title}</h1>
        <SvgIcon Svg={ArrowIcon} size={30} class={["hidden lg:block", (!isOpened) && "rotate-180"]} />
    </button>

    {#if isOpened}
        <button transition:fade={{duration: 150}} onclick={() => isOpened = false} class="lg:hidden z-10 absolute top-0 right-0 -m-3">
            <SvgIcon Svg={CloseIcon} size={50} />
        </button>

        <div transition:slide={{duration: 300}} class="overflow-x-clip w-full h-full absolute lg:static top-0 left-0 max-lg:bg-base">
            {@render children()}
        </div>
    {/if}
</div>
