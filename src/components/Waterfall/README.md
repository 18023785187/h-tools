# Waterfall(瀑布流式布局)

## 参数
```javascript
(element: HTMLElement, {
    marginTop: number /* 可选值，上边距 */,
    minMargin: number /* 可选值，左右下最小边距，边距只能大于或等于这个值 */,
    throttle: number /* 可选值，节流防抖的时间间隔，默认为200ms，在pc端生效 */
})
```
## 使用
```javascript
/* css */
.waterfall{
    width: 100%;
}
item{
    width: 48%; /* 需要提前指定子元素宽度 */
}

/* html */
<div class='waterfall'>
    <div class='box'>
        <item />
        <item />
        <item />
        ...
    </div>
</div>

/* js */
const waterfall = new Waterfall(el)
waterfall.reset() // 在实例化后待内容区生成后需要调用一次reset来确认布局
```

## api

**`waterfall.reset(transition = 0)`**
<br>>重新布局，参数transition为布局时的过渡时间，reset用于重新布局或删除元素后布局或插入元素后布局

**`waterfall.update()`**
<br>>更新布局，在往后添加元素后使用
