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
export default class ImageListener {
    private el;
    private src;
    private options;
    constructor(el: HTMLImageElement, src: string | null, options: Options);
    private _getDOMRect;
    private _checkInView;
    private _loadImg;
    load(): boolean;
}
export {};
