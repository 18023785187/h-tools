export declare enum Style {
    default = "Default",
    fade = "Fade"
}
export declare class Control {
    private _el;
    private _style;
    private _left;
    private _right;
    constructor(el: HTMLElement, style: Style);
    private _createControl;
    private _createDefaultControl;
    private _createFadeControl;
    bindEvent(moveLeft: any, moveRight: any): void;
}
