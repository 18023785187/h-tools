/**
 * 防抖 +节流函数
 * @param {function} fn 
 * @param {number} timer 
 * @returns {function}
 */

function throttle(fn: Function, time = 0) {
    let flag: boolean = true
    let timer: number | null = null
    return function () {
        (timer != null) && window.clearTimeout(timer)
        if (flag) {
            flag = false
            fn()
            window.setTimeout(() => {
                flag = true
            }, time)
        } else {
            timer = window.setTimeout(() => {
                fn()
            }, time)
        }
    }
}

export default throttle
