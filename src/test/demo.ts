
import LazyLoad from "../components/LazyLoad";
import Waterfall from '../components/Waterfall'
import Slide from '../components/Slide'

let page = 1

const app = document.getElementById('app')
const btn = document.getElementById('get')
btn!.onclick = function () {
    getGoods(page++)
}

const slide = Slide.create(<HTMLElement>document.getElementById('slide'), {
    transition: 200,
    // transverse: false
})
const waterfall = new Waterfall(<HTMLElement>app, {
    marginTop: 20
})

const lazyLoad = new LazyLoad({
    eventListener: ['scroll', 'click']
})
slide.onchange(() => {
    lazyLoad.update()
})

function getGoods(page: number) {
    fetch(`http://152.136.185.210:8000/api/w6/home/data?type=new&page=${page}`).then(res => {
        return res.json()
    }).then(res => {
        res.data.list.forEach((item: any) => {
            const info = item.showLarge
            const img = new Image()
            img.height = 375 * .48 * (info.h / info.w);
            img.setAttribute('data-src', info.img)
            app!.children[0].appendChild(img)
            img.onclick = function () {
                img.parentNode?.removeChild(img)
                waterfall.reset(1000)
            }
        })
        lazyLoad.update()
        waterfall.reset()
    })
}

