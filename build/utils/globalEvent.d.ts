declare type target = 'document' | 'window';
declare type eventName = keyof HTMLElementEventMap & string;
declare type eventFunc = (ev: Event) => void;
export declare function addEventListener(target: target, eventName: eventName, func: eventFunc): void;
export declare function removeEventListener(target: target, eventName: eventName, func: eventFunc): void;
export {};
