export declare enum Position {
    top = "Top",
    right = "Right",
    bottom = "Bottom",
    left = "Left"
}
export declare type Options = {
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
declare type moveHook = (index: number) => void;
/**
 * 轮播图导航栏
 */
export declare class Navigation {
    private _el;
    private _options;
    private _navList;
    private _prevIndex;
    private _moveHook;
    constructor(el: HTMLElement, options: Options);
    /**
     * 对导航栏布局
     */
    private _layout;
    /**
     * 高亮指定索引导航点
     * @param {number} index
     */
    change(index: number): void;
    /**
     * 设置导航点长度
     * @param {number} length
     */
    setLength(length: number): void;
    /**
     * 为导航点绑定 move 事件
     * @param {moveHook} callback
     */
    bindEvent(callback: moveHook): void;
}
export {};
