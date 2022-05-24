import { Options as NavOptions } from './Navigation';
export { Options as NavOptions, Position as slideNavPosition } from './Navigation';
export { slideNavStyle } from './navStyle';
export declare type Options = {
    mode: boolean;
    transition: number;
    delay: number;
    range: number;
    nav: boolean;
    navOptions: NavOptions;
    bindEvent: boolean;
    control: boolean;
};
declare type changeHook = (index?: number) => void;
/**
 * 轮播图，支持横向和纵向，支持移动端和 pc 端
 */
export declare class Slide {
    private _el;
    private _elChild;
    private _children;
    private _options;
    private _navigation?;
    private _pos;
    private _index;
    private _timer?;
    private _changeHook;
    constructor(el: HTMLElement, options?: {
        [key: string]: any;
    });
    /**
     * 布局
     */
    private _layout;
    /**
     * 轮播过渡动画
     * @param {boolean} flag 是否启用过渡时间
     */
    private _transition;
    /**
     * 轮播发生方法
     */
    private _change;
    /**
     * 绑定手指滑动事件
     */
    private _bindEvent;
    /**
     * 创建控件
     */
    private _createControl;
    /**
     * 启动轮播图定时器
     */
    openTimer(): void;
    /**
     * 关闭轮播图定时器
     */
    closeTimer(): void;
    /**
     * 订阅 change 事件
     * @param {changeHook} callback
     */
    subscribe(callback: changeHook): void;
    /**
     * 取消订阅 change 事件
     * @param {changeHook} callback
     * @returns {boolean}
     */
    unsubscribe(callback: changeHook): boolean;
    /**
     * 向左或向右进行轮播一次
     * @param {boolean} direction 方向，true 为左，false 为右
     */
    move(direction?: boolean): void;
    /**
     * 跳转到指定索引位置
     * @param {number} index
     */
    change(index: number): void;
    /**
     * 更新子元素时刷新轮播图
     * @param {(elChild: HTMLElement) => void} updateChildren 需要在该函数内对子节点增删改查
     */
    update(updateChildren: (elChild: HTMLElement) => void): void;
}
