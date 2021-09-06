/**
    不完整的链表
 */

import { INode } from './typing'

export default class ListNode {
    head: INode | null
    tail: INode | null
    length: number
    constructor() {
        this.head = null
        this.tail = null
        this.length = 0
    }
    private Node = class implements INode {
        val: any
        next: INode | null
        constructor(val: any) {
            this.val = val
            this.next = null
        }
    }
    public add(val: any): void {
        if (!this.head) {
            this.head = new this.Node(val)
            this.tail = this.head
        } else {
            const node: INode | null = new this.Node(val)
            this.tail!.next = node
            this.tail = node
        }
        ++this.length
    }
    public remove(val: any): void {
        let prev: INode | null = null
        let cur: INode | null = this.head
        while (cur?.val !== val) {
            prev = cur
            cur = cur!.next
        }
        if (!cur) return
        if (cur === this.head) {
            this.head = cur.next
            !this.head && (this.tail = null)
        } else {
            prev!.next = cur.next
            !cur.next && (this.tail = prev)
        }
        --this.length
    }
    public isEmpty(): boolean {
        return this.length === 0
    }
    public forEach(callback: Function): void {
        let cur: INode | null = this.head,
            i: number = 0
        while (cur) {
            callback(cur.val, i)
            cur = cur.next
            ++i
        }
    }
}
