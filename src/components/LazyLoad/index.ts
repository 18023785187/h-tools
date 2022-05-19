
import ImageListener from './ImageListener'
import ListNode from './ListNode'
import { checkType, throttle } from 'utils'

/**
 * 找有指定属性并且指定属性有指定值的父亲
 * @param {HTMLElement | null} parent 父元素
 * @param {string} prop 属性 
 * @param {string} value 属性值 
 * @returns {(Window & typeof globalThis) | HTMLElement} 如果有指定父元素，那么返回父元素，否则返回 window
 */
function searchParent(parent: HTMLElement | null, prop: string, value: string): (Window & typeof globalThis) | HTMLElement {
  while (parent) {
    try {
      if ((getComputedStyle(parent) as any)[prop] === value) break
    } catch (e) {
      parent = <HTMLElement | null>parent.parentNode
      break
    }
    parent = <HTMLElement | null>parent.parentNode
  }
  return parent === null ? window : parent
}

interface Options {
  preload?: number, /* 预加载的宽高 */
  loading?: string, /* 加载中的显示的图片的路径 */
  error?: string, /* 加载失败时现实的图片的路径 */
  attempt?: number, /* 失败后尝试加载的次数 */
  throttle?: number,  /* 节流时间 */
  eventListener?: Array<string> /* 需要监听的事件 */
}

export class LazyLoad {
  private options: Options
  private listNode: ListNode<ImageListener>
  private viewport: { w: number, h: number }
  public render: LazyLoad['_render']

  constructor(options?: Options) {
    this.options = this.handleOptions(options)
    this.viewport = { w: window.innerWidth, h: window.innerHeight }
    this.listNode = new ListNode()
    this.render = throttle(this._render.bind(this), this.options.throttle)
    this.update()
    this.render()

    window.addEventListener(
      'resize',
      throttle(
        () => {
          this.viewport = { w: window.innerWidth, h: window.innerHeight }
        },
        this.options.throttle
      )
    )
  }

  // 处理options参数
  private handleOptions(options?: Options): Options {
    if (!options) return {
      preload: 1,
      loading: '',
      error: '',
      attempt: 3,
      throttle: 300,
      eventListener: ['scroll']
    }

    let {
      preload,
      loading,
      error,
      attempt,
      throttle,
      eventListener
    } = options

    !checkType(preload, 'number') && (preload = 1)
    !checkType(loading, 'string') && (loading = '')
    !checkType(error, 'string') && (error = '')
    !checkType(attempt, 'number') && (attempt = 3)
    !checkType(throttle, 'number') && (throttle = 200)
    !checkType(eventListener, 'array') && (eventListener = ['scroll'])

    return {
      preload,
      loading,
      error,
      attempt,
      throttle,
      eventListener
    }
  }

  /**
   * 渲染
   */
  private _render(): void {
    window.requestAnimationFrame(() => {
      this.listNode.forEach((listener) => {
        listener.load() && this.listNode.remove(listener)
      })
    })
  }

  /**
   * 更新 ImageListener
   */
  public update(): void {
    const options = this.options
    const oImg: NodeListOf<HTMLImageElement> = document.querySelectorAll('[data-src]')

    oImg.forEach(img => {
      if (img.tagName === 'IMG') {
        img.src = this.options.loading as string
        const el: HTMLImageElement = img
        const src = img.getAttribute('data-src')

        img.removeAttribute('data-src')

        this.listNode.add(new ImageListener(
          el,
          src,
          {
            preload: options.preload!,
            loading: options.loading!,
            error: options.error!,
            attempt: options.attempt!,
            viewport: this.viewport,
          }
        ))

          ; (options.eventListener as string[]).forEach(event => {
            const parent = searchParent(img.parentNode as (HTMLElement | null), 'overflow', 'srcoll')

            parent.addEventListener(event, this.render)
          })
      }
    })

    this.render()
  }
}
