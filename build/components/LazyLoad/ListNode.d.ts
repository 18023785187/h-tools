declare class Node<T> {
    value: T;
    next: Node<T> | null;
    constructor(value: T);
}
export default class ListNode<T> {
    head: Node<T> | null;
    tail: Node<T> | null;
    length: number;
    constructor();
    add(value: T): void;
    remove(value: T): void;
    isEmpty(): boolean;
    forEach(callback: (value: T, i: number) => void): void;
}
export {};
