import EventManager from '../EventManager';
import { IOptions } from './typing';
declare class LazyLoad {
    constructor(options?: IOptions);
    private options;
    private listeners;
    private viewport;
    eventManager: EventManager;
    render: LazyLoad['_render'];
    private handlerOptions;
    private _render;
    update(): void;
    monitor(): void;
}
export default LazyLoad;
