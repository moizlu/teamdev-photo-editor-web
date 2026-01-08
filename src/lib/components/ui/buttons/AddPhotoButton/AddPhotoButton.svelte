<script lang="ts">
    import ErrorIcon from "$lib/assets/icons/error.svelte";
    import AddPhotoIcon from "$lib/assets/icons/add-photo.svelte";
    import CheckIcon from "$lib/assets/icons/check.svelte";

    import type { HTMLButtonAttributes } from "svelte/elements";

    import { onMount } from "svelte";

    import { dialog } from "../../Dialog";
    import SvgIcon from "../../SvgIcon/SvgIcon.svelte";
    import DraggingOverlay from "./DraggingOverlay.svelte";

    import { fabricState, canvasState, originalSize } from "$lib/state";

    interface Props extends HTMLButtonAttributes {}
    const { class: className, ...props }: Props = $props();

    let inputElement: HTMLInputElement | undefined = undefined;

    const loadImage = (file: File | undefined) => {
        if (!file?.type.startsWith('image/')) {
            dialog.activate({ id: "invalid-file-type-error", content: invalidFileTypeDialog, isModal: true, priority: 10 });
            return;
        }

        const reader = new FileReader();

        reader.onload = async (event) => {
            const canvas = canvasState.get();
            if (!canvas) { return; }

            const imgDataUrl = event.target?.result as string;
            const image = await fabricState.get()?.FabricImage.fromURL(imgDataUrl);
            if (!image) {
                throw new Error("画像の読み込みに失敗しました。");
            }

            const displayWidth = image?.width || 0;
            const displayHeight = image?.height || 0;

            if (!canvasState.isCreated()) {
                canvasState.create({
                    width: displayWidth,
                    height: displayHeight
                }, image);

                canvas.backgroundImage = image;
                canvas.centerObject(image);
            } else {
                const scale = Math.min(
                    originalSize.width / displayWidth,
                    originalSize.height / displayHeight,
                    1
                );

                image.scale(scale);
                canvas.add(image);
                canvas.centerObject(image);
                canvas.setActiveObject(image);
            }
        };

        if (file) {
            reader.readAsDataURL(file);
        }
    };

    const onchange = (event: Event) => {
        if (dialog.getContent() && (dialog.isActive("dragging-over"))) {
            if (event.target) {
                (event.target as HTMLInputElement).files = null;
            }
            return;
        }

        const file = (event.target as HTMLInputElement)?.files?.[0];

        if (file) {
            loadImage(file);
        }

        if (event.target) {
            (event.target as HTMLInputElement).files = null;
        }
    };

    onMount(() => {
        window.ondrop = (event: DragEvent) => {
            event.preventDefault();

            if (dialog.isActive("dragging-over")) {
                loadImage(event.dataTransfer?.files?.[0]);
            }
        };
    })
</script>

{#snippet invalidFileTypeDialog()}
    <div class="flex-col-center">
        <SvgIcon Svg={ErrorIcon} size={100} />
        <p>追加できるのは画像ファイルのみです。</p>
        <button type="button" onclick={() => dialog.deactivate()} class="w-25 button-general m-2 p-2 flex justify-start items-center button-bg-danger">
            <SvgIcon Svg={CheckIcon} size={30} class="flex-none" />
            <p class="flex-1 text-center">OK</p>
        </button>
    </div>
{/snippet}

<DraggingOverlay />

<button type="button" onclick={() => inputElement?.click()} class={[className, "group relative button-general button-bg-turn-on"]} {...props}>
    <input bind:this={inputElement} id="file-input" type="file" accept="image/*" {onchange} class="absolute inset-0 opacity-0 cursor-pointer pointer-events-none">

    <div class="px-1 flex justify-between items-center gap-1">
        <SvgIcon Svg={AddPhotoIcon} size={40} class="flex-none group-hover:-translate-y-1" />
        <p class="hidden xs:block flex-1 text-center text-nowrap">画像を追加</p>
    </div>
</button>
