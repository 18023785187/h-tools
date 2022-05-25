export declare type Listener<T> = (ev: T) => void;
declare type ListenerHandler = Listener<any> | Array<Listener<any>>;
export declare type On = {
    [N in keyof HTMLElementEventMap]?: Listener<HTMLElementEventMap[N]> | Array<Listener<HTMLElementEventMap[N]>>;
} & {
    [event: string]: ListenerHandler;
};
export declare class EventListener {
    on: On;
    private _el;
    private _listenerMap;
    get el(): HTMLElement;
    constructor(el: HTMLElement, on?: On);
    private _handle;
    private _createListener;
    private _add;
    private _delete;
    reflect(on: On): void;
}
export {};
