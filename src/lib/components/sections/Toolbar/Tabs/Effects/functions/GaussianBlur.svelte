<script lang="ts">
    import BlurIcon from "$lib/assets/icons/blur.svelte";

    import AccordionMenu from "$lib/components/ui/AccordionMenu";

    import { canvasState, openCVState } from "$lib/state";

    const onApply = () => {
        if (!openCVState.get()) { return; }
        const image = canvasState.getImage();
        if (!image) { return; }

        
    }
</script>

<AccordionMenu icon={BlurIcon} title="ぼかし" {onApply}>
    <p></p>
</AccordionMenu>
