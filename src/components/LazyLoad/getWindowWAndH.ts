
/**
 * 获取视口宽度和高度并返回
 * @returns {{w: number,h: number}}
 */

function getWindowWAndH(): {
    w: number,
    h: number
} {
    const w: number = window.innerWidth ||
        document.documentElement.clientWidth ||
        document.body.clientWidth;
    const h: number = window.innerHeight ||
        document.documentElement.clientHeight ||
        document.body.clientHeight;
    return {
        w,
        h
    }
}

export default getWindowWAndH
