interface IOptions {
    preload?: number;
    loading?: string;
    error?: string;
    attempt?: number;
    throttle?: number;
    eventListener?: Array<string>;
}
interface IImageOptions {
    preload: number;
    loading: string;
    error: string;
    attempt: number;
    viewport: viewport;
}
declare type viewport = {
    w: number;
    h: number;
};
export { IOptions, IImageOptions };
export type { viewport };
