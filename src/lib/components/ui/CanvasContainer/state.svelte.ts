import { browser } from "$app/environment";

//import type fabric from 'fabric';
import { Canvas } from "fabric";

export const canvasInitializedEvent = new Event('canvasInitialized');

class HistoryManager {
    constructor () {
        this.history = []
        this.currentIndex = 0;

        document.addEventListener('canvasInitialized', () => {
            const canvas = getCanvas();

            canvas?.on('object:added', () => this.add());
            canvas?.on('object:removed', () => this.add());
            canvas?.on('object:modified', () => this.add());
        })
    }

    public current(): string | undefined {
        const historiesLength = this.history.length;
        if (historiesLength > this.currentIndex) {
            return this.history[this.currentIndex];
        }
        return undefined;
    }

    public prev(): string | undefined {
        const historiesLength = this.history.length;
        if (historiesLength > this.currentIndex - 1) {
            this.currentIndex--;
            canvas?.loadFromJSON(this.history[this.currentIndex])
            return this.history[this.currentIndex];
        }
        return undefined;
    }

    public next(): string | undefined {
        const historiesLength = this.history.length;
        if (historiesLength > this.currentIndex + 1) {
            this.currentIndex++;
            canvas?.loadFromJSON(this.history[this.currentIndex])
            return this.history[this.currentIndex];
        }
        return undefined;
    }

    private add() {

    }

    public getHistory() { return this.history; }
    public getCurrentIndex() { return this.currentIndex; }

    public MAX_LENGTH = 10;

    private history: string[];
    private currentIndex: number;
}


let canvas: Canvas | undefined = $state(undefined);
let history: HistoryManager | undefined = $state(undefined);

export const logicSize = $state({
    width: 100,
    height: 100,
    scale: 1.0
});

export const initCanvas = (canvasElement: HTMLCanvasElement | undefined) => {
    if (!browser) { return; }

    // import("fabric").then((fabric) => {
    // fabric.initFilterBackend = function() {

    //     return (new fabric.Canvas2dFilterBackend());
    // };
    // });

    if (!canvasElement) {
        throw new Error("メインのキャンバスが見つかりません。");
    }

    history = new HistoryManager();

    canvas = new Canvas(canvasElement, {
        backgroundColor: 'white'
    });


    // onMount()内のイベントリスナーが確実に登録されるように待つ
    setTimeout(() => {
        document.dispatchEvent(canvasInitializedEvent);
    }, 50);
};

// キャンバスの初期化が終わるまでは`undefined`
export const getCanvas = () => {
    return canvas;
}

export const getHistory = () => {
    return history;
}
