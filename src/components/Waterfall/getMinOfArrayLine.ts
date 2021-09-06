
/**
 * 获取目标数组的最小值的索引
 * @param array 
 * @returns {number}
 */

function getMinOfArrayLine(array: number[]): number {
    const num:number = Math.min(...array)
    return array.indexOf(num)
}

export default getMinOfArrayLine
