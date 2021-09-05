/**
    找有指定属性并且指定属性有指定值的父亲
 */

function searchParent(parent: HTMLElement | null, key: string, keyVal: string): (Window & typeof globalThis) | HTMLElement {
    while (parent) {
        try {
            if (getComputedStyle(parent)[key] === keyVal) {
                break
            }
        } catch (e) {
            parent = <HTMLElement | null>parent.parentNode
            break
        }
        parent = <HTMLElement | null>parent.parentNode
    }
    return parent === null ? window : parent
}

export default searchParent
