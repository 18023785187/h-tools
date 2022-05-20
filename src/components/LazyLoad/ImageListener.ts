
interface Options {
  preload: number,
  loading: string,
  error: string,
  attempt: number,
  viewport: { w: number, h: number },
}

/**
 * 劫持图片元素，可检测其是否处于视口再加载图片
 */
export default class ImageListener {
  private el: HTMLImageElement
  private src: string
  private options: Options

  constructor(
    el: HTMLImageElement,
    src: string | null,
    options: Options
  ) {
    this.el = el
    this.src = src || ''
    this.options = options
  }

  private _getDOMRect(el: HTMLImageElement): DOMRect {
    return el.getBoundingClientRect()
  }

  /**
   * 检查元素是否在视口中
   * @returns {boolean}
   */
  private _checkInView(): boolean {
    const { viewport, preload } = this.options
    const { top, right, bottom, left } = this._getDOMRect(this.el)
    const { w, h } = viewport

    return (top < h * preload && bottom > 0) && (left < w * preload && right > 0)
  }

  private _loadImg(resolve: () => void, reject: any): boolean {
    if (this._checkInView()) {
      const img = new Image()
      img.src = this.src
      img.onload = resolve
      img.onerror = reject
      return true
    }
    return false
  }

  /**
   * 暴露的接口，用于检测元素是否进入视口，如果进入视口，那么渲染该元素
   * @returns {boolean}
   */
  public load(): boolean {
    const { attempt } = this.options
    const resolve = () => { this.el.src = this.src }
    const reject = (e: MouseEvent, count = 1): void => {
      if (count === attempt) {
        this.el.src = this.options.error
        return
      }
      this._loadImg(resolve, reject.bind(this, e, ++count))
    }
    return this._loadImg(resolve, reject)
  }
}
