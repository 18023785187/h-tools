
import { slideNavStyle } from './navStyle'
import { checkType, throttleDebounce } from 'utils'

export enum Position {
  top = 'Top',
  right = 'Right',
  bottom = 'Bottom',
  left = 'Left',
}

export type Options = {
  style: string, // 导航点样式
  highStyle: string, // 导航点高亮样式
  position: Position, // 放置位置
  range: number, // 放置位置的方位，范围 0 ~ 1
  length: number, // 导航点的数量
}

const defaultOptions: Options = {
  style: slideNavStyle.default.style,
  highStyle: slideNavStyle.default.highStyle,
  position: Position.bottom,
  range: 0.5,
  length: 0,
}

export const amendmentNavOptions = function (options: { [key: string]: any }): Options {
  const { style, highStyle, position, range, length } = options
  const newOptions = {} as Options

  newOptions.style = checkType(style, 'string') ? style : defaultOptions.style
  newOptions.highStyle = checkType(highStyle, 'string') ? highStyle : defaultOptions.highStyle
  newOptions.position = ['Top', 'Right', 'Bottom', 'Left'].includes(position) ? position : defaultOptions.position
  newOptions.range = checkType(range, 'number') ? range : defaultOptions.range
  newOptions.length = length

  return newOptions
}

/**
 * 轮播图导航栏
 */
export class Navigation {
  private _el: HTMLElement
  private _options: Options
  private _navList: HTMLElement // 导航栏元素
  private _prevIndex: number // 上一次高亮导航点，用于恢复样式

  constructor(el: HTMLElement, options: Options) {
    this._el = el
    this._options = options

    const width = this._el.clientWidth
    const navItemSize = width * 0.02 // 设定导航点尺寸为内容宽度的 0.02 倍

    const navList = document.createElement('div')
    navList.className = 'slide-navList'

    for (let i = 0; i < this._options.length; ++i) {
      const navItem = document.createElement('div')
      navItem.className = 'slide-navItem'
      navItem.style.cssText += `width: ${navItemSize}px; height: ${navItemSize}px;`
      navItem.style.cssText += i ? this._options.style : this._options.highStyle

      navList.appendChild(navItem)
    }
    this._el.appendChild(navList)

    this._navList = navList
    this._prevIndex = 0

    this._layout()

    const layout = throttleDebounce(this._layout, 200)
    window.addEventListener('resize', () => {
      layout.call(this)
    })
  }

  /**
   * 对导航栏布局
   */
  private _layout() {
    const { position, range } = this._options

    this._el.style.cssText += 'position: relative;'

    const width = this._el.clientWidth
    const navItemSize = width * 0.02
    const navItems = this._navList.children
    for (let i = 0; i < this._options.length; ++i) {
      (navItems[i] as HTMLElement).style.cssText += `width: ${navItemSize}px; height: ${navItemSize}px;`
    }

    if (position === Position.top) {
      this._navList.style.cssText += `
        display: flex;
        position: absolute;
        top: 0;
        z-index: 999;
      `
      this._navList.style.cssText += `left: ${(this._el.clientWidth - this._navList.clientWidth) * range}px;`
    } else if (position === Position.right) {
      this._navList.style.cssText += `
        position: absolute;
        right: 0;
        z-index: 999;
      `
      this._navList.style.cssText += `top: ${(this._el.clientHeight - this._navList.clientHeight) * range}px;`
    } else if (position === Position.bottom) {
      this._navList.style.cssText += `
        display: flex;
        position: absolute;
        bottom: 0;
        z-index: 999;
      `
      this._navList.style.cssText += `left: ${(this._el.clientWidth - this._navList.clientWidth) * range}px;`
    } else if (position === Position.left) {
      this._navList.style.cssText += `
        position: absolute;
        left: 0;
        z-index: 999;
      `
      this._navList.style.cssText += `top: ${(this._el.clientHeight - this._navList.clientHeight) * range}px;`
    }
  }

  /**
   * 高亮指定索引导航点
   * @param {number} index 
   */
  public change(index: number) {
    const navItems = this._navList.children;
    (navItems[this._prevIndex] as HTMLElement).style.cssText += this._options.style;
    (navItems[index] as HTMLElement).style.cssText += this._options.highStyle;
    this._prevIndex = index;
  }

  /**
   * 设置导航点长度
   * @param {number} length 
   */
  public setLength(length: number) {
    this.change(0)

    if (this._options.length > length) {
      for (let i = 0; i < this._options.length - length; ++i) {
        this._navList.removeChild(this._navList.children[this._navList.children.length - 1])
      }
    } else if (this._options.length < length) {
      const width = this._el.clientWidth
      const navItemSize = width * 0.02
      for (let i = 0; i < length - this._options.length; ++i) {
        const navItem = document.createElement('div')
        navItem.className = 'slide-navItem'
        navItem.style.cssText += `width: ${navItemSize}px; height: ${navItemSize}px;`
        navItem.style.cssText += this._options.style

        this._navList.appendChild(navItem)
      }
    }

    this._options.length = length
    this._layout()
  }
}
