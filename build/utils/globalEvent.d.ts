type target = 'document' | 'window';
type eventName = keyof HTMLElementEventMap & string;
type eventFunc = (ev: Event) => void;
export declare function addEventListener(target: target, eventName: eventName, func: eventFunc): void;
export declare function removeEventListener(target: target, eventName: eventName, func: eventFunc): void;
export {};
