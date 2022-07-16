import ImageListener from './ImageListener'
import ListNode from './ListNode'
import { checkType, throttleDebounce } from 'utils'

/**
 * 找有指定属性并且指定属性有指定值的父亲
 * @param {HTMLElement | null} parent 父元素
 * @param {string[]} props 属性链
 * @param {string} value 属性值 
 * @returns {(Window & typeof globalThis) | HTMLElement} 如果有指定父元素，那么返回父元素，否则返回 window
 */
function searchParent(parent: HTMLElement | null, props: string[], value: string): (Window & typeof globalThis) | HTMLElement {
  while (parent) {
    try {
      let flag = false
      for (let i = 0; i < props.length; ++i) {
        const prop = props[i]
        if ((getComputedStyle(parent) as any)[prop] === value) {
          flag = true
          break
        }
      }
      if (flag) break
    } catch (e) {
      parent = parent.parentNode as HTMLElement | null
      break
    }
    parent = parent.parentNode as HTMLElement | null
  }
  return parent === null ? window : parent
}

export interface Options {
  preload?: number, /* 预加载的宽高 */
  loading?: string, /* 加载中的显示的图片的路径 */
  error?: string, /* 加载失败时现实的图片的路径 */
  attempt?: number, /* 失败后尝试加载的次数 */
  throttle?: number,  /* 节流时间 */
  eventListener?: Array<keyof HTMLElementEventMap> /* 需要监听的事件 */
}

/**
 * 把属性中带有 data-src 的图片元素添加到监听链表中，当元素进入视口时将渲染该图片
 */
export class LazyLoad {
  private _options: Options
  private _listNode: ListNode<ImageListener>
  private _viewport: { w: number, h: number }
  public render: LazyLoad['_render']

  constructor(options?: Options) {
    this._options = this._handleOptions(options)
    this._listNode = new ListNode()
    this._viewport = { w: window.innerWidth, h: window.innerHeight }
    this.render = throttleDebounce(this._render.bind(this), this._options.throttle)
    this.update()
    this.render()

    // 视口尺寸改变时需要更新视口范围的判断依据
    window.addEventListener(
      'resize',
      throttleDebounce(
        () => {
          this._viewport = { w: window.innerWidth, h: window.innerHeight }
        },
        this._options.throttle
      )
    )
  }

  // 处理options参数
  private _handleOptions(options?: Options): Options {
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
      this._listNode.forEach((listener) => {
        listener.load() && this._listNode.remove(listener)
      })
    })
  }

  /**
   * 更新 ImageListener 并进行一次渲染
   */
  public update(): void {
    const options = this._options
    const oImg: NodeListOf<HTMLImageElement> = document.querySelectorAll('[data-src]')

    oImg.forEach(img => {
      if (img.tagName === 'IMG') {
        img.src = this._options.loading!
        const el = img
        const src = img.getAttribute('data-src')

        img.removeAttribute('data-src')

        this._listNode.add(
          new ImageListener( // 劫持该元素
            el,
            src,
            {
              preload: options.preload!,
              loading: options.loading!,
              error: options.error!,
              attempt: options.attempt!,
              viewport: this._viewport,
            }
          )
        )

        // 如果当前元素的祖父元素可以滑动，那么添加渲染事件
        options.eventListener!.forEach(event => {
          searchParent(
            img.parentNode as (HTMLElement | null),
            ['overflow', 'overflow-x', 'overflow-y'],
            'scroll'
          ).addEventListener(event, this.render) // addEventListener 对于相同函数只绑定一次
        })
      }
    })

    this.render() // 更新后触发一次 render，把处在视口中的元素渲染
  }
}
