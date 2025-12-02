<script lang="ts">
    import deleteLight from "$lib/assets/images/light/delete.svg";
    import deleteDark from "$lib/assets/images/dark/delete.svg";

    import Icon from "$lib/components/ui/Icon/Icon.svelte";

    import { getCanvas } from "$lib/components/ui/CanvasContainer/state.svelte";

    const onclick = () => {
        const canvas = getCanvas();
        if (!canvas) { return; }

        canvas.clear();
    };
</script>

<button type="button" title="キャンバスをリセットする" {onclick}>
    <Icon lightSrc={deleteLight} darkSrc={deleteDark} />
</button>
