<script lang="ts">
    import AddPhotoIcon from "$lib/assets/icons/add-photo.svelte";
    import InfoIcon from "$lib/assets/icons/info.svelte";

    import { slide } from "svelte/transition";

    import SvgIcon from "$lib/components/ui/SvgIcon/SvgIcon.svelte";
    import { canvasState } from "$lib/state";
</script>

{#if !canvasState.isCreated()}
    <div transition:slide={{duration: 500, axis: 'y'}} class="z-90 fixed w-full h-full top-0 left-0 flex-center bg-base">
        <div class="w-full flex-col-center gap-2">
            <button class="group w-80 p-2 cursor-pointer create-button rounded-full" onclick={() => document.getElementById('file-input')?.click()}>
                <div class="mx-5 flex justify-center items-center gap-2">
                    <SvgIcon Svg={AddPhotoIcon} size={80} />
                    <div class="w-full flex-col-center">
                        <p class="w-full m-2 text-center text-3xl">画像を追加</p>
                        <p class="text-center text-sm">ドラッグ&ドロップも可</p>
                    </div>
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

<style>
    @keyframes gradient-move {
        from, to {
            background-position: top left;
        }
        50% {
            background-position: bottom right;
        }
    }

    @keyframes icon-bounce {
        from, to {
            translate: 0 0;
        }
        50% {
            translate: 0 -1rem;
        }
    }

    .create-button {
        @apply transition-all duration-300;

        background-size: 1000%;
        background-image: var(--color-logo);
        animation: gradient-move 5s ease-in-out infinite;
    }

    .create-button:hover {
        @apply transition-all duration-300 scale-110;

        background-size: 100%;
    }
    .create-button:active {
        @apply transition-all duration-300 scale-110;

        background-size: 100%;
    }
</style>
