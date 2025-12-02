<script lang="ts">
    import type { Snippet } from "svelte";
    import type { HTMLInputAttributes } from "svelte/elements";

    interface Props extends HTMLInputAttributes {
        children?: Snippet;
    }
    let { checked = $bindable(), children, class: className, ...props }: Props = $props();

    const onkeydown = (event: KeyboardEvent) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            checked = !checked;
        }
    }
</script>

<label class={[className, "cursor-pointer"]}>
    <input type="checkbox" bind:checked={checked} class="sr-only peer" {...props}>
    <div role="checkbox" aria-checked={checked} tabindex="0" {onkeydown} class="relative w-16 h-8 m-1 transition-all duration-200 rounded-full inset-shadow-black inset-shadow-sm/100 bg-label/10 peer-checked:bg-turn-on after:content-[''] after:absolute after:w-5 after:h-5 after:top-[5px] after:left-[3px] after:shadow-black after:shadow-md/100 after:transition-all after:duration-200 after:bg-base-light after:rounded-full  peer-hover:after:translate-x-8 not-peer-checked:peer-hover:after:translate-x-1 peer-checked:after:translate-x-9"></div>
    {@render children?.()}
</label>
