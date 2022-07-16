

export type Listener<T> = (ev: T) => void
export type ListenerHandler = Listener<any> | Array<Listener<any>>

/**
 * 事件绑定对象类型，key 为事件名称，value 为事件函数或者事件函数数组
 * 
 * {
 *    click: [fn1, fn2, fn3],
 *    change: fn,
 *    ...
 * }
 */
export type On = {
  [N in keyof HTMLElementEventMap]?: // HTMLElementEventMap 事件名类型
  | Listener<HTMLElementEventMap[N]>
  | Array<Listener<HTMLElementEventMap[N]>>
} & {
  [event: string]: ListenerHandler
}

type ListenerMap = {
  [N in keyof HTMLElementEventMap]?: Listener<HTMLElementEventMap[N]>
} & { [event: string]: Listener<any> }

type SomeListener<N extends keyof HTMLElementEventMap> = // 事件处理器单项
  | Listener<HTMLElementEventMap[N]>
  | Listener<any>

function invokeHandler<N extends keyof HTMLElementEventMap>(
  this: Element,
  handler: SomeListener<N> | Array<SomeListener<N>>,
  event?: Event
): void {
  if (typeof handler === 'function') { // 如果包装事件是函数，则调用该事件
    handler.call(this, event)
  } else if (typeof handler === 'object') { // 如果是数组，则调用每项事件
    for (let i = 0; i < handler.length; ++i) {
      invokeHandler.call(this, handler[i], event)
    }
  }
}

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
export class EventListener {
  public on: On // 事件代理池
  private _el: HTMLElement | Document | Window // 目标元素
  private _listenerMap: ListenerMap
  get el() { return this._el }

  constructor(el: HTMLElement | Document | Window, on?: On) {
    this.on = new Proxy<On>(on ?? {}, this._handle)
    this._el = el
    this._listenerMap = {}

    this._add()
  }

  /**
   * on 对象需要代理才能进行简单的添加删除事件操作，这是处理对象
   */
  private _handle: ProxyHandler<On> = {
    set: (on: On, event: string, listenerHandler: ListenerHandler) => {
      const isAdd = !Reflect.has(on, event)
      Reflect.set(on, event, listenerHandler)
      if (isAdd) {
        this._add(event)
      }
      return true
    },
    deleteProperty: (on: On, event: string) => {
      const isDel = Reflect.has(on, event)
      if (isDel) {
        this._delete(event)
      }
      return Reflect.deleteProperty(on, event)
    }
  }

  /**
   * 创建事件侦听器代理函数 handle ，handle 函数调用时会触发所有 this.on[eventTag]
   * @param {string} eventTag 事件名称
   * @returns {(event: Event) => void}
   */
  private _createListener(eventTag: string): (event: Event) => void {
    const self = this
    return function handle(this: Element, event: Event) {
      invokeHandler.call(this, self.on[eventTag], event)
    }
  }

  /**
   * 以 on 对象中的键为 _listenerMap 添加侦听器
   * @param {?string} event 事件名，不传则添加全部
   */
  private _add(event?: string) {
    if (event) {
      const listener = this._createListener(event)

      this.el.addEventListener(event, listener, false)
      this._listenerMap[event] = listener
    } else {
      const eventPool = Object.keys(this.on)
      for (let i = 0; i < eventPool.length; ++i) {
        const event = eventPool[i]
        const listener = this._createListener(event)

        this.el.addEventListener(event, listener, false)
        this._listenerMap[event] = listener
      }
    }
  }

  /**
   * 以 on 对象中的键删除 _listenerMap 中的侦听器
   * @param {?string} event 事件名，不传则删除全部
   */
  private _delete(event?: string) {
    if (event) {
      this.el.removeEventListener(event, this._listenerMap[event], false)
      delete this._listenerMap[event]
    } else {
      const eventPool = Object.keys(this._listenerMap)
      for (let i = 0; i < eventPool.length; ++i) {
        const event = eventPool[i]

        this.el.removeEventListener(event, this._listenerMap[event], false)
        delete this._listenerMap[event]
      }
    }
  }

  /**
   * 为 on 对象重新赋值，并移除所有侦听器，绑定新的侦听器
   * @param {On} on 
   */
  public reflect(on: On) {
    this._delete()
    this.on = new Proxy<On>(on, this._handle)
    this._add()
  }
}
