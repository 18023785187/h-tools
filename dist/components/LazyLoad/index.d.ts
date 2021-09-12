import EventManager from '../EventManager';
import { IOptions } from './typing';
declare class LazyLoad {
    constructor(options?: IOptions);
    private options;
    private listeners;
    private w;
    private h;
    eventManager: EventManager;
    render: LazyLoad['_render'];
    private handlerOptions;
    private _render;
    update(): void;
}
export default LazyLoad;
