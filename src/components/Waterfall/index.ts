
import { throttleDebounce, isMobile } from 'utils'

export interface Options {
  marginTop?: number, // 每个排列元素的上边距
  minMargin?: number, // 
  throttle?: number, // 在窗口尺寸改变时触发渲染的节流时间
}

type compose = { line: number, margin: number } // 排版格式类型

/**
 * 根据给定条件计算列数和外边距
 * @param {number} rootWidth 总宽度
 * @param {number} innerWidth 内容物宽度
 * @param {number} minMargin 外边距的最小值，最终得出的外边距只能大于或等于这个值
 * @returns {compose}
 */
function handleCompose(rootWidth: number, innerWidth: number, minMargin: number = 0): compose {
  let line = 1 // 定义每列列数
  // 如果一个内容物 + 两个最小外边距大于或等于容器宽度，那么外边距是 options 的设定值
  if (rootWidth <= innerWidth + minMargin * 2) return { line, margin: minMargin }

  line = Math.floor(rootWidth / innerWidth) // 计算列数

  return (function handleMargin(line: number): compose {
    if (line < 1) return { line: 1, margin: minMargin }

    const margin = (rootWidth - (innerWidth * line)) / (line + 1) // 计算外边距
    if (margin < minMargin) return handleMargin(line - 1) // 如果计算出的外边距小于设定值，则牺牲一行重新计算

    return { line, margin }
  })(line)
}

export class Waterfall {
  private _options?: Options // 配置项
  private _el: HTMLElement // el
  private _box: HTMLElement // 容器元素
  private _children: HTMLCollection // 展示列表
  private _pos: number // 当前已布局到的内容物的索引
  private _marginTop?: number // 上边距
  private _margin?: number // 左右边距
  private _heights: number[] // 每列高度数组，每个内容物排序都会插入最小高度的那列

  constructor(el: HTMLElement, options?: Options) {
    this._options = options
    this._el = el
    this._pos = 0

    // 获取最新的 el 下面的第一个子元素作为容器
    if (!this._el.firstElementChild) {
      throw new Error(`el need a child element`)
    }
    this._box = this._el.firstElementChild as HTMLElement
    this._box.style.position = 'relative'
    this._children = this._box.children

    this._heights = []

    if (!isMobile()) { // 如果不是移动端，需要添加视口尺寸改变事件重置瀑布流布局
      window.addEventListener(
        'resize',
        throttleDebounce(this.reset.bind(this, 200), (options?.throttle ?? 200))
      )
    }
  }

  // 处理options参数
  private _handleOptions(): void {
    const width = this._el.clientWidth
    const childWidth = (this._children[0] as HTMLElement).offsetWidth

    const { marginTop, minMargin } = this._options ?? {}
    const { line, margin } = handleCompose(width, childWidth, minMargin) // 得出列数和外边距

    this._margin = margin
    this._marginTop = marginTop == null ? margin : marginTop // 如果设定了上外边距，那么使用设定值
    this._heights = new Array(line).fill(0) // 初始化每列高度
  }

  /**
   * 从 pos 项开始布局内容物
   * @param {number} transition 动画时间，在排版时将会看到效果
   */
  private _layout(transition: number = 0): void {
    const { _box, _children, _heights, _marginTop, _margin } = this
    const childWidth: number = (_children[0] as HTMLElement).offsetWidth

    for (; this._pos < this._children.length; ++this._pos) {
      handler(this._pos)
    }

    /**
     * 布局处理
     * @param {number} i 当前处理项的索引
     */
    function handler(i: number): void {
      window.requestAnimationFrame(() => {
        (_children[i] as HTMLElement).style.cssText += `position: absolute;` // 设置绝对定位，使元素统一起点位置

        const insert = _heights.indexOf(Math.min(..._heights)); // 获取当前插入位置
        (_children[i] as HTMLElement).style.cssText += // 放置内容物到结果位置
          `
          transition: all ${transition}ms;
          transform: translate3d(${_margin! * (insert + 1) + childWidth * insert
          }px,${_marginTop! + _heights[insert]
          }px,0);
        `

        // 刷新容器的高度
        _heights[insert] += _marginTop! + (_children[i] as HTMLElement).offsetHeight
        _box.style.cssText +=
          `
          height: ${Math.max(..._heights) + _margin!}px;
          transition: all ${transition}ms;
        `
      })
    }
  }

  /**
   * 重置布局，在刷新、插入、删除的情况下使用
   * @param {number} transition 动画时间，在排版时将会看到效果
   */
  public reset(transition: number = 0): void {
    this._pos = 0 // 重置索引
    this._handleOptions() // 重置配置项
    this._layout(transition) // 布局
  }

  /**
   * 更新，当有新的内容物时需要调用更新方法使新内容物布局，在推入的情况下使用
   */
  public update(): void {
    this._layout()
  }
}
