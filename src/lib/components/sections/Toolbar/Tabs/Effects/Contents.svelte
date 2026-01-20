<script lang="ts">
    import { onMount } from "svelte";

    import OpencvFiltersWorker from "$lib/worker/opencv-filters.worker?worker"
  import { canvasState, fabricState } from "$lib/state";

    let filterWorker: Worker | undefined = undefined;

    let factors = $state({
        blur: 0,
        monochrome: false
    });

    const onchange = () => {
        const image = canvasState.getImage();
        if (!filterWorker || !image) { return; }

        const canvasElement = document.createElement('canvas');
        canvasElement.width = image.width;
        canvasElement.height = image.height;
        const ctx = canvasElement.getContext('2d');
        if (!ctx) {
            throw new Error("キャンバスのコンテキストを取得できませんでした。");
        }
        ctx.drawImage(image.getElement(), 0, 0);
        const imageData = ctx.getImageData(0, 0, image.width, image.height);

        filterWorker.postMessage({
            imageData: imageData,
            blurFactor: factors.blur
        }, [imageData.data.buffer]);
    }

    const onMessageReceived = (e: { data: { status: string, imageData: ImageData } }) => {
        const { status, imageData } = e.data;

        const canvas = canvasState.get();
        const fabric = fabricState.get();
        if (!canvas || !fabric) { return; }

        const canvasElement = document.createElement('canvas');
        canvasElement.width = imageData.width;
        canvasElement.height = imageData.height;
        const ctx = canvasElement.getContext('2d');
        if (!ctx) {
            throw new Error("キャンバスのコンテキストを取得できませんでした。");
        }
        ctx.putImageData(imageData, 0, 0);

        switch (status) {
            case 'complete':
                const newImage = new fabric.FabricImage(canvasElement);

                canvasState.create({
                    width: newImage.width,
                    height: newImage.height
                });

                canvas.backgroundImage = newImage;
                canvas.centerObject(newImage);

                canvas.renderAll();
                break;
            default:
                console.error("背景削除: ステータスが無効です。");
                break;

        }
    };

    onMount(() => {
        filterWorker = new OpencvFiltersWorker();
        filterWorker.onmessage = onMessageReceived;
    });
</script>

<div class="w-full h-full flex flex-col justify-center lg:justify-start items-center">
     <div class="flex-center gap-1">
        <p>ぼかし</p>
        <input type="range" min={0} max={1} step={0.1} {onchange} bind:value={factors.blur} class="w-50">
        <p>{factors.blur.toFixed(1)}</p>
     </div>
</div>
