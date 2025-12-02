<script lang="ts">
    import undoLight from "$lib/assets/images/light/undo.svg";
    import undoDark from "$lib/assets/images/dark/undo.svg";
    import Icon from '../Icon/Icon.svelte';
</script>

<div class="z-200 fixed bottom-0 right-0 m-3 w-30 h-10 rounded-full bg-label/10 shadow-black shadow-md/100">
    <div class="w-full h-full flex justify-around items-center">
        <button type="button">
            <Icon lightSrc={undoLight} darkSrc={undoDark} width={30} height={30} />
        </button>
        <div class="w-[2px] h-full bg-label"></div>
        <button type="button">
            <Icon lightSrc={undoLight} darkSrc={undoDark} width={30} height={30}  class="rotate-y-180" />
        </button>

    </div>
</div>