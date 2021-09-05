

interface IOptions {
    preload?: number, /* 预加载的宽高 */
    loading?: string, /* 加载中的显示的图片的路径 */
    error?: string, /* 加载失败时现实的图片的路径 */
    attempt?: number, /* 失败后尝试加载的次数 */
    throttle?: number,  /* 节流时间 */
    eventListener?: Array<string> /* 需要监听的事件 */
}

interface IImageOptions {
    preload: number,
    loading: string,
    error: string,
    attempt: number,
    w: number,
    h: number
}

export {
    IOptions,
    IImageOptions
}
