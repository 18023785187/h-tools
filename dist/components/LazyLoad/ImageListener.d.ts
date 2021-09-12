/**
    每张图片都有一个管理器实例，用于懒加载操作
    懒加载的核心类
 */
import { IImageOptions } from './typing';
export default class ImageListener {
    constructor(el: HTMLImageElement, src: string | null, options: IImageOptions);
    private el;
    private src;
    private options;
    private getDOMRect;
    private checkIsInView;
    private loadImg;
    load(): boolean;
}
