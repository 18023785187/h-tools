/**
 * 检查类型，符合则返回，不符合会报错
 * @param {any} target
 * @param {string} type
 * @returns {boolean}
 */
export declare function checkType(value: any, type: string): boolean;
/**
 * 检查是否为移动端
 * @returns {booean}
 */
export declare function isMobile(): boolean;
/**
 * 防抖 +节流函数
 * @param {function} fn
 * @param {number} time
 * @returns {function}
 */
export declare function throttle(func: (...rest: any[]) => void, time?: number): (this: any, ...rest: any[]) => void;
