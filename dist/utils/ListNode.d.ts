/**
    不完整的链表
 */
import { INode } from './typing';
export default class ListNode {
    head: INode | null;
    tail: INode | null;
    length: number;
    constructor();
    private Node;
    add(val: any): void;
    remove(val: any): void;
    isEmpty(): boolean;
    forEach(callback: Function): void;
}
