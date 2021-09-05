
import {
    ListNode,
    checkType,
    throttle,
} from 'utils'
import EventManager from '../EventManager'
import ImageListener from './ImageListener'
import getWindowWAndH from './getWindowWAndH'
import searchParent from './searchParent'
import { IOptions } from './typing'

class LazyLoad {
    constructor(options?: IOptions) {
        const w_h: [number, number] = getWindowWAndH()
        this.w = w_h[0]
        this.h = w_h[1]
        this.listeners = new ListNode()
        this.eventManager = new EventManager()
        this.options = this.handlerOptions(options)
        this.render = throttle(this._render.bind(this), this.options.throttle)
        this.update()
        !this.listeners.isEmpty() && this.render()
    }
    private options: IOptions
    private listeners: ListNode
    private w: number
    private h: number
    public eventManager: EventManager
    public render: LazyLoad['_render']
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
    private _render(): void {
        this.listeners.forEach((listener: ImageListener) => {
            listener.load() && this.listeners.remove(listener)
        })
    }
    public update(): void {
        const options: IOptions = this.options
        const oImg: NodeListOf<Element> = document.querySelectorAll('[data-src]')
        for (const img of oImg) {
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
                        w: this.w,
                        h: this.h
                    }
                ));
                (options.eventListener as string[]).forEach(event => {
                    const parent: HTMLElement | (Window & typeof globalThis) = searchParent(<HTMLElement | null>img.parentNode, 'overflow', 'srcoll')
                    this.eventManager.bindEvent(parent, event, this.render)
                })
            }
        }
        this.render()
    }
}

export default LazyLoad
