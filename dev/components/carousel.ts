import { Carousel } from '../../src/index'

export default function enableCarousel(el: HTMLElement): () => void {
  return () => {
    el.innerHTML =
      `
        <style>
          #app {
            margin: 20px 0;
            border: 1px solid;
          }
      
          #carousel {
            width: calc(100vw - 202px);
            height: 600px;
          }
      
          img {
            width: 400px;
            height: 500px;
          }
        </style>

        <div id="app">
          <div id="carousel">
            <div class="box">
              <img
                src="https://img14.360buyimg.com/ceco/s300x300_jfs/t1/147923/30/18586/454087/5fdc028eE9518ec6b/1e4e64b14043aa71.png.webp"
                alt="">
              <img
                src="https://img30.360buyimg.com/ceco/s300x300_jfs/t1/124187/20/17208/67618/5fa0134fE6c602b4d/301ac0061ce1b608.jpg!q70.jpg.webp"
                alt="">
              <img
                src="https://img13.360buyimg.com/ceco/s300x300_jfs/t1/49863/13/2743/66928/5d087656E5d49af28/888e93e248bf7f28.jpg!q70.jpg.webp"
                alt="">
              <img
                src="https://img11.360buyimg.com/ceco/s300x300_jfs/t1/123849/6/18431/435932/5fadf2a5Ed8e3d839/ff8fb0d490ec93af.png.webp"
                alt="">
              <img
                src="https://img11.360buyimg.com/ceco/s300x300_jfs/t3910/181/779565160/234721/6b17eb6f/585e1edcN1e9fee1c.jpg!q70.jpg.webp"
                alt="">
            </div>
          </div>
        </div>
      `

    console.log(Carousel)

    const app = document.getElementById('carousel')!
    const carousel = new Carousel(app)
    console.log(carousel)
  }
}