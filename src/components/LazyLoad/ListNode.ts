

/**
 * 链表节点
 */
class Node<T> {
  value: T
  next: Node<T> | null

  constructor(value: T) {
    this.value = value
    this.next = null
  }
}

/**
 * 链表
 */
export default class ListNode<T>{
  public head: Node<T> | null
  public tail: Node<T> | null
  public length: number

  constructor() {
    this.head = null
    this.tail = null
    this.length = 0
  }

  /**
   * 末尾添加一个值
   * @param {T} value 
   */
  public add(value: T): void {
    if (!this.head) {
      this.head = new Node(value)
      this.tail = this.head
    } else {
      const node: Node<T> | null = new Node(value)
      this.tail!.next = node
      this.tail = node
    }

    ++this.length
  }

  /**
   * 删除符合值的节点
   * @param {T} value 
   * @returns 
   */
  public remove(value: T): void {
    let prev: Node<T> | null = null
    let cur = this.head

    while (cur?.value !== value) {
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

  /**
   * 判断链表是否为空
   * @returns {boolean}
   */
  public isEmpty(): boolean {
    return this.length === 0
  }

  /**
   * 遍历节点
   * @param {(value: T, i: number) => void} callback
   */
  public forEach(callback: (value: T, i: number) => void): void {
    let cur = this.head, i = 0

    while (cur) {
      callback.call(this, cur.value, i)
      cur = cur.next
      ++i
    }
  }
}
