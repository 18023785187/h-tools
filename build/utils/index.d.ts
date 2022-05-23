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
 * 防抖 + 节流函数
 * @param {(...rest: any[]) => void} func
 * @param {number} delay
 * @returns {(this: any, ...rest: any[]) => void}
 */
export declare function throttleDebounce(func: (...rest: any[]) => void, delay?: number): (this: any, ...rest: any[]) => void;
/**
 * 节流函数
 * @param {(...rest: any[]) => T} func
 * @param {number} delay
 * @returns {(...rest: any[]) => T | undefined}
 */
export declare function throttle<T>(func: (...rest: any[]) => T, delay: number): (this: any, ...rest: any[]) => T | undefined;
