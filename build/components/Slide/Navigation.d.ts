export declare enum Position {
    top = "Top",
    right = "Right",
    bottom = "Bottom",
    left = "Left"
}
export type Options = {
    style: string;
    highStyle: string;
    position: Position;
    range: number;
    transition: number;
    length: number;
};
export declare const amendmentNavOptions: (options: {
    [key: string]: any;
}) => Options;
type moveHook = (index: number) => void;
export declare class Navigation {
    private _el;
    private _options;
    private _navList;
    private _prevIndex;
    private _moveHook;
    destroy: () => void;
    constructor(el: HTMLElement, options: Options);
    private _layout;
    change(index: number): void;
    setLength(length: number): void;
    bindEvent(callback: moveHook): void;
}
export {};
