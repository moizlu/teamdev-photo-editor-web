<script lang="ts">
    import CloseIcon from "$lib/assets/icons/close.svelte";
    import SettingsIcon from "$lib/assets/icons/settings.svelte";

    import type { HTMLButtonAttributes } from "svelte/elements";

    import { dialog } from "../../Dialog";
    import SvgIcon from "../../SvgIcon/SvgIcon.svelte";

    import Contents from "./Contents.svelte";

    interface Props extends HTMLButtonAttributes {}
    const { class: className, ...props }: Props = $props();

    const onclick = () => {
        dialog.activate({ id: "settings", content: settingsDialog, isDrawWindow: true, isModal: true, priority: 100 })
    };
</script>

{#snippet settingsDialog()}
    <div class="w-full">
        <button onclick={() => dialog.deactivate()} title="閉じる" class="mx-3 fixed top-0 right-0 cursor-pointer">
            <SvgIcon Svg={CloseIcon} size={60} />
        </button>

        <Contents />
    </div>
{/snippet}

<button type="button" {onclick} class={[className, "group"]} {...props}>
    <SvgIcon Svg={SettingsIcon} size={40} class="group-hover:rotate-45 group-active:rotate-90" />
</button>
