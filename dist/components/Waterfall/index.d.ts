declare class Waterfall {
    constructor(el: HTMLElement, options?: {
        marginTop?: number;
        minMargin?: number;
        throttle?: number;
    });
    private options?;
    private el;
    private box?;
    private children?;
    private marginTop?;
    private margin?;
    private listNumber?;
    private heightArr?;
    private pos;
    private handlerOptions;
    private updateChild;
    private layout;
    reset(transition?: number): void;
    update(): void;
}
export default Waterfall;
