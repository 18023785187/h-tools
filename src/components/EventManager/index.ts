/**
    事件集中管理器
 */

import {
    eventSet,
    eventMap,
    eventListener
} from './typing'

export default class EventManager {
    constructor() {
        this.eventListener = new Map()
    }
    private eventListener: eventListener
    public bindEvent(el: HTMLElement | (Window & typeof globalThis), eventName: string, event: EventListenerOrEventListenerObject): void {
        const { eventListener } = this
        let elEvent: eventMap | null = null
        if (!eventListener.has(el)) {
            eventListener.set(el, new Map())
        }
        elEvent = <eventMap>eventListener.get(el)
        if (!elEvent.has(eventName)) {
            elEvent.set(eventName, new Set())
        }
        const setFn = <eventSet>elEvent.get(eventName)
        if (setFn.has(event)) return
        setFn.add(event)
        el.addEventListener(eventName, event)
    }
    public unbindEvent(eventName = 'all', el: eventListener | HTMLElement = this.eventListener): void {
        const { eventListener } = this
        if (el === eventListener) {
            eventListener.forEach((event, elm) => {
                switch (eventName) {
                    case 'all':
                        this.clear()
                        break;
                    default:
                        const setFn = event.get(eventName)
                        if (!setFn) return
                        setFn.forEach(fn => {
                            elm.removeEventListener(eventName, fn)
                        })
                        event.delete(eventName)
                }
            })
        } else {
            const elEventListener = eventListener.get(<HTMLElement>el)
            if (!elEventListener) return
            switch (eventName) {
                case 'all':
                    elEventListener.forEach((setFn, event) => {
                        setFn.forEach(fn => {
                            (el as HTMLElement).removeEventListener(event, fn)
                        })
                    })
                    eventListener.delete(<HTMLElement>el)
                    break;
                default:
                    const event = elEventListener.get(eventName)
                    if (!event) return
                    event.forEach(fn => {
                        (el as HTMLElement).removeEventListener(eventName, fn)
                    })
                    elEventListener.delete(eventName)
            }
        }
    }
    public clear(): void {
        const { eventListener } = this
        eventListener.forEach((elEventListener, el) => {
            elEventListener.forEach((setFn, event) => {
                setFn.forEach(fn => {
                    el.removeEventListener(event, fn)
                })
            })
        })
        this.eventListener.clear()
    }
    public toString(): string {
        const { eventListener } = this
        let res = ''
        eventListener.forEach((elEventListener, el) => {
            res += el + '->\n'
            elEventListener.forEach((setFn, event) => {
                res += '    ' + event + '->\n'
                setFn.forEach(fn => {
                    res += '        f' + '\n'
                })
            })
        })
        return res ? res : 'No properties'
    }
}
