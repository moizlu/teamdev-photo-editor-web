import cv from "@techstark/opencv-js";

const BLUR_MAX = 100;

self.addEventListener('message', async (e) => {
    const { imageData, blurFactor } = e.data;
    if (!imageData) { return; }

    const src = cv.matFromImageData(imageData);

    if (blurFactor !== 0) {
        const size = Math.round(((blurFactor * BLUR_MAX) - 1) / 2) * 2 + 1;
        cv.GaussianBlur(src, src, new cv.Size(size, size), 0, 0, cv.BORDER_DEFAULT);
    }

    const result = new ImageData(new Uint8ClampedArray(src.data), src.cols, src.rows);

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    self.postMessage({ status: 'complete', imageData: result }, [result.data.buffer])

    src.delete();
});
