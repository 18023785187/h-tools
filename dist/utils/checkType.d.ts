/**
 * 检查类型，符合则返回，不符合会报错
 *
 * @param {any} target
 * @param {string} type
 * @returns {boolean}
 */
declare function checkType(value: any, type: string): boolean;
export default checkType;
