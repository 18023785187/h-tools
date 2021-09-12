
type eventSet = Set<EventListenerOrEventListenerObject>
type eventMap = Map<string, eventSet>
type eventListener = Map<HTMLElement | (Window & typeof globalThis), eventMap>

export type {
    eventSet,
    eventMap,
    eventListener
}
