import enableSlide from "./components/side"
import enableWaterfall from "./components/waterfall"
import enableLazyLoad from "./components/lazyLoad"
import enableCarousel from "./components/carousel"

interface Config {
  [k: string]: (el: HTMLElement) => () => void
}

const config: Config = {
  '轮播图': enableSlide,
  '瀑布流': enableWaterfall, 
  '懒加载': enableLazyLoad, 
  '走马灯': enableCarousel,
}

export default config
