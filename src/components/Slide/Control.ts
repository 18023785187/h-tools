
export enum Style {
  default = 'Default',
  fade = 'Fade',
}

/**
 * 轮播图控件
 */
export class Control {
  private _el: HTMLElement
  private _style: Style
  private _left!: HTMLElement
  private _right!: HTMLElement

  constructor(el: HTMLElement, style: Style) {
    this._el = el
    this._style = style

    this._createControl()
  }

  private _createControl() {
    switch (this._style) {
      case Style.default:
        this._createDefaultControl()
        break
      case Style.fade:
        this._createFadeControl()
        break
      default:
        this._createDefaultControl()
    }
  }

  private _createDefaultControl() {
    const left = document.createElement('div')
    const right = document.createElement('div')
    const leftIcon = document.createElement('i')
    const rightIcon = document.createElement('i')

    left.className = 'slide-control-default-left'
    leftIcon.className = 'h-iconfont'
    leftIcon.innerHTML = '&#xe687;'
    left.appendChild(leftIcon)
    right.className = 'slide-control-default-right'
    rightIcon.className = 'h-iconfont'
    rightIcon.innerHTML = '&#xe686;'
    right.appendChild(rightIcon)

    this._left = left
    this._right = right

    this._el.appendChild(left)
    this._el.appendChild(right)
  }

  private _createFadeControl() {
    const left = document.createElement('div')
    const right = document.createElement('div')
    const leftIcon = document.createElement('i')
    const rightIcon = document.createElement('i')

    left.className = 'slide-control-fade-left'
    leftIcon.className = 'h-iconfont'
    leftIcon.innerHTML = '&#xe687;'
    left.appendChild(leftIcon)
    right.className = 'slide-control-fade-right'
    rightIcon.className = 'h-iconfont'
    rightIcon.innerHTML = '&#xe686;'
    right.appendChild(rightIcon)

    this._left = left
    this._right = right

    this._el.className += ' slide-fade-el-hover'
    this._el.appendChild(left)
    this._el.appendChild(right)
  }

  public bindEvent(moveLeft: any, moveRight: any) {
    this._left.addEventListener('click', (e) => moveLeft(e), false)
    this._left.addEventListener('touchstart', (e) => moveLeft(e), false)
    this._left.addEventListener('touchend', (e) => e.stopPropagation(), false)
    this._right.addEventListener('click', (e) => moveRight(e), false)
    this._right.addEventListener('touchstart', (e) => moveRight(e), false)
    this._right.addEventListener('touchend', (e) => e.stopPropagation(), false)
  }
}
