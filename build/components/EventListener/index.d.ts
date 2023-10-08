export type Listener<T> = (ev: T) => void;
export type ListenerHandler = Listener<any> | Array<Listener<any>>;
export type On = {
    [N in keyof HTMLElementEventMap]?: Listener<HTMLElementEventMap[N]> | Array<Listener<HTMLElementEventMap[N]>>;
} & {
    [event: string]: ListenerHandler;
};
export declare class EventListener {
    on: On;
    private _el;
    private _listenerMap;
    get el(): Window | HTMLElement | Document;
    constructor(el: HTMLElement | Document | Window, on?: On);
    private _handle;
    private _createListener;
    private _add;
    private _delete;
    reflect(on: On): void;
}
