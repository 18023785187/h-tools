
import { config } from '../typing'
import insertHeadAndTail from '../insertHeadAndTail'
import transform from '../transform'

class Cross {
    constructor(el: HTMLElement, options: config) {
        this.el = el
        this.options = options
        this.children = []
        this.pos = -100
        this.point = 0
        this.changeEvent = []
        this.layout()
        this.setTimer()
        options.bindEvent && this.bindTouchEvent()
    }
    public options: config
    private el: HTMLElement
    private children: HTMLElement[]
    private pos: number
    private point: number
    private timer?: number
    private changeEvent: ((i: number) => void)[]

    private layout(): void {
        const { el } = this
        const {
            box,
            children
        } = this.options

        el.style.display = 'none'

        this.children = insertHeadAndTail(box, children)

        el.style.cssText += `
            overflow: hidden;
        `
        box.style.cssText += `
            display: flex;
            transform: translate3d(${this.pos}%,0,0)
        `
        this.children.forEach(child => {
            child.style.cssText += `
                flex: 1 0 auto;
                display: block;
                width: 100%;
            `
        })

        el.style.display = ''
    }

    private change(): void {
        window.requestAnimationFrame(() => {
            const {
                box,
                transition,
                children
            } = this.options,
                { changeEvent } = this

            this.pos = -100 * this.point - 100
            transform(box, [this.pos, 0], transition)

            if (this.point >= children.length) {
                this.point = 0
                this.pos = -100 * this.point - 100
                changeEvent.forEach(callback => callback(this.point))

                window.setTimeout(() => {
                    transform(box, [this.pos, 0], 0)
                }, transition)
                return
            } else if (this.point < 0) {
                this.point = children.length - 1
                this.pos = -100 * this.point - 100
                changeEvent.forEach(callback => callback(this.point))

                window.setTimeout(() => {
                    transform(box, [this.pos, 0], 0)
                }, transition)
                return
            }

            changeEvent.forEach(callback => callback(this.point))
        })
    }
    private bindTouchEvent(): void {
        const self = this
        const { el } = this,
            { box, triggerPos } = this.options
        el.addEventListener('touchstart', touchstart)
        el.addEventListener('touchmove', touchmove)
        el.addEventListener('touchend', touchend)

        const css: CSSStyleDeclaration = window.getComputedStyle(el)
        const elWidth: number = el.clientWidth
        const elOffsetLeft: number = el.getClientRects()[0].left
        const borderLeft: number = parseFloat(css.borderLeftWidth.substring(0, css.borderLeftWidth.length - 2))

        let startPos: number = 0,
            movePos: number = 0

        function touchstart(e: TouchEvent): void {
            e.preventDefault()
            self.clearTimer()
            startPos = countPos(e.touches[0].pageX)
        }
        function touchmove(e: TouchEvent): void {
            movePos = countPos(e.touches[0].pageX) - startPos
            transform(box, [movePos + self.pos, 0])
        }
        function touchend(): void {
            self.setTimer()
            if (movePos >= triggerPos) {
                --self.point
            } else if (movePos <= -triggerPos) {
                ++self.point
            }
            self.change()
            startPos = 0,
                movePos = 0
        }
        function countPos(pos: number): number {
            return (Math.ceil(
                (
                    (
                        pos - elOffsetLeft - borderLeft
                    ) / elWidth
                ) * 100
            ))
        }
    }

    public onchange(callback: (pos: number) => void): void {
        this.changeEvent.push(callback)
    }
    public moveChange(movePos: 'left' | 'right'): void {
        movePos === 'left' ? --this.point : ++this.point
        this.change()
    }
    public setTimer(): void {
        const { triggerTime } = this.options
        this.timer = window.setInterval(() => {
            ++this.point
            this.change()
        }, triggerTime)
    }
    public clearTimer(): void {
        window.clearInterval(this.timer)
    }
    public update(updateChildCallback: (box: HTMLElement) => void): void {
        const { box, nav } = this.options
        const { options, children } = this

        box.removeChild(children[0])
        box.removeChild(children[children.length - 1])

        updateChildCallback(box)

        options.children = <HTMLElement[]>Array.from(box.children)

        if (nav) {
            nav.layout(options.children.length)
        }
        this.layout()

        this.change()
    }
}

export default Cross
