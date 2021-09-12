import { config } from '../typing';
declare class Vertical {
    constructor(el: HTMLElement, options: config);
    options: config;
    private el;
    private children;
    private pos;
    private point;
    private timer?;
    private changeEvent;
    private layout;
    private setTimer;
    private change;
    onchange(callback: (pos: number) => void): void;
    moveChange(movePos: 'left' | 'right'): void;
    clearTimer(): void;
    update(updateChildCallback: (box: HTMLElement) => void): void;
}
export default Vertical;
