
import { checkType, throttle } from 'utils'

export type Options = {
  speed: number // 速率，必须大于 0，默认值为 1
}

const defaultOptions = {
  speed: 1
}

enum Run {
  min = 0,
  max = 50,
  step = 0.05,
}

/**
 * 走马灯，用于商品展示
 */
export class Carousel {
  private _options: Options
  private _el: HTMLElement
  private _elChild: HTMLElement
  private _pos: number // 位置，单位 %
  private _flag: boolean // 动画阀
  private _scrollBar!: HTMLElement // 滑块条
  private _barWidth!: number // 滑块条宽度
  private _pointsWidth!: number // 滑块宽度
  private _end!: number // 记录每次动画的最后位置
  public destroy: () => void // 销毁时执行的回收方法
  constructor(el: HTMLElement, options?: Options) {
    this._el = el
    if (!el.firstElementChild) {
      throw new Error(`el need a child element`)
    }
    this._elChild = el.firstElementChild as HTMLElement

    // 初始化配置项
    if (!checkType(options, 'object')) {
      this._options = { ...defaultOptions }
    } else {
      const { speed } = options!
      const newOptions = {} as Options

      newOptions.speed = checkType(speed, 'number') ? speed : defaultOptions.speed
      if(newOptions.speed <= 0) {
        throw new Error('The speed has to be greater than zero')
      }

      this._options = newOptions
    }

    this._pos = 0
    this._flag = true
    this._layout()
    this._createScroll()
    this.destroy = this._bindEvent()
    this._run()
  }

  /**
   * 初始化布局
   */
  private _layout() {
    this._el.style.display = 'none'
    this._el.style.cssText += `position: relative; overflow: hidden;`
    this._elChild.style.cssText += `display: flex; float: left;` // 浮动脱离文档流

    // 对所有子元素进行克隆并放置到末尾
    const children = this._elChild.children
    for (let i = 0, len = children.length; i < len; ++i) {
      const child = children[i].cloneNode(true)
      this._elChild.appendChild(child)
    }
    this._el.style.display = ''
  }

  /**
   * 创建滚动条
   */
  private _createScroll() {
    const scrollBar = document.createElement('div')
    scrollBar.className = 'carousel-scroll-bar'

    const scrollPoints = document.createElement('div')
    scrollPoints.className = 'carousel-scroll-points'

    scrollBar.appendChild(scrollPoints)
    this._el.appendChild(scrollBar)

    this._scrollBar = scrollBar
    this._barWidth = this._scrollBar.clientWidth
    this._pointsWidth = this._scrollBar.firstElementChild!.clientWidth
  }

  /**
   * 绑定事件
   * @returns {() => void} 销毁解绑事件
   */
  private _bindEvent(): () => void {
    // 鼠标移入停止，移出动画 start
    let timer: NodeJS.Timeout
    const stop = () => {
      clearTimeout(timer)
      this._flag = false

      this._scrollBar.style.opacity = '1'
    }
    const run = () => {
      timer = setTimeout(() => { // 延时确保鼠标真正移出
        this._flag = true
        this._run()

        this._scrollBar.style.opacity = '0'
      }, 100)
    }
    this._el.addEventListener('mousemove', stop)
    this._el.addEventListener('mouseout', run)
    // 鼠标移入停止，移出动画 end

    // 拖动滑块 start
    const points = this._scrollBar.firstElementChild as HTMLElement
    let start: number | undefined
    let move: number
    // 鼠标点击
    const pointsMousedown = (e: MouseEvent) => {
      e.preventDefault()
      start = e.pageX
    }
    // 鼠标移动
    const pointsMousemove = (e: MouseEvent) => {
      if (!start) return

      move = e.pageX - start + this._end
      if (move < 0) {
        move = 0
      } else if (move > this._barWidth - this._pointsWidth) {
        move = this._barWidth - this._pointsWidth
      }
      points.style.transform = `translate3d(${move}px, -40%, 0)`
      this._pos = (move / (this._barWidth - this._pointsWidth)) * 50
      this._elChild.style.transform = `translate3d(-${this._pos}%, 0, 0)`

      stop()
    }
    // 鼠标松开
    const pointsMouseup = (e: MouseEvent) => {
      start = undefined
      this._end = move

      run()
    }
    points.addEventListener('mousedown', pointsMousedown)
    document.addEventListener('mousemove', pointsMousemove)
    document.addEventListener('mouseup', pointsMouseup)
    // 拖动滑块 end

    // 窗口重置刷新滑块宽度 start
    const resize = throttle(() => {
      this._barWidth = this._scrollBar.clientWidth
      this._pointsWidth = this._scrollBar.firstElementChild!.clientWidth
    }, 200)
    window.addEventListener('resize', resize)
    // 窗口重置刷新滑块宽度 end

    // 返回销毁时调用的清理方法
    return () => {
      document.removeEventListener('mousemove', pointsMousemove)
      document.removeEventListener('mouseup', pointsMouseup)
      window.removeEventListener('resize', resize)
    }
  }

  /**
   * 更新位置并执行 run
   */
  private _update() {
    if (!this._flag) return

    this._pos += Run.step * this._options.speed
    if (this._pos >= Run.max) {
      this._pos = Run.min
    }
    this._elChild.style.transform = `translate3d(-${this._pos}%, 0, 0)`
    this._end = (this._barWidth - this._pointsWidth) * this._pos / 50
    const points = this._scrollBar.firstElementChild as HTMLElement
    points.style.transform = `translate3d(${this._end}px, -40%, 0)`

    this._run()
  }

  /**
   * 执行 update
   */
  private _run() {
    requestAnimationFrame(this._update.bind(this))
  }
}
