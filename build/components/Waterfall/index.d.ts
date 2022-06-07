export interface Options {
    marginTop?: number;
    minMargin?: number;
    throttle?: number;
}
export declare class Waterfall {
    private _options?;
    private _el;
    private _box;
    private _children;
    private _pos;
    private _marginTop?;
    private _margin?;
    private _heights;
    destroy: () => void;
    constructor(el: HTMLElement, options?: Options);
    private _handleOptions;
    private _layout;
    reset(transition?: number): void;
    update(): void;
}
