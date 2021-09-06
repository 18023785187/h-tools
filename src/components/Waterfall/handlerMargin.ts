
type l = {
    listNumber: number,
    margin: number
}

/**
 * 
 * @param rootWidth 
 * @param childWidth 
 * @param minMargin 
 * @returns {l}
 */

function handlerMargin(
    rootWidth: number,
    childWidth: number,
    minMargin: number | undefined): l {
    let listNumber: number = 1,
        margin: number = minMargin ?? 0
    if (rootWidth <= childWidth + (minMargin ?? 0) * 2) {
        return {
            listNumber,
            margin
        }
    }
    listNumber = Math.floor(rootWidth / childWidth)

    function handlerMargin(
        listNumber: number
    ): l {
        if(listNumber < 1) return {
            listNumber: 1,
            margin: (minMargin ?? 0)
        }
        const margin: number = (rootWidth - (childWidth * listNumber)) / (listNumber + 1)
        if(margin < (minMargin ?? 0)) return handlerMargin(listNumber - 1)
        return {
            listNumber,
            margin
        }
    }
    return handlerMargin(listNumber)
}

export default handlerMargin
