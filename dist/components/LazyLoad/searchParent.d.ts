/**
    找有指定属性并且指定属性有指定值的父亲
 */
declare function searchParent(parent: HTMLElement | null, key: string, keyVal: string): (Window & typeof globalThis) | HTMLElement;
export default searchParent;
