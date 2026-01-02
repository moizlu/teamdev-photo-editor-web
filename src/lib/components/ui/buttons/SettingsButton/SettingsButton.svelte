<script lang="ts">
    import SettingsIcon from "$lib/assets/icons/settings.svelte";

    import type { HTMLButtonAttributes } from "svelte/elements";

    import { dialog } from "../../Dialog";
    import SvgIcon from "../../SvgIcon/SvgIcon.svelte";

    import Contents from "./Contents.svelte";

    interface Props extends HTMLButtonAttributes {}
    const { class: className, ...props }: Props = $props();

    const onclick = () => {
        dialog.activate({ id: "settings", content: settingsDialog, isDrawWindow: true, priority: 100 })
    };
</script>

{#snippet settingsDialog()}
    <Contents />
{/snippet}

<button type="button" {onclick} class={[className, "group cursor-pointer"]} {...props}>
    <SvgIcon Svg={SettingsIcon} size={40} class="group-hover:rotate-45 group-active:rotate-90" />
</button>
