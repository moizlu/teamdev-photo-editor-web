<script lang="ts">
    import AddPhotoIcon from "$lib/assets/icons/add-photo.svelte";
    import InfoIcon from "$lib/assets/icons/info.svelte";

    import SvgIcon from "$lib/components/ui/SvgIcon/SvgIcon.svelte";
    import { canvasState } from "$lib/state";
</script>

{#if !canvasState.isCreated()}
    <div class="absolute w-full h-full top-0 left-0 flex-center bg-base">
        <div class="w-full flex-col-center gap-2">
            <button class="w-50 button-general button-bg-turn-on p-2" onclick={() => document.getElementById('file-input')?.click()}>
                <div class=" flex flex-col justify-center items-center gap-2">
                    <SvgIcon Svg={AddPhotoIcon} size={50} />
                    <p class="w-full m-2 text-center text-2xl">画像を追加</p>
                </div>
            </button>
            <!-- <p class="text-xl">もしくは</p>
            <button class="w-full button-general p-2" onclick={() => dialogActivate({ id:"create-canvas", content: createCanvasDialog })}>
                <div class="flex justify-start items-center gap-2">
                    <SvgIcon Svg={NewCanvasIcon} size={50} />
                    <p class="w-full text-center text-2xl">キャンバスを作成</p>
                </div>
            </button> -->
            <div class="flex justify-center items-start mt-2">
                <SvgIcon Svg={InfoIcon} size={35} />
                <p class="mt-1 text-md text-nowrap">画像は全てデバイス上で処理され、<br>サーバーなどにアップロードされる事は<br>ありません。</p>
            </div>
        </div>
    </div>
{/if}
