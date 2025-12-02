<script lang="ts">
    const DURATION_MS = 800;

    import { onMount, type Snippet } from "svelte";
    import { fade } from "svelte/transition";
    import type { HTMLAttributes } from "svelte/elements";

    interface Props extends Omit<HTMLAttributes<HTMLDivElement>, 'children'> {
        stopPropagation?: boolean;
        tooltipContent: Snippet | string;
        children: Snippet;

    }
    const { stopPropagation = true, tooltipContent, children, class: className, ...props }: Props = $props();

    let canHoverQuery: MediaQueryList | undefined = undefined;

    let isVisible = $state(false);

    let hoverTimerId: NodeJS.Timeout | undefined = $state(undefined);
    let button: HTMLDivElement | undefined = $state(undefined);

    const clearTImer = () => {
        clearTimeout(hoverTimerId);
        hoverTimerId = undefined;
    }

    const onclick = (event: MouseEvent) => {
        if (stopPropagation) { event.stopPropagation(); }

        isVisible = !isVisible;
        clearTImer();
        return;
    };

    const onkeydown = (event: KeyboardEvent) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            button?.click();
        }
    };

    const onpointerenter = (event: MouseEvent) => {
        if (stopPropagation) { event.stopPropagation(); }
        if (isVisible || hoverTimerId || !canHoverQuery?.matches) { return; }

        hoverTimerId = setTimeout(() => {
            isVisible = true;
            hoverTimerId = undefined;
        }, DURATION_MS);
    };
    const onpointerleave = (event: MouseEvent) => {
        if (stopPropagation) { event.stopPropagation(); }
        if (!canHoverQuery?.matches) { return; }

        isVisible = false;
        clearTImer();
    };

    onMount(() => {
        canHoverQuery = window.matchMedia('(any-hover: hover)');

        document.addEventListener('pointerdown', (event) => {
            if (!button?.contains(event.target as HTMLElement)) {
                isVisible = false;
                clearTImer();
            }
        });
    });
</script>

<div class={[className, "relative"]} {...props}>
    <div role="button" tabindex="0" bind:this={button} {onclick} {onkeydown} {onpointerenter} {onpointerleave}>
        {@render children()}
    </div>

    {#if isVisible}
        <div class="absolute pointer-events-none mt-2 bg-base text-label border-label border rounded-sm p-1 drop-shadow-md/75 drop-shadow-text whitespace-nowrap" transition:fade={{duration: 150}}>
            {#if typeof tooltipContent == 'string'}
                <p>{tooltipContent}</p>
            {:else}
                {@render tooltipContent()}
            {/if}
        </div>
    {/if}
</div>
