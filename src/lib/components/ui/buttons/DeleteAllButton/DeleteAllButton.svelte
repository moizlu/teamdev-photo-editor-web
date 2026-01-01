<script lang="ts">
    import DeleteIcon from "$lib/assets/icons/delete.svelte";
    import InfoIcon from "$lib/assets/icons/info.svelte";
    import CheckIcon from "$lib/assets/icons/check.svelte";
    import CloseIcon from "$lib/assets/icons/close.svelte";

    import type { HTMLButtonAttributes } from "svelte/elements";

    import { canvasState } from "$lib/state";
    import { dialog } from "../../Dialog";
    import SvgIcon from "../../SvgIcon/SvgIcon.svelte";

    interface Props extends HTMLButtonAttributes {}
    const { class: className, ...props }: Props = $props();

    const onclick = () => {
        dialog.activate({ id:"confirm-delete-all", content: confirmDeleteAllDialog, priority: 1 });
    };
</script>

{#snippet confirmDeleteAllDialog()}
    <div class="flex-col-center gap-2">
        <SvgIcon Svg={DeleteIcon} size={100} />
        <p>完全にリセットしますか？</p>
        <div class="w-[95%] max-w-70 flex-center gap-2">
            <button type="button" onclick={() => { canvasState.reset(); dialog.deactivate(); }} class="flex-1 button-general p-2 button-bg-danger">
                <div class="flex justify-start items-center">
                    <SvgIcon Svg={CheckIcon} size={30} class="flex-none" />
                    <p class="flex-1 text-center">OK</p>
                </div>
            </button>
            <button type="button" onclick={() => dialog.deactivate()} class="flex-1 button-general p-2 button-bg-turn-on">
                <div class="flex justify-start items-center">
                    <SvgIcon Svg={CloseIcon} size={30} class="flex-none" />
                    <p class="flex-1 text-center text-nowrap">キャンセル</p>
                </div>
            </button>
        </div>
    </div>
{/snippet}

<button type="button" {onclick} class={[className, "group button-general disabled:bg-turn-off button-bg-danger"]} disabled={!canvasState.isCreated()} {...props}>
    <div class="px-1 flex justify-between items-center gap-1">
        <SvgIcon Svg={DeleteIcon} size={40} class="flex-none enabled:group-hover:translate-y-1" />
        <p class="hidden sm:block flex-1 text-center text-nowrap">全て削除</p>
    </div>
</button>
