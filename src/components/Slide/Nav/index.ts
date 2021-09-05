
const HIGH_COLOR = 'rgba(255,255,255,.8)',
    COLOR = 'rgba(0,0,0,.3)'

class Nav {
    constructor(el: HTMLElement, childLen: number) {
        const content: HTMLElement = document.createElement('div')
        content.className += `slide-nav-box`
        content.style.cssText += `position: relative;`
        el.appendChild(content)

        this.el = content;
        this.childLen = childLen
        this.createNav()
        this.update(0)
    }
    private el: HTMLElement
    private childLen: number
    private nav?: HTMLDivElement
    private createNav(): void {
        const { el, childLen } = this;
        const nav: HTMLDivElement = document.createElement('div'),
            point: HTMLDivElement = document.createElement('div')

        el.appendChild(nav)
        layoutNavStyle()
        layoutPointStyle()
        createPoint()

        this.nav = nav

        function createPoint(): void {
            for (let i = 0; i < childLen; ++i) {
                nav.appendChild(point.cloneNode(true))
            }
        }
        function layoutNavStyle(): void {
            const len: number = nav.clientWidth * 0.02

            nav.className += 'slide-nav'
            nav.style.cssText += `
                display: flex;
                justify-content: center;
                align-items: center;
                position: absolute;
                left: 0;
                right: 0;
                bottom: ${len}px;
                z-index: 2;
            `
        }
        function layoutPointStyle(): void {
            const len: number = nav.clientWidth * 0.02

            point.className += 'slide-nav-item'
            point.style.cssText += `
                width: ${len}px;
                height: ${len}px;
                margin: 0 ${len}px;
                background-color: ${COLOR};
                border-radius: 50%;
            `
        }
    }
    public update = (pos: number): void => {
        const children: HTMLCollection = this.nav!.children;
        for (let i = 0; i < this.childLen; ++i) {
            (children[i] as HTMLElement).style.backgroundColor = COLOR;
        }
        (children[pos] as HTMLElement).style.backgroundColor = HIGH_COLOR;
    }
    public layout(childLen: number): void {
        this.el.removeChild(<HTMLDivElement>this.nav)
        this.childLen = childLen
        this.createNav()
        this.update(0)
    }
}

export default Nav
