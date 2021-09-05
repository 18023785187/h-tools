
import Nav from './Nav'

type options = {
    transverse?: boolean,
    createNav?: boolean,
    transition?: number,
    triggerTime?: number,
    triggerPos?: number,
    bindEvent?: boolean
}

type config = {
    nav?: Nav,
    box: HTMLElement,
    children: HTMLElement[],
    transverse: boolean,
    transition: number,
    triggerTime: number,
    triggerPos: number,
    bindEvent?: boolean
}

export {
    options,
    config
}
