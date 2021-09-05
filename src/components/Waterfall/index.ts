
import handlerMargin from "./handlerMargin"
import forEach from "./forEach"
import getMinOfArrayLine from "./getMinOfArrayLine"
import resize from "./resize"
import {
    throttle
} from 'utils'

class Waterfall {
    constructor(
        el: HTMLElement,
        options?: {
            marginTop?: number,
            minMargin?: number,
            throttle?: number
        }
    ) {
        this.options = options
        this.el = el
        this.pos = 0
        this.updateChild()

        resize(throttle(this.reset.bind(this, 200), (options?.throttle ?? 200)))
    }
    private options?: {
        marginTop?: number,
        minMargin?: number,
        throttle?: number
    }
    private el: HTMLElement
    private box?: HTMLElement
    private children?: HTMLCollection
    private marginTop?: number
    private margin?: number
    private listNumber?: number
    private heightArr?: number[]
    private pos: number

    private handlerOptions(): void {
        const width: number = this.el.clientWidth,
            childWidth: number = (this.children![0] as HTMLElement).offsetWidth;

        const {
            marginTop,
            minMargin
        } = this.options ?? {}
        const {
            margin,
            listNumber
        } = handlerMargin(width, childWidth, minMargin)

        this.margin = margin,
            this.listNumber = listNumber

        if (marginTop == null) {
            this.marginTop = margin
        } else {
            this.marginTop = marginTop
        }

        this.heightArr = new Array(listNumber).fill(0)
    }
    private updateChild(): void {
        if (!this.el.firstElementChild) {
            throw new Error(`el need a child element`)
        }
        this.box = <HTMLElement>this.el.firstElementChild
        this.box.style.position = 'relative'
        this.children = this.box.children
    }
    private layout(transition: number = 0): void {
        const {
            box,
            children,
            pos,
            heightArr,
            marginTop,
            margin
        } = this;
        const childWidth: number = (children![0] as HTMLElement).offsetWidth
        forEach(pos, children!.length, (i: number) => {
            window.requestAnimationFrame(handler.bind(this, i))
        })
        this.pos = children!.length

        function handler(i: number): void {
            ; (children![i] as HTMLElement)
                .style
                .position = 'absolute';

            const tarIdx: number = getMinOfArrayLine(<number[]>heightArr);
            (children![i] as HTMLElement).style.cssText += `
                transition: all ${transition}ms;
                transform: translate3d(${<number>margin * (tarIdx + 1) + childWidth * tarIdx}px,${<number>marginTop + heightArr![tarIdx]}px,0);
            `

            heightArr![tarIdx] += <number>marginTop + (children![i] as HTMLElement).offsetHeight;
            box!.style.cssText += `
                height: ${Math.max(...<number[]>heightArr) + <number>margin}px;
                transition: all ${transition}ms;
            `
        }
    }
    public reset(transition: number = 0): void {
        this.pos = 0
        this.handlerOptions()
        this.layout(transition)
    }
    public update(): void {
        this.layout()
    }
}

export default Waterfall
