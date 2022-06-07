# h-tools-js

<a href="https://www.npmjs.com/package/h-tools-js"><img src="https://img.shields.io/npm/v/h-tools-js.svg" alt="Version"></a>
<a href="https://npmcharts.com/compare/h-tools-js?minimal=true"><img src="https://img.shields.io/npm/dm/h-tools-js.svg" alt="Downloads"></a>
<a href="https://github.com/18023785187/h-tools/blob/master/LICENSE"><img src="https://img.shields.io/npm/l/h-tools-js.svg" alt="License"></a>
<a href="https://github.com/18023785187/h-tools/search?l=javascript"><img src="https://img.shields.io/github/languages/top/18023785187/h-tools.svg" alt="TopLang"></a>

#### 🚀 具有轮播图、瀑布流、懒加载、事件代理器等功能的组件库

---

### demo
https://18023785187.github.io/h-tools/

---

### 安装

```node
$ npm install h-tools-js --save
```

### 引入

```javascript
import { Slide, Waterfall, LazyLoad, EventListener } from 'h-tools-js'

或

import h from 'h-tools-js'
const { Slide, Waterfall, LazyLoad, EventListener } = h
```

---

### 组件

##### Slide

强大的、支持 pc 端和移动端的轮播图。

- 功能特性：
  - 支持横向轮播和纵向轮播。
  - 能够订阅轮播触发事件。
  - 具有可更新操作。
  - 可自定义导航点样式。
    
- 使用

```html
<!-- html -->
<div id='slide'>
  <div class='box'>
    <item />
    <item />
    <item />
    ...
  </div>
</div>
```

```css
/* css */
#slide {
  width: 100%;
}
```

```javascript
/* js */
const el = document.getElementById('slide')
const slide = new Slide(el)
```

- 配置参数类型

```typescript
type Options = {
  mode: boolean // 轮播模式，true 为横向，false 为纵向
  transition: number // 轮播动画过渡时间，单位秒
  delay: number // 轮播延时，单位 ms
  range: number // 触发范围，范围 0 ~ 100
  nav: boolean // 是否开启导航栏
  navOptions: NavOptions // 导航配置
  bindEvent: boolean // 是否绑定事件
  control: slideControlStyle // 是否显示控件
}

// 导航栏位置
enum slideNavPosition {
  top = 'Top',
  right = 'Right',
  bottom = 'Bottom',
  left = 'Left',
}

// 导航栏配置
type NavOptions = {
  style: string, // 导航点样式，过渡属性需要在 transition 字段中设置
  highStyle: string, // 导航点高亮样式，过渡属性需要在 transition 字段中设置
  position: slideNavPosition, // 放置位置
  range: number, // 放置位置的方位，范围 0 ~ 1
  transition: number, // 导航点动画过渡时间，单位 ms
}

// 控件样式
export enum slideControlStyle {
  default = 'Default',
  fade = 'Fade',
}
```
- API

```typescript
const slide = new Slide(el: HTMLElement, options?: Options)
```

创建轮播图。

```typescript
slide.subscribe(callback: (index?: number) => void)
```

绑定轮播图的触发事件，在每次触发轮播时触发。

callback: (index?: number) => void 传入一个回调函数，回调函数的参数是当前第几个内容。

```typescript
slide.unsubscribe(callback: (index?: number) => void)
```

取消目标事件的订阅。

```typescript
slide.move(direction?: boolean)
```

手动触发一次轮播事件，true 向左移动，false 向右移动。

```typescript
slide.change(index: number)
```

轮播图定位到第 index 个内容。

```typescript
slide.openTimer()
```

开启轮播定时器。

```typescript
slide.closeTimer()
```

关闭轮播定时器。

```typescript
slide.update(
  updateChildren: (elChild: HTMLElement) => void
)
```

更新轮播图视图，在轮播图有子节点需要更新时使用。

updateChildren: (elChild: HTMLElement) => void 传入一个回调函数，该回调函数用于写入添加、插入、删除子节点的操作，提供 elChild elChild 为子节点的父元素，可使用 elChild 进行修改操作。

```typescript
slide.destroy()
```

清理函数，在 slide 时解绑绑定的事件。

---

#### Waterfall

瀑布流式布局。

- 配置参数类型

```typescript
type Options = {
    marginTop?: number /* 可选值，上边距 */,
    minMargin?: number /* 可选值，左右下最小边距，边距只能大于或等于这个值 */,
    throttle?: number /* 可选值，节流防抖的时间间隔。视口尺寸改变时会调用重置方法，这时需要节流，默认为 200ms，在 pc 端生效 */
}
```

- 使用

```html
<!-- html -->
<div id='waterfall'>
  <div class='box'>
    <item />
    <item />
    <item />
    ...
  </div>
</div>
```

```css
/* css */
#waterfall {
  width: 100%;
}

item {
  width: 48%; /* 需要提前指定子元素宽度 */
}
```

```javascript
/* js */
const el = document.getElementById('waterfall')
const waterfall = new Waterfall(el)

waterfall.reset() // 在实例化后待内容区生成后需要调用一次reset来确认布局
```

- api

```typescript
waterfall.reset(transition = 0)
```

重新布局，参数 transition 为布局时的过渡时间，reset 用于重新布局或删除元素后布局或插入元素后布局。

```typescript
waterfall.update()
```

更新布局，在往后添加元素后使用。

```typescript
waterfall.destroy()
```

清理函数，在 waterfall 时解绑绑定的事件。

- 注意

  1. 在内容区的子元素宽度应一致。
  2. 请为带有图片等延迟加载资源的子元素设置高度，例如：
  ```html
    <子元素>
      <img src='xxx' height='xxx' />
    </子元素>
  ```
  3. Waterfall 实例化后请在内容区取得第一个子元素时调用 waterfall.reset()，因为在实例化时 Waterfall 并没有对布局情况进行记录，需要通过 waterfall.reset() 进行记录，才可以使用 waterfall.update()。

---

#### LazyLoad

具有针对图片进行懒加载的功能。

- 工作原理

  - 用户为图片设置 [data-src] 属性，然后由 LazyLoad 获取所有含有 [data-src] 属性的元素。
  - LazyLoad 对含有 [data-src] 属性的元素进行存储。
  - 监听每个含有 [data-src] 属性的元素的最近设置了 [overflow:scroll] 的父元素的各种事件(由用户传入，默认监听 scroll 事件)。
  - 通过事件判断含有 [data-src] 属性的元素的位置是否进入浏览器视口，如果进入则把元素的属性 [data-src] 上的值赋值给属性 [src]。
  - 符合条件的元素将被 LazyLoad 在存储容器中移除，从而实现懒加载功能。

- 配置参数类型

```typescript
type Options = {
    preload: number, /* 预加载的宽高，默认为 1 */
    loading: string, /* 加载中的显示的图片的路径，默认为 '' */
    error: string, /* 加载失败时现实的图片的路径，默认为 '' */
    attempt: number, /* 失败后尝试加载的次数，默认为 3 次 */
    throttle: number,  /* 节流时间，默认为 200ms */
    eventListener: Array<string> /* 需要监听的事件，以数组的形式传入事件名称，默认为 ['scroll'] */
}
```
- 使用

```html
<!-- html -->
<img data-src='xxx.com' src='' />
```

```javascript
/* js */
const lazyLoad = new LazyLoad({/* 配置参数，也可以不传使用默认参数 */})
```

- API

```typescript
lazyLoad.update()
```

在视图发生更新后调用，使 LazyLoad 获取带有属性 [data-src] 的元素并存储。

```typescript
lazyLoad.render()
```

在插件内部会在监听事件的时候自动调用，也可以手动调用该方法。

- 注意

  在每次更新视图时（如增加了带有 data-src 属性的图片），请调用 lazyLoad.update()，以便使 lazyLoad 获取这些图片进行懒加载管理。

---

#### EventListener

事件代理池，为目标元素劫持事件，方便管理该元素的事件，该类适用于一些需要绑定多个或多种事件的元素。

- 使用

```javascript
const el = document.body
// 生成实例，为 el 元素绑定一个 click 事件
const eventListener = new EventListener(
  el,
  {
    click: [function() { console.log(444) }], // click 可以是数组，也可以是方法
  }
)

// 以下几种方法都可以使 el 的 click 事件发生改变，用户可以随心所欲地改变数组内的方法或直接给 click 赋值一个方法
eventListener.on.click = [() => console.log(555)]
eventListener.on.click.pop()
delete eventListener.on.click[0]


delete eventListener.on.click // el 的 click 事件被移除
```

- 事件代理池类型

```typescript
type Listener<T> = (ev: T) => void
type ListenerHandler = Listener<any> | Array<Listener<any>>

/**
 * 事件绑定对象类型，key 为事件名称，value 为事件函数或者事件函数数组
 * 
 * {
 *    click: [fn1, fn2, fn3],
 *    change: fn,
 *    ...
 * }
 */
type On = {
  [N in keyof HTMLElementEventMap]?: // HTMLElementEventMap 事件名类型
  | Listener<HTMLElementEventMap[N]>
  | Array<Listener<HTMLElementEventMap[N]>>
} & {
  [event: string]: ListenerHandler
}
```

- API

```typescript
const eventListener = new EventListener(
  el: HTMLElement,
  on?: On
)
```

实例化事件代理池，并为 el 元素绑定 on 对象中的事件。

```typescript
eventListener.reflect(On)
```

重新劫持一个事件代理池 On。

- 杂项

  EventListener 并不是真正的绑定事件，而是获取事件代理池 on 对象中的键，如果键存在，则以键作为事件名称绑定一个侦听器，当事件被触发会调用侦听器，由侦听器去遍历 on 对象中对应键中的方法数组并调用，这实际上是一个代理操作。

---

#### Carousel

走马灯，用于商品走马观花地展示。

- 配置参数类型

```typescript
type Options = {
    speed?: number /* 可选值，速率，必须大于 0，默认值为 1 */,
}
```

- 使用

```html
<!-- html -->
<div id='carousel'>
  <div class='box'>
    <item />
    <item />
    <item />
    ...
  </div>
</div>
```

```css
/* css */
#carousel {
  width: 100%;
}
```

```javascript
/* js */
const el = document.getElementById('carousel')
const carousel = new Carousel(el)
```

- api

```typescript
carousel.destroy()
```

清理函数，在 carousel 时解绑绑定的事件。

---
