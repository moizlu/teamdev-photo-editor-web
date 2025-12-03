<script lang="ts">
    import downloadLight from "$lib/assets/images/light/download.svg";
    import downloadDark from "$lib/assets/images/dark/download.svg";


    import { getCanvas, isCanvasCreated, logicSize } from "$lib/components/sections/CanvasContainer/state.svelte";

    import Icon from "$lib/components/ui/Icon/Icon.svelte";


    const onclick = () => {
        const canvas = getCanvas();
        if (!canvas) { return; }

        const scale = canvas.getZoom();
        const width = canvas.getWidth();
        const height = canvas.getHeight();

        canvas.setDimensions({
            width: logicSize.width,
            height: logicSize.height
        });

        canvas.setZoom(1.0);
        canvas.renderAll();

        const a = document.createElement('a');
        a.href = canvas?.toDataURL() ?? "#";
        a.download = "result-" + Date.now().toString();
        a.click();

        canvas.setZoom(scale);
        canvas.setDimensions({
            width: width,
            height: height
        });
        canvas.renderAll();
    }
</script>

<button type="button" {onclick} class="relative group flex-center button-general p-4 lg:p-2 bg-turn-on/20 hover:bg-turn-on/40 active:bg-turn-on/60 disabled:bg-disabled" disabled={!isCanvasCreated()}>
    <div class="transition-all duration-200 group-hover:translate-y-1 group-active:translate-y-2 group-disabled:translate-0">
        <Icon lightSrc={downloadLight} darkSrc={downloadDark} class="xs:mr-2 scale-150 lg:scale-100" />
    </div>
    <p class="hidden xs:block">ダウンロード</p>
</button>
