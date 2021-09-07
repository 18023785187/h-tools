# Slide轮播图
一个同时支持pc端和移动端的轮播图。

## 功能特性
- 横向轮播和纵向轮播。
- 更新视图。
- 自带移动端事件，pc端可以调用api进行轮播。
- 提供change事件，在每次触发轮播时触发。
    
## 使用
```javascript
/* css */
.slide{
     width: 100%;
}

/* html */
<div class='slide'>
    <div class='box'>
        <item />
        <item />
        <item />
        ...
    </div>
</div>

/* js */
const slide = Slide.create(el)
```

## 参数
```javascript
Slide.create(el:HTMLElement,options:{
    transverse: boolean, /* 指定轮播图应为横向轮播还是纵向轮播，默认为true横向 */
    createNav: boolean, /* 是否创建导航点，默认为true */
    transition: number, /* 指定轮播图的动画持续时间，默认为 200ms */
    triggerTime: number, /* 指定轮播图的触发时间间隔，默认为 3000ms */
    triggerPos: 0-100, /* 指定轮播图移动多少距离触发轮播，默认为 10% */
    bindEvent: boolean, /* 指定是否开启移动端触摸事件，仅限于横向轮播和移动端，默认为true */
})
```
## api

**`Slide.create(el:HTMLElement,options:{...}):Slide`**
<br>>创建轮播图。

**`slide.onchange(callback: (pos: number) => void):void`**
<br>>绑定轮播图的触发事件，在每次触发轮播时触发。
<br>>callback: (pos: number) => void : 传入一个回调函数，回调函数的参数是当前第pos。

**`slide.moveChange(movePos: 'left' | 'right'):void`**
<br>>手动触发一次轮播事件，用于pc端的触发。
<br>>movePos: 'left' | 'right' : 需要'left'或'right'作为参数，如果是'left'，则往左轮播，反之往右轮播。

**`slide.setTimer(): void`**
<br>>开启轮播定时器。

**`slide.clearTimer(): void`**
<br>>关闭轮播定时器。

**`slide.update(updateChildCallback: (box: HTMLElement) => void): void`**
<br>>更新轮播图视图，在轮播图有子节点需要更新时使用。
<br>>updateChildCallback: (box: HTMLElement) => void ：传入一个回调函数，该回调函数用于写入添加、插入、删除子节点的操作，提供box参数，box为子节点的父元素，可使用box进行修改操作。
