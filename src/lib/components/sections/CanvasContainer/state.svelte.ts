import { browser } from "$app/environment";

import type fabricModule from 'fabric';
import { Canvas } from "fabric";

export const canvasInitializedEvent = new Event('canvasInitialized');

let canvas: Canvas | undefined = $state(undefined);
let fabric: typeof fabricModule | undefined = $state(undefined);

export const logicSize = $state({
    width: 100,
    height: 100,
    scale: 1.0
});

export const initCanvas = async (canvasElement: HTMLCanvasElement | undefined) => {
    if (!browser) { return; }

    // import("fabric").then((fabric) => {
    // fabric.initFilterBackend = function() {

    //     return (new fabric.Canvas2dFilterBackend());
    // };
    // });

    if (!canvasElement) {
        throw new Error("メインのキャンバスが見つかりません。");
    }

    canvas = new Canvas(canvasElement, {
        backgroundColor: 'white'
    });

    fabric = await import("fabric");


    // onMount()内のイベントリスナーが確実に登録されるように待つ
    setTimeout(() => {
        document.dispatchEvent(canvasInitializedEvent);
    }, 50);
};

// キャンバスの初期化が終わるまでは`undefined`
export const getCanvas = () => {
    return canvas;
}

export const getFabric = () => {
    return fabric;
}

export const getHistory = () => {
    return history;
}
