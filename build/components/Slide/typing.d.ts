import Nav from './Nav';
declare type options = {
    transverse?: boolean;
    createNav?: boolean;
    transition?: number;
    triggerTime?: number;
    triggerPos?: number;
    bindEvent?: boolean;
};
declare type config = {
    nav?: Nav;
    box: HTMLElement;
    children: HTMLElement[];
    transverse: boolean;
    transition: number;
    triggerTime: number;
    triggerPos: number;
    bindEvent?: boolean;
};
export type { options, config };
