

function getMinOfArrayLine(array: number[]): number {
    const num:number = Math.min(...array)
    return array.indexOf(num)
}

export default getMinOfArrayLine
