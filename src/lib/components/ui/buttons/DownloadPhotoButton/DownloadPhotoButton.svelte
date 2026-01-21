<script lang="ts">
    import DownloadIcon from "$lib/assets/icons/download.svelte";

    import type { HTMLButtonAttributes } from "svelte/elements";

    import { canvasState, originalSize } from "$lib/state";
    import SvgIcon from "../../SvgIcon/SvgIcon.svelte";
    import { isModalOperating } from "$lib/components/sections/Toolbar/state.svelte";

    interface Props extends HTMLButtonAttributes {}
    const { class: className, ...props }: Props = $props();

    const onclick = () => {
        const canvas = canvasState.get();
        if (!canvas) { return; }

        const cropRect = canvas.getObjects().find(obj => (obj as any).croppingRect);

        let url = "#";

        if (cropRect) {
            const cropBox = cropRect?.getBoundingRect();

            cropRect.set({ visible: false });
            canvas.renderAll();

            url = canvasState.getDataUrl({
                left: cropBox.left,
                top: cropBox.top,
                width: cropBox.width,
                height: cropBox.height,
                format: 'png',
                multiplier: 1.0
            });

            cropRect.set({ visible: true });
            canvas.renderAll();
        } else {
            url = canvasState.getDataUrl();
        }

        const a = document.createElement('a');

        a.href = url;
        a.download = `result-${Date.now()}`;
        a.click();
    };
</script>

<button type="button" {onclick} class={[className, "group button-general button-bg-turn-on disabled:bg-turn-off"]} disabled={!canvasState.isCreated() || isModalOperating.get()} {...props}>
    <div class="px-1 flex justify-between items-center gap-1">
        <SvgIcon Svg={DownloadIcon} size={40} class="flex-none enabled:group-hover:translate-y-1" />
        <p class="hidden sm:block flex-1 text-center text-nowrap">ダウンロード</p>
    </div>
</button>
