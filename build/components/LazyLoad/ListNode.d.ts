/**
 * 链表节点
 */
declare class Node<T> {
    value: T;
    next: Node<T> | null;
    constructor(value: T);
}
/**
 * 链表
 */
export default class ListNode<T> {
    head: Node<T> | null;
    tail: Node<T> | null;
    length: number;
    constructor();
    /**
     * 末尾添加一个值
     * @param {T} value
     */
    add(value: T): void;
    /**
     * 删除符合值的节点
     * @param {T} value
     * @returns
     */
    remove(value: T): void;
    /**
     * 判断链表是否为空
     * @returns {boolean}
     */
    isEmpty(): boolean;
    /**
     * 遍历节点
     * @param {(value: T, i: number) => void} callback
     */
    forEach(callback: (value: T, i: number) => void): void;
}
export {};
