<script lang="ts">
    import deleteLight from "$lib/assets/images/light/delete.svg";
    import deleteDark from "$lib/assets/images/dark/delete.svg";

    import exclamationLight from "$lib/assets/images/light/exclamation.svg";
    import exclamationDark from "$lib/assets/images/dark/exclamation.svg";

    import Modal from "$lib/components/ui/Modal/Modal.svelte";
    import Icon from "$lib/components/ui/Icon/Icon.svelte";

    import { getCanvas, setCanvasCreated } from "$lib/components/sections/CanvasContainer/state.svelte";

    let isModalOpened = $state(false);

    const onclick = () => {
        isModalOpened = true;
    };

    const executeReset = () => {
        const canvas = getCanvas();
        if (!canvas) { return; }

        canvas.getObjects().forEach((obj) => {
            canvas.remove(obj);
        });
        setCanvasCreated(false);

        isModalOpened = false;
    }
</script>

<Modal bind:isOpened={isModalOpened} isModal={false}>
    <div class="w-90 h-60 flex flex-col justify-between items-center bg-base rounded-2xl shadow-black shadow-sm/100">
        <Icon lightSrc={exclamationLight} darkSrc={exclamationDark} width={100} height={100} />
        <p class="text-lg">本当にリセットしますか？</p>
        <div class="flex-center">
            <button onclick={executeReset}
                    class="button-general w-30 m-5 py-2 bg-danger text-base-light hover:bg-danger/75 active:bg-danger/50">
                <p>リセットする</p>
            </button>
            <button onclick={() => isModalOpened = false} class="button-general w-30 m-5 py-2 bg-turn-on/30 text-base-light hover:bg-turn-on/50 active:bg-turn-on/75">
                <p>キャンセル</p>
            </button>
        </div>
    </div>
</Modal>

<button type="button" title="キャンバスをリセットする" {onclick} class="group flex-center button-general p-4 lg:p-2 bg-danger/40 hover:bg-danger/50 active:bg-danger/70">
    <div class="transition-all duration-300 group-hover:scale-110 group-active:scale-120">
        <Icon lightSrc={deleteLight} darkSrc={deleteDark} class="lg:mr-2 scale-170 lg:scale-100" />
    </div>
    <p class="hidden lg:block">全てリセット</p>
</button>
