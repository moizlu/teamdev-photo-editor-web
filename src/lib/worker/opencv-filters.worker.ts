import cv from "@techstark/opencv-js";

const BLUR_MAX = 100;

self.addEventListener('message', async (e) => {
    const { imageData, blur, contrast, grayscale, flipH, flipV } = e.data;
    if (!imageData) { return; }

    const src = cv.matFromImageData(imageData);

    if (blur !== 0) {
        const size = Math.round(((blur * BLUR_MAX) - 1) / 2) * 2 + 1;
        cv.GaussianBlur(src, src, new cv.Size(size, size), 0, 0, cv.BORDER_DEFAULT);
    }
    if (contrast !== 1.0) {
        src.convertTo(src, -1, contrast, 0);
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
