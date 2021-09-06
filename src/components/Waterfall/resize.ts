
import {
    isMobile
} from 'utils'

/**
 * @param callback 
 * @returns 
 */

function resize(callback: any): void {
    if (isMobile()) return
    window.addEventListener('resize', callback)
}

export default resize
