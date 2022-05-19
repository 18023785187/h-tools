
import { throttle, isMobile } from 'utils'

export interface Options {
  marginTop?: number, // 每个排列元素的上边距
  minMargin?: number, // 
  throttle?: number, // 在窗口尺寸改变时触发渲染的节流时间
}

type compose = { line: number, margin: number } // 排版格式类型

/**
 * 
 * @param {number} rootWidth 总宽度
 * @param {number} innerWidth 内容物宽度
 * @param {number} minMargin 
 * @returns {compose}
 */
function handleCompose(rootWidth: number, innerWidth: number, minMargin: number = 0): compose {
  let line = 1 // 定义每列列数
  if (rootWidth <= innerWidth + minMargin * 2) return { line, margin: minMargin }

  line = Math.floor(rootWidth / innerWidth) // 计算列数

  return (function handleMargin(line: number): compose {
    if (line < 1) return { line: 1, margin: minMargin }

    const margin = (rootWidth - (innerWidth * line)) / (line + 1)
    if (margin < minMargin) return handleMargin(line - 1)

    return { line, margin }
  })(line)
}

export class Waterfall {
  private options?: Options
  private el: HTMLElement // el
  private box: HTMLElement // 容器元素
  private children: HTMLCollection // 展示列表
  private pos: number
  private marginTop?: number
  private margin?: number
  private heights?: number[]

  constructor(el: HTMLElement, options?: Options) {
    this.options = options
    this.el = el
    this.pos = 0

    // 获取最新的 el 下面的第一个子元素作为容器
    if (!this.el.firstElementChild) {
      throw new Error(`el need a child element`)
    }
    this.box = this.el.firstElementChild as HTMLElement
    this.box.style.position = 'relative'
    this.children = this.box.children

    if (!isMobile()) { // 如果不是移动端，需要添加视口尺寸改变事件
      window.addEventListener(
        'resize',
        throttle(this.reset.bind(this, 200), (options?.throttle ?? 200))
      )
    }
  }

  // 处理options参数
  private handleOptions(): void {
    const width = this.el.clientWidth
    const childWidth = (this.children![0] as HTMLElement).offsetWidth

    const { marginTop, minMargin } = this.options ?? {}
    const { line, margin } = handleCompose(width, childWidth, minMargin)

    this.margin = margin
    this.marginTop = marginTop == null ? margin : marginTop
    this.heights = new Array(line).fill(0)
  }

  /**
   * 
   * @param {number} transition 动画时间，在排版时将会看到效果
   */
  private layout(transition: number = 0): void {
    const { box, children, heights, marginTop, margin } = this
    const childWidth: number = (children![0] as HTMLElement).offsetWidth

    for (let i = this.pos; i < this.children.length; ++i) {
      handler(i)
    }

    this.pos = this.children.length

    function handler(i: number): void {
      window.requestAnimationFrame(() => {
        (children[i] as HTMLElement).style.cssText += `position: absolute;`

        const tarIdx = heights!.indexOf(Math.min(...heights!));
        (children[i] as HTMLElement).style.cssText +=
          `
          transition: all ${transition}ms;
          transform: translate3d(${margin! * (tarIdx + 1) + childWidth * tarIdx
          }px,${marginTop! + heights![tarIdx]
          }px,0);
        `

        heights![tarIdx] += marginTop! + (children![i] as HTMLElement).offsetHeight
        box!.style.cssText +=
          `
          height: ${Math.max(...heights!) + margin!}px;
          transition: all ${transition}ms;
        `
      })
    }
  }

  public reset(transition: number = 0): void {
    this.pos = 0
    this.handleOptions()
    this.layout(transition)
  }

  public update(): void {
    this.layout()
  }
}
