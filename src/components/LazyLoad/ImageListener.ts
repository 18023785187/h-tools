/**
    每张图片都有一个管理器实例
 */

import { IImageOptions } from './typing'

export default class ImageListener {
    constructor(
        el: HTMLImageElement,
        src: string | null,
        options: IImageOptions
    ) {
        this.el = el
        this.src = src || ''
        this.options = options
    }
    private el: HTMLImageElement
    private src: string
    private options: IImageOptions
    private getDOMRect(el: HTMLImageElement): DOMRect {
        return el.getBoundingClientRect()
    }
    private checkIsInView(): boolean {
        const {
            w,
            h,
            preload
        } = this.options
        const {
            top,
            right,
            bottom,
            left,
        } = this.getDOMRect(this.el)
        return ((top < h * preload && bottom > 0)
            &&
            (left < w * preload && right > 0))
    }
    private loadImg(
        resolve: () => void,
        reject: any
    ): boolean {
        if (this.checkIsInView()) {
            const img = new Image()
            img.src = this.src
            img.onload = resolve
            img.onerror = reject
            return true
        }
        return false
    }
    // api
    public load(): boolean {
        const { attempt } = this.options
        const resolve = (): void => {
            this.el.src = this.src
        }
        const reject = (e: MouseEvent, count = 1): void => {
            if (count === attempt) {
                this.el.src = this.options.error
                return
            }
            this.loadImg(resolve, reject.bind(this, e, ++count))
        }
        return this.loadImg(resolve, reject)
    }
}
