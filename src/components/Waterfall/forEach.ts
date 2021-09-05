

function forEach(
    startIdx: number,
    endIdx: number,
    callback: Function): void {
    for (let i = startIdx; i < endIdx; i++) {
        callback(i)
    }
}

export default forEach
