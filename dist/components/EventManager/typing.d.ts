declare type eventSet = Set<EventListenerOrEventListenerObject>;
declare type eventMap = Map<string, eventSet>;
declare type eventListener = Map<HTMLElement | (Window & typeof globalThis), eventMap>;
export type { eventSet, eventMap, eventListener };
