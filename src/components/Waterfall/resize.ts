
import {
    isMobile
} from 'utils'

function resize(callback: any): void {
    if (isMobile()) return
    window.addEventListener('resize', callback)
}

export default resize
