<script lang="ts">
    import type { HTMLAttributes } from "svelte/elements";
    import { onMount, type Snippet } from "svelte";

    import Tooltip from "../Tooltip/Tooltip.svelte";

    import questionLight from "$lib/assets/images/light/question.svg"
    import questionDark from "$lib/assets/images/dark/question.svg"

    import Icon from "$lib/components/ui/Icon/Icon.svelte";

    interface Props extends Omit<HTMLAttributes<HTMLDivElement>, 'width' | 'height' | 'children'> {
        size?: number;
        children: Snippet | string;
    }
    const { size = 20, children, class: className, ...props }: Props = $props();
</script>

{#snippet tooltipContent()}
    {#if typeof children == 'string'}
        <p>{children}</p>
    {:else}
        {@render children()}
    {/if}
{/snippet}

<Tooltip {tooltipContent} >
    <div class="transition-colors duration-300 rounded-full hover:bg-label/25 p-0.5">
        <Icon lightSrc={questionLight} darkSrc={questionDark} width={size} height={size} />
    </div>
</Tooltip>
