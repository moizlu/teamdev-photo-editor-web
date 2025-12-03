<script lang="ts">
    import crossLight from "$lib/assets/images/light/cross.svg";
    import crossDark from "$lib/assets/images/dark/cross.svg";

    import uploadLight from "$lib/assets/images/light/upload.svg";
    import uploadDark from "$lib/assets/images/dark/upload.svg";

    import type fabric from 'fabric';
    import { FabricImage } from "fabric";

    import { fade } from "svelte/transition";
    import { onMount } from "svelte";

    import { isCanvasCreated, setCanvasCreated, getCanvas, logicSize } from "$lib/components/sections/CanvasContainer/state.svelte";
    import Icon from "$lib/components/ui/Icon/Icon.svelte";
    import Modal from "$lib/components/ui/Modal/Modal.svelte";

    let isDraggingOver = $state(false);
    let isInvalidInputModalOpened = $state(false);

    const loadImage = (file: File | undefined) => {
        if (!file?.type.startsWith("image/")) {
            isInvalidInputModalOpened = true;
            return;
        }

        const reader = new FileReader();

        reader.onload = async (event) => {
            const canvas = getCanvas();
            if (!canvas) { return; }

            const imgDataUrl = event.target?.result as string;

            const image = await FabricImage.fromURL(imgDataUrl);

            const CANVAS_SIZE = 2000;

            let displayWidth = image.width;
            let displayHeight = image.height;

            // 最初の画像は背景として使う
            if (!isCanvasCreated()) {
                canvas.setDimensions({
                    width: displayWidth,
                    height: displayHeight
                });

                logicSize.width = displayWidth;
                logicSize.height = displayHeight;
                logicSize.scale = 1.0;

                setCanvasCreated(true);
            } else {
                image.scale(0.5);
            }

            canvas.add(image);
            canvas.centerObject(image);
            canvas.setActiveObject(image);
        };

        if (file) {
            reader.readAsDataURL(file);
        }
    };

    const onchange = (event: Event) => {
        const file = (event.target as HTMLInputElement)?.files?.[0];

        if (file) {
            loadImage(file);
        }
    };

    onMount(() => {
        document.addEventListener('dragover', (event) => {
            event.preventDefault();
            isDraggingOver = true;
        });
        document.addEventListener('drop', (event) => {
            event.preventDefault();
            isDraggingOver = false;
        });
        document.addEventListener('pointerdown', () => { isDraggingOver = false; });
        document.addEventListener('pointerleave', () => { isDraggingOver = false; })

        window.ondrop = (event: DragEvent) => {
            event.preventDefault();
            loadImage(event.dataTransfer?.files?.[0]);
        };
    });
</script>

<!-- エラー画面 -->
<Modal bind:isOpened={isInvalidInputModalOpened} isModal={true}>
    <div class="w-90 h-60 flex flex-col justify-between items-center bg-base rounded-2xl shadow-black shadow-sm/100">
        <Icon lightSrc={crossLight} darkSrc={crossDark} width={100} height={100} />
        <p class="text-lg">追加できるのは画像ファイルのみです。</p>
        <button onclick={() => isInvalidInputModalOpened = !isInvalidInputModalOpened}
                class="button-general m-5 px-10 py-2 bg-danger text-base-light hover:bg-danger/75 active:bg-danger/50">
            <p>OK</p>
        </button>
    </div>
</Modal>

<!-- ボタン本体 -->
<button type="button" class="relative group flex-center button-general p-2 bg-turn-on/20 hover:bg-turn-on/40 active:bg-turn-on/60">
    <input type="file"  id="image-upload-input" accept="image/*" {onchange} ondragover={(e) => e.preventDefault()} class="absolute opacity-0 inset-0 cursor-pointer">
    <div class="transition-all duration-200 group-hover:-translate-y-1 group-active:-translate-y-2">
        <Icon lightSrc={uploadLight} darkSrc={uploadDark} />
    </div>
    <p>画像を追加</p>
</button>

<!-- ファイルをドラッグしたときの表示 -->
{#if isDraggingOver}
    <div transition:fade={{ duration: 300 }} class="z-12 fixed top-0 left-0 w-dvw h-dvh flex-col-center bg-base/90 backdrop-blur-sm">
        <Icon lightSrc={uploadLight} darkSrc={uploadDark} width={100} height={100} />
        <p class="text-2xl">ドラッグ&ドロップで画像を追加</p>
        <p>画面をクリックでキャンセル</p>
    </div>
{/if}
