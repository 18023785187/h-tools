# LazyLoad（懒加载插件）
具有针对图片进行懒加载的功能

## 工作原理
- 用户为图片设置[data-src]属性，然后由LazyLoad获取所有含有[data-src]属性的元素
- LazyLoad对含有[data-src]属性的元素进行存储
- 监听每个含有[data-src]属性的元素的最近设置了[overflow:scroll]的父元素的各种事件(由用户传入，默认监听scroll事件)
- 通过事件判断含有[data-src]属性的元素的位置是否进入浏览器视口，如果进入则把元素的属性[data-src]上的值赋值给属性[src]
- 符合条件的元素将被LazyLoad在存储容器中移除，从而实现懒加载功能

## 参数
```javascript
{
    preload: number, /* 预加载的宽高，默认为 1 */
    loading: string, /* 加载中的显示的图片的路径，默认为 '' */
    error: string, /* 加载失败时现实的图片的路径，默认为 '' */
    attempt: number, /* 失败后尝试加载的次数，默认为 3 次 */
    throttle: number,  /* 节流时间，默认为 200ms */
    eventListener: Array<string> /* 需要监听的事件，以数组的形式传入事件名称，默认为 ['scroll'] */
}
```
## 使用
```javascript
/* html */
<img data-src='xxx.com' src='' />

/* js */
const lazyLoad = new LazyLoad({/* 配置参数，也可以不传使用默认参数 */})
```

# API

**`lazyLoad.update()`**
<br>>在视图发生更新后调用，使LazyLoad获取带有属性[data-src]的元素并存储

**`lazyLoad.render()`**
<br>>在插件内部会在监听事件的时候自动调用，也可以手动调用该方法

**`lazyLoad.eventManager`**
<br>>获取事件管理器，可以调用事件管理器的方法来添加监听和移除一些不必要的监听
