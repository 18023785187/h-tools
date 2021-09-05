
import { config } from '../typing'
import insertHeadAndTail from '../insertHeadAndTail'
import transform from '../transform'

class Vertical {
    constructor(el: HTMLElement, options: config) {
        this.el = el
        this.options = options
        this.children = []
        this.pos = 0
        this.point = 0
        this.changeEvent = []
        this.layout()
        this.setTimer()
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

        const height: number = el.clientHeight

        el.style.display = 'none'

        this.children = insertHeadAndTail(box, children)
        this.pos = -100

        el.style.cssText += `
            position: relative;
            overflow: hidden;
        `
        box.style.cssText += `
            transform: translate3d(0,${this.pos}%,0);
            height: ${height}px;
        `
        this.children.forEach(child => {
            child.style.cssText += `
                display: block;
                height: ${height}px;
            `
        })

        el.style.display = ''
    }

    private setTimer(): void {
        const { triggerTime } = this.options
        this.timer = window.setInterval(() => {
            ++this.point
            this.change()
        }, triggerTime)
    }
    private change(): void {
        window.requestAnimationFrame(() => {
            const {
                box,
                transition,
                children
            } = this.options
            const { changeEvent } = this


            this.pos = -100 * this.point - 100
            transform(box, [0, this.pos], transition)

            if (this.point >= children.length) {
                this.point = 0
                this.pos = -100 * this.point - 100
                changeEvent.forEach(callback => callback(this.point))

                window.setTimeout(() => {
                    transform(box, [0, this.pos], 0)
                }, transition)
                return
            } else if (this.point < 0) {
                this.point = children.length - 1
                this.pos = -100 * this.point - 100
                changeEvent.forEach(callback => callback(this.point))

                window.setTimeout(() => {
                    transform(box, [0, this.pos], 0)
                }, transition)
                return
            }

            changeEvent.forEach(callback => callback(this.point))
        })
    }

    public onchange(callback: (pos: number) => void): void {
        this.changeEvent.push(callback)
    }
    public moveChange(movePos: 'left' | 'right'): void {
        movePos === 'left' ? --this.point : ++this.point
        this.change()
    }
    public clearTimer(): void {
        window.clearInterval(this.timer)
    }
    public update(updateChildCallback: (box: HTMLElement) => void): void {
        const { children: prevChildren, box, nav } = this.options
        const { options } = this
        const fragmenet: DocumentFragment = document.createDocumentFragment()

        prevChildren.forEach(child => fragmenet.appendChild(child))
        box.innerHTML = ''
        box.appendChild(fragmenet)
        updateChildCallback(box)

        options.children = <HTMLElement[]>Array.from(box.children)

        if (nav) {
            nav.layout(options.children.length)
        }
        this.layout()

        this.change()
    }
}

export default Vertical
