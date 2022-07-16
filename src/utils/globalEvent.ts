import { EventListener, Listener } from "@/components/EventListener";

type target = 'document' | 'window'
type eventName = keyof HTMLElementEventMap & string
type eventFunc = (ev: Event) => void

const map = {
  document: new EventListener(document),
  window: new EventListener(window),
}

function hasEventName(
  target: target,
  eventName: eventName
) {
  return map[target].on.hasOwnProperty(eventName)
}

function findIndexEventFunc(
  target: target,
  eventName: eventName,
  func: eventFunc
) {
  return (map[target].on[eventName] as Array<Listener<any>>).findIndex(eventFunc => eventFunc === func)
}

export function addEventListener(
  target: target,
  eventName: eventName,
  func: eventFunc
) {
  if (!hasEventName(target, eventName)) {
    (map[target].on[eventName] as any) = []
  }
  const index = findIndexEventFunc(target, eventName, func)
  if (index === -1) {
    (map[target].on[eventName] as Array<Listener<any>>).push(func)
  }
}

export function removeEventListener(
  target: target,
  eventName: eventName,
  func: eventFunc
) {
  if (!hasEventName(target, eventName)) return
  const index = findIndexEventFunc(target, eventName, func)
  if (index !== -1) {
    (map[target].on[eventName] as Array<Listener<any>>).splice(index, 1)
  }
}
