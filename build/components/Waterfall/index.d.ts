export interface Options {
    marginTop?: number;
    minMargin?: number;
    throttle?: number;
}
export declare class Waterfall {
    private _options?;
    private _el;
    private _box;
    private _children;
    private _pos;
    private _marginTop?;
    private _margin?;
    private _heights;
    constructor(el: HTMLElement, options?: Options);
    private _handleOptions;
    /**
     * 从 pos 项开始布局内容物
     * @param {number} transition 动画时间，在排版时将会看到效果
     */
    private _layout;
    /**
     * 重置布局，在刷新、插入、删除的情况下使用
     * @param {number} transition 动画时间，在排版时将会看到效果
     */
    reset(transition?: number): void;
    /**
     * 更新，当有新的内容物时需要调用更新方法使新内容物布局，在推入的情况下使用
     */
    update(): void;
}
