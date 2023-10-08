export type Options = {
    speed: number;
};
export declare class Carousel {
    private _options;
    private _el;
    private _elChild;
    private _pos;
    private _flag;
    private _scrollBar;
    private _barWidth;
    private _pointsWidth;
    private _end;
    destroy: () => void;
    constructor(el: HTMLElement, options?: Options);
    private _layout;
    private _createScroll;
    private _bindEvent;
    private _update;
    private _run;
}
