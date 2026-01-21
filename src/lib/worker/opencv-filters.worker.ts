import cv from "@techstark/opencv-js";

const BLUR_MAX = 100;

self.addEventListener('message', async (e) => {
    const { imageData, blur, contrast, saturation, grayscale, flipH, flipV } = e.data;
    if (!imageData) { return; }

    const src = cv.matFromImageData(imageData);

    if (blur !== 0) {
        const size = Math.round(((blur * BLUR_MAX) - 1) / 2) * 2 + 1;
        cv.GaussianBlur(src, src, new cv.Size(size, size), 0, 0, cv.BORDER_DEFAULT);
    }
    if (contrast !== 1.0) {
        src.convertTo(src, -1, contrast, 1);
    }
    if (saturation !== 1.0) {
        const hsv = new cv.Mat();

        cv.cvtColor(src, hsv, cv.COLOR_RGBA2RGB);
        cv.cvtColor(hsv, hsv, cv.COLOR_RGB2HSV);

        // チャンネル分離 [H, S, V]
        const channels = new cv.MatVector();
        cv.split(hsv, channels);

        const s = channels.get(1);
        s.convertTo(s, -1, saturation, 0);

        // 再統合してRGBAに戻す
        cv.merge(channels, hsv);
        cv.cvtColor(hsv, src, cv.COLOR_HSV2RGB);
        cv.cvtColor(src, src, cv.COLOR_RGB2RGBA);
    }
    if (grayscale) {
        cv.cvtColor(src, src, cv.COLOR_RGBA2GRAY, 0);
        cv.cvtColor(src, src, cv.COLOR_GRAY2RGBA, 0);
    }
    if (flipH) {
        cv.flip(src, src, 1);
    }
    if (flipV) {
        cv.flip(src, src, 0);
    }

    const result = new ImageData(new Uint8ClampedArray(src.data), src.cols, src.rows);

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    self.postMessage({ status: 'complete', imageData: result }, [result.data.buffer])

    src.delete();
});
