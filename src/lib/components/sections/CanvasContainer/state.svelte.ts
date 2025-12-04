import { browser } from "$app/environment";

import type fabricModule from 'fabric';
import { Canvas } from "fabric";

export const canvasInitializedEvent = new Event('canvasInitialized');
export const canvasCreatedEvent = new Event('canvasCreated');

let canvas: Canvas | undefined = $state(undefined);
let fabric: typeof fabricModule | undefined = $state(undefined);

let canvasCreated = $state(false);

export const logicSize = $state({
    width: 1920,
    height: 1080,
    scale: 1.0
});

export const initCanvas = async (canvasElement: HTMLCanvasElement | undefined) => {
    if (!browser) { return; }

    if (!canvasElement) {
        throw new Error("メインのキャンバスが見つかりません。");
    }

    canvas = new Canvas(canvasElement, {
        backgroundColor: 'rgb(255, 255, 255)'
    });

    fabric = await import("fabric");

    // onMount()内のイベントリスナーが確実に登録されるように待つ
    setTimeout(() => {
        document.dispatchEvent(canvasInitializedEvent);
    }, 50);
};

// キャンバスの初期化が終わるまでは`undefined`
export const getCanvas = () => { return canvas; }
export const getFabric = () => { return fabric; }
export const getHistory = () => { return history; }

export const isCanvasCreated = () => { return canvasCreated; }
export const setCanvasCreated = (value: boolean) => {
    if (!browser) { return; }

    canvasCreated = value;
    if (canvasCreated) {
        document.dispatchEvent(canvasCreatedEvent);
    }
}
