interface Options {
    preload: number;
    loading: string;
    error: string;
    attempt: number;
    viewport: {
        w: number;
        h: number;
    };
}
/**
 * 劫持图片元素，可检测其是否处于视口再加载图片
 */
export default class ImageListener {
    private el;
    private src;
    private options;
    constructor(el: HTMLImageElement, src: string | null, options: Options);
    private _getDOMRect;
    /**
     * 检查元素是否在视口中
     * @returns {boolean}
     */
    private _checkInView;
    private _loadImg;
    /**
     * 暴露的接口，用于检测元素是否进入视口，如果进入视口，那么渲染该元素
     * @returns {boolean}
     */
    load(): boolean;
}
export {};
