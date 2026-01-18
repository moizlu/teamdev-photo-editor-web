<script lang="ts">
    import ShareIcon from "$lib/assets/icons/share.svelte";

    import type { HTMLButtonAttributes } from "svelte/elements";

    import { dialog } from "../../Dialog";
    import SvgIcon from "../../SvgIcon/SvgIcon.svelte";

    import Share from "./Share.svelte";

    interface Props extends HTMLButtonAttributes {}
    const { class: className, ...props }: Props = $props();

    const onclick = () => {
        dialog.activate({ id: "share", content: shareDialog, isDrawWindow: false })
    };
</script>

{#snippet shareDialog()}
    <Share />
{/snippet}

<button type="button" {onclick} class={[className, "group cursor-pointer m-1 -mr-4"]} {...props}>
    <SvgIcon Svg={ShareIcon} size={32} class="group-hover:scale-110 group-active:scale-120" />
</button>
