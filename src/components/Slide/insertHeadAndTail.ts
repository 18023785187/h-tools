
/**
 * 往目标元素前后插入其子元素后前的克隆
 * @param parent 
 * @param htmlElementArr 
 * @returns {HTMLElement[]}
 */
function insertHeadAndTail(parent: HTMLElement, htmlElementArr: HTMLElement[]): HTMLElement[] {
    const tail: HTMLElement = <HTMLElement>htmlElementArr[0].cloneNode(true),
        head: HTMLElement = <HTMLElement>htmlElementArr[htmlElementArr.length - 1].cloneNode(true)

    parent.insertBefore(head, parent.firstElementChild)
    parent.appendChild(tail)
    return <HTMLElement[]>Array.from(parent.children)
}

export default insertHeadAndTail
