<script lang="ts">
    import crossLight from "$lib/assets/images/light/cross.svg";
    import crossDark from "$lib/assets/images/dark/cross.svg";

    import Icon from "$lib/components/ui/Icon/Icon.svelte";
    import Modal from "$lib/components/ui/Modal/Modal.svelte";
    import { getCanvas, logicSize, isCanvasCreated, setCanvasCreated } from "./state.svelte";
    import { setCanDragOver } from "../Header/state.svelte";

    interface Props {
        isOpened?: boolean
    }
    let { isOpened = $bindable(false) }: Props = $props();

    let width = $state(1920);
    let height = $state(1080);

    const validationInput = (event: Event) => {
        if (!event.target) { return; }

        const value = (event.target as HTMLInputElement).value;
        if (!value) {
            (event.target as HTMLInputElement).value = "1";
        }
    };

    const onCreateCanvasClicked = () => {
        const canvas = getCanvas();
        if (!canvas) { return; }

        setCanvasCreated(true, width, height);
        isOpened = false;
    };

    $effect(() => {
        setCanDragOver(!isOpened);
    });
</script>

<Modal isModal={false} bind:isOpened={isOpened}>
    <div class="relative w-90 h-60 flex flex-col justify-between items-center bg-base rounded-2xl shadow-black shadow-sm/100">
        <button type="button" title="閉じる" onclick={() => isOpened = false} class="absolute top-0 right-0 m-3">
            <Icon lightSrc={crossLight} darkSrc={crossDark} />
        </button>

        <p class="text-lg m-2 mt-5">{(isCanvasCreated()) ? "キャンバスのサイズを設定" : "キャンバスを作成"}</p>

        <div class="m-2 flex flex-col justify-start">
            <div class="flex justify-start items-center">
                <p class="m-2">　幅</p>
                <input type="number" onchange={validationInput} bind:value={width} min="1" step="1" class="w-30">
                <p class="m-2">px</p>
            </div>
            <div class="flex justify-start items-center">
                <p class="m-2">高さ</p>
                <input type="number" onchange={validationInput} bind:value={height} min="1" step="1" class="w-30">
                <p class="m-2">px</p>
            </div>
        </div>

        <button onclick={onCreateCanvasClicked} class="button-general m-5 px-10 py-2">
            <p>作成</p>
        </button>
    </div>
</Modal>
