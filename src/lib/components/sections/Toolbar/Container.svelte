<script lang="ts">
    import type { ClassValue } from "svelte/elements";

    import { canvasState } from "$lib/state";

    import Labels from "./Label.svelte";
    import Contents from "./Contents.svelte";

    interface Props {
        class?: ClassValue;
    }
    const { class: className }: Props = $props();
</script>

{#if canvasState.isCreated()}
    <div class={[className, "w-full h-full grid max-lg:grid-rows-[1fr_80px] lg:grid-cols-[80px_1fr]"]}>
        <Labels class="order-2 lg:order-1 shadow-black lg:shadow-md/100" />
        <Contents class="order-1 lg:order-2 shadow-black max-lg:shadow-sm/100" />
    </div>
{:else}
    <div class={[className, "z-1 w-full h-full shadow-black shadow-md"]}></div>
{/if}
