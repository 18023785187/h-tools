

/**
 * 检查类型，符合则返回，不符合会报错
 * @param {any} target 
 * @param {string} type 
 * @returns {boolean}
 */
export function checkType(value: any, type: string): boolean {
  type = type[0].toUpperCase() + type.substring(1)
  if (Object.prototype.toString.call(value) === `[object ${type}]`) {
    return true
  }
  return false
}

/**
 * 检查是否为移动端
 * @returns {booean}
 */
export function isMobile(): boolean {
  if ((navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i))) {
    return true
  } else {
    return false
  }
}

/**
 * 防抖 +节流函数
 * @param {function} fn 
 * @param {number} time
 * @returns {function}
 */
export function throttle(func: (...rest: any[]) => void, time = 0) {
  let flag = true
  let timer: number | null = null

  return function (this: any, ...rest: any[]) {
    if (timer != null) window.clearTimeout(timer)

    if (flag) {
      flag = false
      func.apply(this, [...rest])

      window.setTimeout(() => {
        flag = true
      }, time)
    } else {
      timer = window.setTimeout(() => {
        func.apply(this, [...rest])
      }, time)
    }
  }
}
