<script lang="ts">
  import type { Snippet } from "svelte";
    import type { ClassValue } from "svelte/elements";

    export interface IconProps {
        size?: number;
        class?: ClassValue;
    }

    interface Props extends IconProps {
        children: Snippet;
    }
    const { children, size, class: className }: Props = $props();
</script>

<svg xmlns="http://www.w3.org/2000/svg" height={size} viewBox="0 -960 960 960" width={size} class={className}>
    {@render children()}
</svg>