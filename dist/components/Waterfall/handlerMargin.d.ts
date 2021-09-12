declare type l = {
    listNumber: number;
    margin: number;
};
/**
 *
 * @param rootWidth
 * @param childWidth
 * @param minMargin
 * @returns {l}
 */
declare function handlerMargin(rootWidth: number, childWidth: number, minMargin: number | undefined): l;
export default handlerMargin;
