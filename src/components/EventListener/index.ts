

type Listener<T> = (ev: T) => void
type ListenerHandler = Listener<any> | Array<Listener<any>>

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
  | Array<Listener<HTMLElementEventMap>>
} & {
  [event: string]: ListenerHandler
}

type ListenerMap = {
  [N in keyof HTMLElementEventMap]?: Listener<HTMLElementEventMap[N]>
} & { [event: string]: Listener<any> }

/**
 * 创建事件侦听器代理函数 handle ，handle 函数调用时会触发所有 handler
 * @param {ListenerHandler} handler 代理池
 * @returns {(event: Event) => void}
 */
function createListener(handler: ListenerHandler) {
  return function handle(this: Element, event: Event) {
    if (typeof handler === 'function') {
      handler.call(this, event)
    } else {
      for (let i = 0; i < handler.length; ++i) {
        handler[i].call(this, event)
      }
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

    eventListener.on.dblclick = function() {} // 绑定了双击事件

    delete eventListener.on.dblclick // 解除了双击事件

    eventListener.reflect({ // 重置 on 对象
      click: [() => console.log(555)]
    })
 */
export class EventListener {
  public el: Element // 目标元素
  public on: On // 事件代理池
  private _listenerMap: ListenerMap

  constructor(el: Element, on?: On) {
    this.el = el
    this.on = new Proxy<On>(on ?? {}, this._handle)
    this._listenerMap = {}

    this.add()
  }

  /**
   * 为 on 对象重新赋值，并移除所有侦听器
   * @param {On} on 
   */
  public reflect(on: On) {
    this.delete()
    this.on = new Proxy<On>(on, this._handle)
    this.add()
  }

  /**
   * on 对象需要代理才能进行简单的添加删除事件操作，这是处理对象
   */
  private _handle: ProxyHandler<On> = {
    set: (on: On, event: string, listenerHandler: ListenerHandler) => {
      const isAdd = !Reflect.has(on, event)
      Reflect.set(on, event, listenerHandler)
      if (isAdd) {
        this.add(event)
      }
      return true
    },
    deleteProperty: (on: On, event: string) => {
      const isDel = Reflect.has(on, event)
      if (isDel) {
        this.delete(event)
      }
      return Reflect.deleteProperty(on, event)
    }
  }

  /**
   * 以 on 对象中的键为 _listenerMap 添加侦听器
   * @param {?string} event 事件名，不传则添加全部
   */
  private add(event?: string) {
    const self = this

    if (event) {
      const listener = createListener(self.on[event])

      this.el.addEventListener(event, listener, false)
      this._listenerMap[event] = listener
    } else {
      const eventPool = Object.keys(this.on)
      for (let i = 0; i < eventPool.length; ++i) {
        const event = eventPool[i]
        const listener = createListener(self.on[event])

        this.el.addEventListener(event, listener, false)
        this._listenerMap[event] = listener
      }
    }
  }

  /**
   * 以 on 对象中的键删除 _listenerMap 中的侦听器
   * @param {?string} event 事件名，不传则删除全部
   */
  private delete(event?: string) {
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
}
