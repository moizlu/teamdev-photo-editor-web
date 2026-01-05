import { browser } from '$app/environment';

import type fabricModule from 'fabric';
import * as transformersModule from '@huggingface/transformers';
// import type OpenCV from '@techstark/opencv-js';
//! 注意!!! 動的インポートがなんかうまく行かないので静的インポートを使っています。
//! adapter-static以外を使う時はなんとかしてサーバーサイドにバンドルされることを回避すること!!!!!
import OpenCV from '@techstark/opencv-js';

import { theme } from "./theme.svelte";

export const canvasCreatedEvent = new Event('canvasCreated');
export const initializedEvent = new Event('initialized');
let _isInitialized = $state(false);
export const isInitialized = () => _isInitialized;

export const init = async () => {
    theme.init();

    await fabricState.init();
    await canvasState.init();
    await transformersState.init();
    await openCVState.init();

    _isInitialized = true;
    document.dispatchEvent(initializedEvent);
};

// キャンバスの元のサイズ
export const originalSize = $state({
    width: 1000,
    height: 500,

    get: () => {
        return {
            width: originalSize.width,
            height: originalSize.height
        };
    },
    set: (dimensions: { width: number, height: number }) => {
        originalSize.width = dimensions.width;
        originalSize.height = dimensions.height;
    }
});

export const fabricState = $state({
    _value: undefined as (typeof fabricModule | undefined),

    init: async () => {
        if (!browser) { return; }
        fabricState._value = await import('fabric');
    },

    get: () => fabricState._value
});

export const canvasState = $state({
    _value: undefined as (fabricModule.Canvas | undefined),
    container: undefined as (HTMLDivElement | undefined),
    _isCreated: false,
    canvasCreatedEvent: new Event('canvasCreated'),

    init: async () => {
        if (!browser) { return; }
        if (!fabricState._value) {
            throw new Error("先にfabricを初期化してください!!!!");
        }

        const canvasElement = document.getElementById('main-canvas') as HTMLCanvasElement;
        const containerElement = document.getElementById('main-canvas-container') as HTMLDivElement;

        if (!canvasElement) { throw new Error("キャンバスが見つかりません。"); }
        if (!containerElement) { throw new Error("キャンバスのコンテナが見つかりません。"); }

        canvasState._value = new fabricState._value.Canvas(canvasElement, {
            backgroundColor: 'rgb(255, 255, 255)'
        });
        canvasState.container = containerElement;
    },

    get: () => canvasState._value,

    isCreated: () => canvasState._isCreated,

    create: (dimensions: { width: number, height: number }) => {
        if (!canvasState._value) { return; }

        originalSize.set(dimensions);
        canvasState._value.setDimensions(dimensions);
        canvasState._isCreated = true;
        document.dispatchEvent(canvasCreatedEvent);
    },
    reset: () => {
        if (!canvasState._value) { return; }

        canvasState._value.getObjects().forEach((obj) => {
            canvasState._value?.remove(obj);
        });

        canvasState._isCreated = false;
    },

    getDataUrl: (): string => {
        const cv = canvasState.get();
        if (!cv) { throw new Error("キャンバスが見つかりません。"); }

        const scale = cv.getZoom();
        const width = cv.getWidth();
        const height = cv.getHeight();

        cv.setDimensions(originalSize.get());

        cv.setZoom(1.0);
        cv.renderAll();

        const dataUrl = cv.toDataURL();

        cv.setZoom(scale);
        cv.setDimensions({
            width: width,
            height: height
        });
        cv.renderAll();

        return dataUrl;
    }
});

export const transformersState = $state({
    _value: undefined as typeof transformersModule | undefined,

    init: async () => {
        transformersState._value = await import("@huggingface/transformers");
    },

    get: () => transformersState._value,
});

export const openCVState = $state({
    _value: undefined as typeof OpenCV | undefined,

    init: async () => {
        openCVState._value = OpenCV;
    },

    get: () => openCVState._value
})
