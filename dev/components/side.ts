import { Slide, slideControlStyle, slideNavStyle, slideNavPosition } from '../../src/index'

export default function enableSlide(el: HTMLElement): () => void {
  return () => {
    el.innerHTML =
      `<style>
          #app {
            position: relative;
            width: 100%;
            height: 100vh;
            transition: all 1s;
          }

          .box {
            width: 100%;
            height: 100vh;
          }

          img {
            width: 100%;
            height: 100vh;
          }

          #description {
            position: absolute;
            left: 0;
            bottom: 0;
          }
        </style>

        <div id="app">
          <div class="box">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
          <div id="description">当前轮播第1张</div>
        </div>
      `

    const app = document.getElementById('app')!

    const slide = new Slide(
      app,
      {
        mode: false,
        control: slideControlStyle.fade, // 打开控件
        navOptions: { // 配置导航栏
          style: slideNavStyle.ellipse.style,
          highStyle: slideNavStyle.ellipse.highStyle,
          transition: 200, // 设置导航点过渡时间
          position: slideNavPosition.top, // 导航栏放置的位置
          range: 1, // 导航栏沿 position 方向放置的点
        }
      }
    )

    const colors = ['red', 'orange', 'yellow', 'green', 'blue', 'purple']
    app.style.background = colors[0]
    const description = document.getElementById('description')!
    slide.subscribe((i) => { // 订阅轮播触发事件
      app.style.background = colors[i]
      description.textContent = `当前轮播第${i + 1}张`
    })
  }
}
