
/**
 * 检查是否为移动端
 * @returns {booean}
 */

function isMobile(): boolean {
    if ((navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i))) {
        return true
    } else {
        return false
    }
}

export default isMobile
