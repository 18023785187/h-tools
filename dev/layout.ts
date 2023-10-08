import config from './config'

export default function createLayout() {
  const layoutEl = document.createElement('div')
  layoutEl.className = 'layout'

  const sideEl = document.createElement('div')
  sideEl.className = 'side'

  const containerEl = document.createElement('div')
  containerEl.className = 'container'

  for(const sideItem in config) {
    const sideItemEl = document.createElement('div')
    sideItemEl.className = 'side-item'
    sideItemEl.innerText = sideItem
    sideItemEl.addEventListener('click', config[sideItem](containerEl))
    sideEl.appendChild(sideItemEl)
  }

  layoutEl.appendChild(sideEl)
  layoutEl.appendChild(containerEl)

  document.body.appendChild(layoutEl)
}