<script lang="ts">
    import undoLight from "$lib/assets/images/light/undo.svg";
    import undoDark from "$lib/assets/images/dark/undo.svg";
    import Icon from '$lib/components/ui/Icon/Icon.svelte';

    import { history } from "./history.svelte";

    const onUndoClicked = () => {
        history.undo();
    };

    const onRedoClicked = () => {
        history.redo();
    };
</script>

<div class="z-9 fixed bottom-0 right-0 m-3">
    <div class="w-full h-full flex justify-around items-center">
        <button type="button" onclick={onUndoClicked} class="button-general m-1 p-1">
            <Icon lightSrc={undoLight} darkSrc={undoDark} width={30} height={30} />
        </button>
        <div class="w-0.5 h-full bg-label"></div>
        <button type="button" onclick={onRedoClicked} class="button-general m-1 p-1">
            <Icon lightSrc={undoLight} darkSrc={undoDark} width={30} height={30}  class="rotate-y-180" />
        </button>

    </div>
</div>