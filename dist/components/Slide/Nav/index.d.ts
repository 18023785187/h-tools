declare class Nav {
    constructor(el: HTMLElement, childLen: number);
    private el;
    private childLen;
    private nav?;
    private createNav;
    update: (pos: number) => void;
    layout(childLen: number): void;
}
export default Nav;
