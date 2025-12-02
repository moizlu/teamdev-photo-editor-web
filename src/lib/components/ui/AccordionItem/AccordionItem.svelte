<script lang="ts">
    import arrowLight from "$lib/assets/images/light/arrow.svg";
    import arrowDark from "$lib/assets/images/dark/arrow.svg";

    import type { Snippet } from "svelte";
    import { slide } from "svelte/transition";
    import type { HTMLAttributes } from "svelte/elements";

    import Icon from "$lib/components/ui/Icon/Icon.svelte";
    import Help from "../HelpButton/HelpButton.svelte";

    interface Props extends HTMLAttributes<HTMLDivElement> {
        header: Snippet;
        children: Snippet;
        tooltip?: Snippet | string;
    }
    const { header, children, tooltip, class: className, ...props }: Props = $props();

    let isOpened = $state(false);
</script>

<div class={[className, ""]} {...props}>
    <button onclick={() => isOpened = !isOpened} aria-expanded={isOpened} class="group w-full flex justify-between mt-2 p-2 button-general">
        {@render header()}
        <div class="flex-center">
            {#if tooltip}
                <Help children={tooltip} />
            {/if}
            <Icon lightSrc={arrowLight} darkSrc={arrowDark} width={20} height={20} class={["transition-all duration-200 p-1", (isOpened) ? "group-hover:translate-y-0.5 group-active:translate-y-0" : "-rotate-180 group-hover:-translate-y-0.5 group-active:translate-y-0"]} />
        </div>
    </button>
    {#if isOpened}
        <div class="mx-2 w-full" transition:slide={{duration: 400}}>
            {@render children()}
        </div>
    {/if}
</div>