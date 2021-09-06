
/**
 * 循环执行 endIdx - startIdx 次callback
 * @param startIdx 起始索引
 * @param endIdx 结束索引
 * @param callback 回调函数
 */

function forEach(
    startIdx: number,
    endIdx: number,
    callback: Function): void {
    for (let i = startIdx; i < endIdx; i++) {
        callback(i)
    }
}

export default forEach
