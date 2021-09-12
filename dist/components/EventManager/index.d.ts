/**
    事件集中管理器
 */
import { eventListener } from './typing';
export default class EventManager {
    constructor();
    private eventListener;
    bindEvent(el: HTMLElement | (Window & typeof globalThis), eventName: string, event: EventListenerOrEventListenerObject): void;
    unbindEvent(eventName?: string, el?: eventListener | HTMLElement): void;
    clear(): void;
    toString(): string;
}
