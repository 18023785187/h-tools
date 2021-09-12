/**
 * 防抖 +节流函数
 * @param {function} fn
 * @param {number} timer
 * @returns {function}
 */
declare function throttle(fn: Function, time?: number): () => void;
export default throttle;
