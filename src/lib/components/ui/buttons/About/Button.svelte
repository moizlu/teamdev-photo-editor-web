<script lang="ts">
    import InfoIcon from "$lib/assets/icons/info.svelte";

    import type { HTMLButtonAttributes } from "svelte/elements";

    import { dialog } from "../../Dialog";
    import SvgIcon from "../../SvgIcon/SvgIcon.svelte";

    import About from "./About.svelte";

    interface Props extends HTMLButtonAttributes {}
    const { class: className, ...props }: Props = $props();

    const onclick = () => {
        dialog.activate({ id: "info", content: infoDialog, isDrawWindow: false })
    };
</script>

{#snippet infoDialog()}
    <About />
{/snippet}

<button type="button" {onclick} class={[className, "group cursor-pointer -m-2"]} {...props}>
    <SvgIcon Svg={InfoIcon} size={32} class="group-hover:scale-110 group-active:scale-120" />
</button>
