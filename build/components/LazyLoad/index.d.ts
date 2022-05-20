export interface Options {
    preload?: number;
    loading?: string;
    error?: string;
    attempt?: number;
    throttle?: number;
    eventListener?: Array<keyof HTMLElementEventMap>;
}
/**
 * 把属性中带有 data-src 的图片元素添加到监听链表中，当元素进入视口时将渲染该图片
 */
export declare class LazyLoad {
    private _options;
    private _listNode;
    private _viewport;
    render: LazyLoad['_render'];
    constructor(options?: Options);
    private _handleOptions;
    /**
     * 渲染
     */
    private _render;
    /**
     * 更新 ImageListener 并进行一次渲染
     */
    update(): void;
}
