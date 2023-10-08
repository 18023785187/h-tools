import { Waterfall } from '../../src/index'

export default function enableWaterfall(el: HTMLElement): () => void {
  return () => {
    el.innerHTML =
      `<style>
        #btn {
          position: fixed;
          right: 0;
          bottom: 20px;
          z-index: 9;
          width: 200px;
          height: 50px;
          text-align: center;
          line-height: 50px;
          border: 1px solid;
          background-color: pink;
          cursor: pointer;
        }
    
        #app {
          width: 100%;
          border: 1px solid red;
          box-sizing: border-box;
        }
    
        .item {
          width: 160px;
          border: 1px solid;
          box-sizing: border-box;
          text-align: center;
          background-color: #bfa;
          cursor: pointer;
        }
      </style>

      <div id="btn">添加元素</div>
      <div id="app">
        <div class="box">
          <div class="item"></div>
          <div class="item"></div>
          <div class="item"></div>
          <div class="item"></div>
          <div class="item"></div>
          <div class="item"></div>
          <div class="item"></div>
          <div class="item"></div>
          <div class="item"></div>
          <div class="item"></div>
          <div class="item"></div>
          <div class="item"></div>
          <div class="item"></div>
          <div class="item"></div>
          <div class="item"></div>
          <div class="item"></div>
          <div class="item"></div>
          <div class="item"></div>
        </div>
      </div>
      `

    // 设置高度
    const items = document.getElementsByClassName('item')
    for (let i = 0; i < items.length; ++i) {
      const item = items[i] as HTMLElement
      item.style.height = Math.floor(Math.random() * 400) + 100 + 'px' // [100, 500)
    }

    console.log(Waterfall)

    const waterfall = new Waterfall(document.getElementById('app')!)
    waterfall.update()

    for (let i = 0; i < items.length; ++i) {
      const item = items[i] as HTMLElement
      item.textContent = '点击删除'
      item.onclick = function () {
        item.remove()
        waterfall.reset(200)
      }
    }

    // 添加元素
    const box = document.getElementsByClassName('box')[0]
    document.getElementById('btn')!.onclick =
      function add() {
        const item = document.createElement('div')
        item.className = 'item'
        item.style.height = Math.floor(Math.random() * 400) + 100 + 'px' // [100, 500)
        item.textContent = '点击删除'
        item.onclick = function () {
          item.remove()
          waterfall.reset(200)
        }
        box.appendChild(item)
        waterfall.update()
      }
  }
}
