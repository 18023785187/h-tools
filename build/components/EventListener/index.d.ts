export declare type Listener<T> = (ev: T) => void;
declare type ListenerHandler = Listener<any> | Array<Listener<any>>;
/**
 * 事件绑定对象类型，key 为事件名称，value 为事件函数或者事件函数数组
 *
 * {
 *    click: [fn1, fn2, fn3],
 *    change: fn,
 *    ...
 * }
 */
export declare type On = {
    [N in keyof HTMLElementEventMap]?: Listener<HTMLElementEventMap[N]> | Array<Listener<HTMLElementEventMap[N]>>;
} & {
    [event: string]: ListenerHandler;
};
/**
 *  传入 el 元素以及事件代理池对象 on ，为 el 元素代理事件池，适用于需要绑定多个事件的元素，
 * 只需关注 on 对象即可。
 *
 *  EventListener 并不是真正绑定 on 对象中的事件，而是为每个事件绑定一个侦听器，由侦听器触发 on 对象中的方法。
 * EventListener 使使用者无需调用 addEventListener 绑定事件，只需简单在传入的 on 对象修改即可。
 *
 * 用法：
 *
 *  const el = document.createElement('div')
 *
 *  const eventListener = new EventListener(
      el,
      {
        click: [(e) => console.log(e), () => console.log('hi')],
      }
    )

    eventListener.on.dblclick = function() {} // 绑定了双击事件，也可以赋值一个方法数组

    delete eventListener.on.dblclick // 解除了双击事件，也可以移除某个双击事件，只需要在数组中删除目标方法即可

    eventListener.reflect({ // 重置 on 对象
      click: [() => console.log(555)]
    })
 */
export declare class EventListener {
    on: On;
    private _el;
    private _listenerMap;
    get el(): HTMLElement;
    constructor(el: HTMLElement, on?: On);
    /**
     * on 对象需要代理才能进行简单的添加删除事件操作，这是处理对象
     */
    private _handle;
    /**
     * 创建事件侦听器代理函数 handle ，handle 函数调用时会触发所有 this.on[eventTag]
     * @param {string} eventTag 事件名称
     * @returns {(event: Event) => void}
     */
    private _createListener;
    /**
     * 以 on 对象中的键为 _listenerMap 添加侦听器
     * @param {?string} event 事件名，不传则添加全部
     */
    private _add;
    /**
     * 以 on 对象中的键删除 _listenerMap 中的侦听器
     * @param {?string} event 事件名，不传则删除全部
     */
    private _delete;
    /**
     * 为 on 对象重新赋值，并移除所有侦听器，绑定新的侦听器
     * @param {On} on
     */
    reflect(on: On): void;
}
export {};
