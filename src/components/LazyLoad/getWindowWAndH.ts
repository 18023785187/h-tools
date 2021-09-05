

function getWindowWAndH(): [number, number] {
    const w: number = window.innerWidth ||
        document.documentElement.clientWidth ||
        document.body.clientWidth;
    const h: number = window.innerHeight ||
        document.documentElement.clientHeight ||
        document.body.clientHeight;
    return [w, h]
}

export default getWindowWAndH
