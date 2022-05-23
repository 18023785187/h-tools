
import { Navigation, Options as NavOptions, amendmentNavOptions } from './Navigation'
import { checkType, throttle } from 'utils'

export { Options as NavOptions, Position } from './Navigation'
export { slideNavStyle } from './navStyle'

export type Options = {
  mode: boolean // 轮播模式，true 为横向，false 为纵向
  transition: number // 轮播动画过渡时间，单位秒
  delay: number // 轮播延时，单位 ms
  range: number // 触发范围，范围 0 ~ 100
  nav: boolean // 是否开启导航栏
  navOptions: NavOptions // 导航配置
  bindEvent: boolean // 是否绑定事件
  control: boolean // 是否显示控件
}

const defaultOptions: Options = {
  mode: true,
  transition: 200,
  delay: 3000,
  range: 10,
  nav: true,
  navOptions: {} as NavOptions, // 无法提前获知 length 属性，所以 defaultOptions 是一个不可用模版
  bindEvent: true,
  control: false,
}

type changeHook = (index?: number) => void

/**
 * 轮播图，支持横向和纵向，支持移动端和 pc 端
 */
export class Slide {
  private _el: HTMLElement
  private _elChild: HTMLElement
  private _children: HTMLElement[]
  private _options: Options
  private _navigation?: Navigation
  private _pos: number // 位置
  private _index: number // 当前索引
  private _timer?: number // 定时器
  private _changeHook: changeHook[] // change 事件发生时调用 hook

  constructor(el: HTMLElement, options?: { [key: string]: any }) {
    // 初始化节点
    this._el = el
    if (!el.firstElementChild) {
      throw new Error(`el need a child element`)
    }
    this._elChild = el.firstElementChild as HTMLElement
    this._children = [...this._elChild.children] as HTMLElement[]
    if (!this._children.length) {
      throw new Error(`no content`)
    }

    // 初始化配置项
    if (!checkType(options, 'object')) {
      this._options = { ...defaultOptions, navOptions: amendmentNavOptions({ length: this._children.length }) }
    } else {
      const { mode, transition, delay, range, nav, navOptions, bindEvent, control } = options!
      const newOptions = {} as Options

      newOptions.mode = checkType(mode, 'boolean') ? mode : defaultOptions.mode
      newOptions.transition = checkType(transition, 'number') ? transition : defaultOptions.transition
      newOptions.delay = checkType(delay, 'number') ? delay : defaultOptions.delay
      newOptions.range = checkType(range, 'number') ? range : defaultOptions.range
      newOptions.nav = checkType(nav, 'boolean') ? nav : defaultOptions.nav
      newOptions.navOptions = checkType(navOptions, 'object') ? amendmentNavOptions({ length: this._children.length, ...navOptions }) : amendmentNavOptions({ length: this._children.length })
      newOptions.bindEvent = checkType(bindEvent, 'boolean') ? bindEvent : defaultOptions.bindEvent
      newOptions.control = checkType(control, 'boolean') ? control : defaultOptions.control

      this._options = newOptions
    }

    this._pos = -100
    this._index = 0
    this._changeHook = [] as changeHook[]
    this._layout()
    this.openTimer()

    if (this._options.nav) {
      this._navigation = new Navigation(this._el, this._options.navOptions)
      this.subscribe((i: number) => this._navigation!.change(i))
    }
    if (this._options.bindEvent) {
      this._bindEvent()
    }
    if (this._options.control) {
      this._createControl()
    }
  }

  /**
   * 布局
   */
  private _layout() {
    const height: number = this._el.clientHeight

    this._el.style.display = 'none'
    this._el.style.cssText += 'position: relative;'

    // 新增头部和尾部子元素 start
    let childrenLen = this._children.length
    const childHead = this._children[0].cloneNode(true)
    const childTail = this._children[childrenLen - 1].cloneNode(true)

    this._elChild.insertBefore(childTail, this._elChild.firstElementChild)
    this._elChild.appendChild(childHead)

    this._children = [...this._elChild.children] as HTMLElement[]
    childrenLen += 2
    // 新增头部和尾部子元素 end

    // 初始化盒子的位置
    if (this._options.mode) {
      this._el.style.cssText += 'overflow: hidden;'
      this._elChild.style.cssText += `display: flex; transform: translate3d(${this._pos}%, 0, 0);`

      for (let i = 0; i < childrenLen; ++i) { // 遍历子元素，设置子元素的宽度恰好撑满 el
        const child = this._children[i]
        child.style.cssText += `flex: 1 0 auto; display: block; width: 100%;`
      }
    } else {
      this._el.style.cssText += 'overflow: hidden;'
      this._elChild.style.cssText += `transform: translate3d(0, ${this._pos}%, 0); height: ${height}px;`

      for (let i = 0; i < childrenLen; ++i) { // 遍历子元素，设置子元素的高度与 el 一致
        const child = this._children[i]
        child.style.cssText += `display: block; height: ${height}px;`
      }
    }

    this._el.style.display = ''
  }

  /**
   * 轮播过渡动画
   * @param {boolean} flag 是否启用过渡时间
   */
  private _transition(flag?: boolean, pos = this._pos) {
    const { mode, transition } = this._options
    if (mode) {
      this._elChild.style.cssText +=
        `transition: all ${flag ? transition : 0}ms; transform: translate3d(${pos}%, 0, 0);`
    } else {
      this._elChild.style.cssText +=
        `transition: all ${flag ? transition : 0}ms; transform: translate3d(0, ${pos}%, 0);`
    }
  }

  /**
   * 轮播发生方法
   */
  private _change() {
    const { transition } = this._options

    this._pos = -100 * this._index - 100
    this._transition(true)

    const childrenLen = this._children.length - 2 // 减去新增的首尾节点
    if (this._index >= childrenLen) { // 当位置超出范围时，重置位置
      this._index = 0
      this._pos = -100 * this._index - 100

      window.setTimeout(() => this._transition(), transition)
    } else if (this._index < 0) {
      this._index = childrenLen - 1
      this._pos = -100 * this._index - 100

      window.setTimeout(() => this._transition(), transition)
    }

    // 调用 change hook
    for (let i = 0, hookLen = this._changeHook.length; i < hookLen; ++i) {
      const hook = this._changeHook[i]
      hook(this._index)
    }
  }

  /**
   * 绑定手指滑动事件
   */
  private _bindEvent() {
    const self = this
    const { mode, range } = this._options

    this._el.addEventListener('touchstart', touchstart)
    this._el.addEventListener('touchmove', touchmove)
    this._el.addEventListener('touchend', touchend)

    // 计算的位置需要去除多个因素，以下因素都会影响手指滑动的位置
    const elCss = window.getComputedStyle(this._el)
    const elSize = mode ? this._el.clientWidth : this._el.clientHeight
    const elOffsetSize = mode ? this._el.getClientRects()[0].left : this._el.getClientRects()[0].top
    const elBorderSize = mode ?
      parseFloat(elCss.borderLeftWidth.substring(0, elCss.borderLeftWidth.length - 2)) :
      parseFloat(elCss.borderTopWidth.substring(0, elCss.borderTopWidth.length - 2))

    let startPos = 0
    let movePos = 0

    function touchstart(this: HTMLElement, e: TouchEvent): void {
      e.preventDefault()
      self.closeTimer()

      startPos = computePos(mode ? e.touches[0].pageX : e.touches[0].pageY)
    }
    function touchmove(this: HTMLElement, e: TouchEvent): void {
      movePos = computePos(mode ? e.touches[0].pageX : e.touches[0].pageY) - startPos
      self._transition(false, movePos + self._pos)
    }
    function touchend(this: HTMLElement): void {
      self.openTimer()

      if (movePos >= range) {
        self._index -= 1
      } else if (movePos <= -range) {
        self._index += 1
      }
      self._change()

      startPos = 0
      movePos = 0
    }

    /**
     * 计算当前位置的百分比
     * @param {number} pos 当前手指位置
     * @returns {number}
     */
    function computePos(pos: number): number {
      return Math.ceil(
        ((pos - elOffsetSize - elBorderSize) / elSize) * 100
      )
    }
  }

  /**
   * 创建控件
   */
  private _createControl() {
    const left = document.createElement('div')
    const right = document.createElement('div')
    const leftIcon = document.createElement('i')
    const rightIcon = document.createElement('i')

    left.style.cssText += `position: absolute; top: 50%; left: 0; width: 5%; height: 20%; display: flex; justify-content: center; align-items: center; transform: translate3d(0, -50%, 0); color: #ddd; background-color: rgba(0, 0, 0, 0.25); cursor: pointer;` 
    leftIcon.className = 'h-iconfont'
    leftIcon.innerHTML = '&#xe687;'
    left.appendChild(leftIcon)
    right.style.cssText += `position: absolute; top: 50%; right: 0; width: 5%; height: 20%; display: flex; justify-content: center; align-items: center; transform: translate3d(0, -50%, 0); color: #ddd; background-color: rgba(0, 0, 0, 0.25); cursor: pointer;`
    rightIcon.className = 'h-iconfont'
    rightIcon.innerHTML = '&#xe686;'
    right.appendChild(rightIcon)

    const moveLeft = throttle((e: Event) => { e.stopPropagation(); this.move(true) }, this._options.transition)
    const moveRight = throttle((e: Event) => { e.stopPropagation(); this.move(false) }, this._options.transition)
    left.addEventListener('click', (e) => moveLeft(e), false)
    left.addEventListener('touchstart', (e) => moveLeft(e), false)
    left.addEventListener('touchend', (e) => e.stopPropagation(), false)
    right.addEventListener('click', (e) => moveRight(e), false)
    right.addEventListener('touchstart', (e) => moveRight(e), false)
    right.addEventListener('touchend', (e) => e.stopPropagation(), false)

    this._el.appendChild(left)
    this._el.appendChild(right)
  }

  /**
   * 启动轮播图定时器
   */
  public openTimer() {
    this._timer = window.setInterval(() => {
      this._index += 1
      this._change()
    }, this._options.delay)
  }

  /**
   * 关闭轮播图定时器
   */
  public closeTimer() {
    window.clearInterval(this._timer)
  }

  /**
   * 订阅 change 事件
   * @param {changeHook} callback 
   */
  public subscribe(callback: changeHook) {
    this._changeHook.push(callback)
  }

  /**
   * 取消订阅 change 事件
   * @param {changeHook} callback 
   * @returns {boolean}
   */
  public unsubscribe(callback: changeHook): boolean {
    const i = this._changeHook.indexOf(callback)
    if (i !== -1) {
      this._changeHook.splice(i, 1)
      return true
    } else {
      return false
    }
  }

  /**
   * 向左或向右进行轮播一次
   * @param {boolean} direction 方向，true 为左，false 为右
   */
  public move(direction?: boolean) {
    this.closeTimer()
    this.openTimer()
    direction ? --this._index : ++this._index
    this._change()
  }

  /**
   * 更新子元素时刷新轮播图
   * @param {(elChild: HTMLElement) => void} updateChildren 需要在该函数内对子节点增删改查
   */
  public update(updateChildren: (elChild: HTMLElement) => void) {
    this._elChild.removeChild(this._children[0])
    this._elChild.removeChild(this._children[this._children.length - 1])

    updateChildren(this._elChild)
    this._children = [...this._elChild.children] as HTMLElement[]

    if (this._options.nav) {
      this._navigation!.setLength(this._children.length)
    }
    this._layout()
    this._change()
  }
}
