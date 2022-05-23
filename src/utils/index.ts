

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
 * 防抖 + 节流函数
 * @param {(...rest: any[]) => void} func 
 * @param {number} delay
 * @returns {(this: any, ...rest: any[]) => void}
 */
export function throttleDebounce(func: (...rest: any[]) => void, delay: number = 0): (this: any, ...rest: any[]) => void {
  let flag = true
  let timer: number | null = null

  return function (this: any, ...rest: any[]) {
    if (timer != null) window.clearTimeout(timer)

    if (flag) {
      flag = false
      func.apply(this, [...rest])

      window.setTimeout(() => {
        flag = true
      }, delay)
    } else {
      timer = window.setTimeout(() => {
        func.apply(this, [...rest])
      }, delay)
    }
  }
}

/**
 * 节流函数
 * @param {(...rest: any[]) => T} func 
 * @param {number} delay 
 * @returns {(...rest: any[]) => T | undefined}
 */
export function throttle<T>(
  func: (...rest: any[]) => T,
  delay: number
): (this: any, ...rest: any[]) => T | undefined {
  let flag: boolean = true

  return function (this: any, ...rest: any[]): T | undefined {
    if (flag) {
      flag = false

      window.setTimeout(() => {
        flag = true
      }, delay)

      return func.apply(this, [...rest])
    } else {
      return undefined
    }
  }
}
