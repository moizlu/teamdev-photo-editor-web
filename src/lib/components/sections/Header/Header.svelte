<script lang="ts">
    import favicon from "$lib/assets/favicon.svg";

    import Settings from "./Settings.svelte";
    import ImageUploadButton from "./ImageUploadButton.svelte";
    import ImageDownloadButton from "./ImageDownloadButton.svelte";
</script>

<header class="z-1000 fixed top-0 left-0 w-full h-[55px] bg-base shadow-md/50">
    <div class="h-full mx-3 flex justify-between items-center">
        <div class="z-100 flex h-full items-center mx-0 sm:mx-5">
            <img src={favicon} alt="favicon" width={40} height={40} class="pointer-events-none scale-75 sm:scale-100">
            <p class="m-2 hidden sm:block">画像編集ツール</p>
            <!-- <p class="text-danger text-4xl">注意：中身はまだ実装中です。</p> -->
        </div>
        <div class="flex-center gap-2">
            <!-- <button type="button" aria-label="upload" class="button-general p-2">
                <p>画像を追加</p>
            </button>
            <button type="button" aria-label="upload" class="button-general p-2">
                <p>ダウンロード</p>
            </button>
            <button type="button" aria-label="upload" class="button-general p-2 text-base-light bg-danger hover:bg-danger/80 active:bg-danger/40">
                <p>リセット</p>
            </button> -->
            <ImageUploadButton />
            <ImageDownloadButton />
            <Settings />
        </div>
    </div>
</header>