export interface Options {
    preload?: number;
    loading?: string;
    error?: string;
    attempt?: number;
    throttle?: number;
    eventListener?: Array<keyof HTMLElementEventMap>;
}
export declare class LazyLoad {
    private _options;
    private _listNode;
    private _viewport;
    render: LazyLoad['_render'];
    constructor(options?: Options);
    private _handleOptions;
    private _render;
    update(): void;
}
