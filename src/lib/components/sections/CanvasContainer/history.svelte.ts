import { browser } from "$app/environment";
import type { Canvas } from "fabric";

class History {
    constructor() {}

    public init = (canvas: Canvas) => {
        if (!browser) { return; }

        this.canvas = canvas;

        canvas.on('object:added', this.push);
        canvas.on('object:removed', this.push);
        canvas.on('object:modified', this.push);
    }

    public push = () => {
        if (!this.canvas || this.isProcessing) { return; }

        this.redoStack = [];
        this.undoStack.push(this.canvas.toJSON());

        if (this.undoStack.length >= this.maxStack) {
            this.undoStack.shift();
        }
    }

    public undo = () => {
        if (!this.canvas || this.isProcessing) { return; }
        this.isProcessing = true;

        const h = this.undoStack.pop();
        if (!h) {
            this.isProcessing = true;
            return;
        }
        this.canvas.loadFromJSON(h, () => { this.canvas?.renderAll()});
        this.redoStack.push(h);

        setTimeout(() => {
            this.isProcessing = false;
        }, 10);
    }

    public redo = () => {
        if (!this.canvas || this.isProcessing) { return; }
        this.isProcessing = true;

        const h = this.redoStack.pop();
        if (!h) {
            this.isProcessing = true;
            return;
        }
        this.canvas.loadFromJSON(h, () => { this.canvas?.renderAll()});
        this.undoStack.push(h);

        setTimeout(() => {
            this.isProcessing = false;
        }, 10);
    }

    public canUndo = () => { return this.undoStack.length !== 0; }
    public canRedo = () => { return this.redoStack.length !== 0; }

    public clear = () => {
        this.undoStack = [];
        this.redoStack = [];
    };

    public maxStack = 10;

    private canvas: Canvas | undefined = undefined;

    private undoStack: string[] = [];
    private redoStack: string[] = [];

    private isProcessing: boolean = false;
};

export const history = $state(new History());
