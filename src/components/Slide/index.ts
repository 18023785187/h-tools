
import Cross from './Cross'
import Vertical from './Vertical'
import Nav from './Nav'
import { options, config } from './typing'
import { checkType } from 'utils'

const handlerOptions = Symbol('handlerOptions')

export const Slide = {
  create(
    el: HTMLElement,
    options?: options
  ): Cross | Vertical {
    options = this[handlerOptions](el, options)

    const slide = options.transverse ? (new Cross(el, <config>options)) : (new Vertical(el, <config>options));

    (options as config).nav && (slide.onchange((options as config).nav!.update))

    return slide
  },
  // 处理options参数
  [handlerOptions](el: HTMLElement, options?: options): config {
    let transverse: boolean = true,
      createNav: boolean = true,
      transition: number = 200,
      triggerTime: number = 3000,
      triggerPos: number = 10,
      bindEvent: boolean = true

    checkType(options?.transverse, 'boolean') && (transverse = <boolean>options!.transverse);
    checkType(options?.createNav, 'boolean') && (createNav = <boolean>options!.createNav);
    checkType(options?.transition, 'number') && (transition = <number>options!.transition);
    checkType(options?.triggerTime, 'number') && (triggerTime = <number>options!.triggerTime);
    checkType(options?.triggerPos, 'number') && (triggerPos = <number>options!.triggerPos);
    checkType(options?.bindEvent, 'boolean') && (bindEvent = <boolean>options!.bindEvent);

    if (!el.firstElementChild) {
      throw new Error(`el need a child element`)
    }
    const box: HTMLElement = <HTMLElement>el.firstElementChild,
      children: HTMLElement[] = <HTMLElement[]>Array.from(box.children)

    const nav = createNav ? new Nav(el, children.length) : undefined

    return {
      nav,
      box,
      children,
      transverse,
      transition,
      triggerTime,
      triggerPos,
      bindEvent
    }
  }
}
