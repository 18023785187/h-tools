
/**
 * 设置目标元素的 translate3d、transition属性
 * @param el 
 * @param translate3d 
 * @param transition 
 */
function transform(
    el: HTMLElement,
    translate3d: [number, number] = [0, 0],
    transition: number = 0
): void {
    el.style.cssText += `
        transition: all ${transition}ms;
        transform: translate3d(${translate3d[0]}%,${translate3d[1]}%,0)
    `
}

export default transform
