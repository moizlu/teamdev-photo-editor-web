<script lang="ts">
    import type { ClassValue } from "svelte/elements";

    import { canvasState } from "$lib/state";

    import { isMenuOpened } from "$lib/components/ui/AccordionMenu";

    import Labels from "./Label.svelte";
    import Contents from "./Contents.svelte";

    interface Props {
        class?: ClassValue;
    }
    const { class: className }: Props = $props();
</script>


<!-- モバイル環境でツールのモーダルを閉じる時に急にラベルを表示するとレイアウトがガクガクするためアニメーションで誤魔化す -->
{#if canvasState.isCreated()}
    <div class={[className, "transition-all duration-200 w-full h-full grid lg:grid-cols-[80px_1fr]", (isMenuOpened.get()) ? "max-lg:grid-rows-[1fr_0]" : "max-lg:grid-rows-[1fr_80px]"]}>
        <Labels class={["order-2 lg:order-1 shadow-black lg:shadow-md/100", (isMenuOpened.get()) && "max-lg:hidden"]} />
        <Contents class="order-1 lg:order-2 shadow-black max-lg:shadow-sm/100" />
    </div>
{:else}
    <div class={[className, "z-1 w-full h-full shadow-black shadow-md"]}></div>
{/if}
