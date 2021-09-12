import Cross from './Cross';
import Vertical from './Vertical';
import { options, config } from './typing';
declare const handlerOptions: unique symbol;
declare const Slide: {
    create(el: HTMLElement, options?: options | undefined): Cross | Vertical;
    [handlerOptions](el: HTMLElement, options?: options | undefined): config;
};
export default Slide;
