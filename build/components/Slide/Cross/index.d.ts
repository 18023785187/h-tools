import { config } from '../typing';
declare class Cross {
    constructor(el: HTMLElement, options: config);
    options: config;
    private el;
    private children;
    private pos;
    private point;
    private timer?;
    private changeEvent;
    private layout;
    private change;
    private bindTouchEvent;
    onchange(callback: (pos: number) => void): void;
    moveChange(movePos: 'left' | 'right'): void;
    setTimer(): void;
    clearTimer(): void;
    update(updateChildCallback: (box: HTMLElement) => void): void;
}
export default Cross;
