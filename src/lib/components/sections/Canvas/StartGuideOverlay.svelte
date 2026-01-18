<script lang="ts">
    import AddPhotoIcon from "$lib/assets/icons/add-photo.svelte";
    import InfoIcon from "$lib/assets/icons/info.svelte";

    import { slide } from "svelte/transition";

    import SvgIcon from "$lib/components/ui/SvgIcon/SvgIcon.svelte";
    import { canvasState } from "$lib/state";
</script>

{#if !canvasState.isCreated()}
    <div transition:slide={{duration: 500, axis: 'y'}} class="text-base-light z-90 fixed w-full h-full top-0 left-0 flex-center background-gradient">
        <div class="w-full flex-col-center gap-2">
            <button class="transition-all duration-200 group w-80 p-2 m-2 cursor-pointer rounded-full bg-black/25 button-general create-button" onclick={() => document.getElementById('file-input')?.click()}>
                <div class="mx-5 flex justify-center items-center gap-2">
                    <SvgIcon Svg={AddPhotoIcon} size={80} autoChangeByTheme={false} class="fill-base-light" />
                    <div class="w-full flex-col-center">
                        <p class="w-full m-2 text-center text-3xl">画像を追加</p>
                        <p class="text-center text-sm">またはドラッグ&ドロップ</p>
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
            <div class="flex justify-center items-start mt-2 p-2 rounded-xl bg-black/50 backdrop-blur-lg">
                <SvgIcon Svg={InfoIcon} size={35} autoChangeByTheme={false} class="fill-base-light" />
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

    @keyframes pulsation {
        from, to {
            translate: 0 0;
        }
        50% {
            translate: 0 0.5rem;
        }
    }

    .background-gradient {
        @apply transition-all duration-300;

        background-size: 1000%;
        background-image: var(--color-logo);
        background-blend-mode: overlay;
        background-color: rgba(255, 255, 255, 0.3);
        animation: gradient-move 20s ease-in-out infinite;
    }

    .create-button {
        @apply transition-all duration-300;
        animation: pulsation 3s ease-in-out infinite;
    }
    .create-button:hover {
        @apply transition-all duration-300;
        animation: none;
        scale: 120% 120%;
    }
</style>
