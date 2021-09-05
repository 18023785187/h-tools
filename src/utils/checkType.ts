/**
 * 检查类型，符合则返回，不符合会报错
 * 
 * @param {any} target 
 * @param {string} type 
 * @returns {boolean}
 */

function checkType(value: any, type: string): boolean {
    type = type[0].toUpperCase() + type.substring(1)
    if (Object.prototype.toString.call(value) === `[object ${type}]`) {
        return true
    }
    return false
}

export default checkType
