<script lang="ts">
    import DownloadIcon from "$lib/assets/icons/download.svelte";

    import type { HTMLButtonAttributes } from "svelte/elements";

    import { canvasState } from "$lib/state";
    import SvgIcon from "../../SvgIcon/SvgIcon.svelte";

    interface Props extends HTMLButtonAttributes {}
    const { class: className, ...props }: Props = $props();

    const onclick = () => {
        const a = document.createElement('a');
        a.href = canvasState.getDataUrl();
        a.download = `result-${Date.now()}`;
        a.click();
    };
</script>

<button type="button" {onclick} class={[className, "group button-general button-bg-turn-on disabled:bg-turn-off"]} disabled={!canvasState.isCreated()} {...props}>
    <div class="px-1 flex justify-between items-center gap-1">
        <SvgIcon Svg={DownloadIcon} size={40} class="flex-none enabled:group-hover:translate-y-1" />
        <p class="hidden sm:block flex-1 text-center text-nowrap">ダウンロード</p>
    </div>
</button>
