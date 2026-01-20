<script lang="ts">
    import CloseIcon from "$lib/assets/icons/close.svelte";
    import CopyIcon from "$lib/assets/icons/copy.svelte";

    import QRCode from "$lib/assets/icons/qr.svelte";

    import SvgIcon from "../../SvgIcon/SvgIcon.svelte";

    import { dialog } from "../../Dialog";

    const onCopyButtonClicked = () => {
        window.navigator.clipboard.writeText("https://photoeditor.moizlu.com/");
    }
</script>

<button onclick={() => dialog.deactivate()} title="閉じる" class="mx-3 fixed top-0 right-0 cursor-pointer">
    <SvgIcon Svg={CloseIcon} size={100} />
</button>

<div class="flex-col-center">
    <div class="flex-col-center w-80 p-4 rounded-xl bg-base/85 shadow-black shadow-xl/50">
        <SvgIcon Svg={QRCode} size={500} class="scale-50 -m-31.25" />
        <div class="flex-center">
            <p>https://photoeditor.moizlu.com/</p>
            <button onclick={onCopyButtonClicked} title="コピー" class="cursor-pointer">
                <SvgIcon Svg={CopyIcon} size={45} />
            </button>
        </div>
    </div>
</div>
