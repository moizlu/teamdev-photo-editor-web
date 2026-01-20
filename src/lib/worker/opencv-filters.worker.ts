import cv from "@techstark/opencv-js";

self.addEventListener('message', async (e) => {
    const { dataURL, name, factor } = e.data;
    if (!dataURL || !name || !factor) { return; }

    switch (name) {
        case 'blur':
            
            break;
        default:
            break;
    }
});
