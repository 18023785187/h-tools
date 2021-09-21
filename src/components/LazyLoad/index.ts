
import {
    ListNode,
    checkType,
    throttle,
} from '../../utils'
import EventManager from '../EventManager'
import ImageListener from './ImageListener'
import getWindowWAndH from './getWindowWAndH'
import searchParent from './searchParent'
import { IOptions, viewport } from './typing'

class LazyLoad {
    constructor(options?: IOptions) {
        this.viewport = getWindowWAndH()
        this.listeners = new ListNode()
        this.eventManager = new EventManager()
        this.options = this.handlerOptions(options)
        this.render = throttle(this._render.bind(this), this.options.throttle)
        this.update()
        !this.listeners.isEmpty() && this.render()
        window.addEventListener('resize', throttle(() => {
            const { w, h } = getWindowWAndH()
            this.viewport.w = w
            this.viewport.h = h
        }, this.options.throttle))
    }
    private options: IOptions
    private listeners: ListNode
    private viewport: viewport
    public eventManager: EventManager
    public render: LazyLoad['_render']

    // 处理options参数
    private handlerOptions(options?: IOptions): IOptions {
        if (!options) return {
            preload: 1,
            loading: '',
            error: '',
            attempt: 3,
            throttle: 300,
            eventListener: ['scroll']
        }
        let {
            preload,
            loading,
            error,
            attempt,
            throttle,
            eventListener
        } = options
        !checkType(preload, 'number') && (preload = 1)
        !checkType(loading, 'string') && (loading = '')
        !checkType(error, 'string') && (error = '')
        !checkType(attempt, 'number') && (attempt = 3)
        !checkType(throttle, 'number') && (throttle = 200)
        !checkType(eventListener, 'array') && (eventListener = ['scroll'])
        return {
            preload,
            loading,
            error,
            attempt,
            throttle,
            eventListener
        }
    }
    // 执行懒加载操作
    private _render(): void {
        window.requestAnimationFrame(() => {
            this.listeners.forEach((listener: ImageListener) => {
                listener.load() && this.listeners.remove(listener)
            })
        })
    }
    public update(): void {
        const options: IOptions = this.options
        const oImg: NodeListOf<HTMLElement> = document.querySelectorAll('[data-src]')

        oImg.forEach(img => {
            if (img.tagName === 'IMG') {
                (img as HTMLImageElement).src = <string>this.options.loading;
                const el: HTMLImageElement = <HTMLImageElement>img,
                    src: string | null = img.getAttribute('data-src');
                img.removeAttribute('data-src')
                this.listeners.add(new ImageListener(
                    el,
                    src,
                    {
                        preload: <number>options.preload,
                        loading: <string>options.loading,
                        error: <string>options.error,
                        attempt: <number>options.attempt,
                        viewport: this.viewport
                    }
                ));
                (options.eventListener as string[]).forEach(event => {
                    const parent: HTMLElement | (Window & typeof globalThis) = searchParent(<HTMLElement | null>img.parentNode, 'overflow', 'srcoll')
                    this.eventManager.bindEvent(parent, event, this.render)
                })
            }
        })
        this.render()
    }
    // 持续监听5个节流时间
    public monitor(): void {
        const self = this
        let count: number = 0

            ; (function timerOut() {
                window.setTimeout(() => {
                    self.render()
                    if (count < 5) timerOut()
                }, self.options.throttle)
            })()
    }
}

export default LazyLoad
