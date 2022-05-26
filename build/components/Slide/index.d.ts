import { Options as slideNavPosition } from './Navigation';
import { Style as slideControlStyle } from './Control';
export { Options as NavOptions, Position as slideNavPosition } from './Navigation';
export { slideNavStyle } from './navStyle';
export { Style as slideControlStyle } from './Control';
export declare type Options = {
    mode: boolean;
    transition: number;
    delay: number;
    range: number;
    nav: boolean;
    navOptions: slideNavPosition;
    bindEvent: boolean;
    control?: slideControlStyle;
};
declare type changeHook = (index: number) => void;
export declare class Slide {
    private _el;
    private _elChild;
    private _children;
    private _options;
    private _navigation?;
    private _control?;
    private _pos;
    private _index;
    private _timer?;
    private _changeHook;
    constructor(el: HTMLElement, options?: {
        [key: string]: any;
    });
    private _layout;
    private _transition;
    private _change;
    private _bindEvent;
    openTimer(): void;
    closeTimer(): void;
    subscribe(callback: changeHook): void;
    unsubscribe(callback: changeHook): boolean;
    move(direction?: boolean): void;
    change(index: number): void;
    update(updateChildren: (elChild: HTMLElement) => void): void;
}
