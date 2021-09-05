- 一个组件库，包含轮播图、瀑布流、懒加载等

# 源码地址
    https://github.com/18023785187/h-tools
# demo
    https://18023785187.github.io/h-tools/

# 安装
## npm install h-tools-js

# 引入

    import {
        Slide,
        Waterfall,
        LazyLoad,
        EventManager
    } from 'h-tools-js'

    import h from 'h-tools-js'
    const {
        Slide,
        Waterfall,
        LazyLoad,
        EventManager
    } = h

# 使用


# Slide轮播图

    一个同时支持pc端和移动端的轮播图。

# 功能特性

- 横向轮播和纵向轮播。
- 更新视图。
- 自带移动端事件，pc端可以调用api进行轮播。
- 提供change事件，在每次触发轮播时触发。
    
# 使用

    html
        <div class='slide'>
            <div class='box'>
                <item />
                <item />
                <item />
                ...
            </div>
        </div>

    js
        const slide = Slide.create(el)

# 参数

    Slide.create(el:HTMLElement,options:{

    })

    el: 目标元素,
    options: {
        transverse: boolean, /* 指定轮播图应为横向轮播还是纵向轮播，默认为true横向 */
        createNav: boolean, /* 是否创建导航点，默认为true */
        transition: number, /* 指定轮播图的动画持续时间，默认为 200ms */
        triggerTime: number, /* 指定轮播图的触发时间间隔，默认为 3000ms */
        triggerPos: 0-100, /* 指定轮播图移动多少距离触发轮播，默认为 10% */
        bindEvent: boolean, /* 指定是否开启移动端触摸事件，仅限于横向轮播和移动端，默认为true */
    }

# api

## Slide.create(el:HTMLElement,options:{...}):Slide
    创建轮播图。

## slide.onchange(callback: (pos: number) => void):void
    绑定轮播图的触发事件，在每次触发轮播时触发。
    callback: (pos: number) => void : 传入一个回调函数，回调函数的参数是当前第pos。

## slide.moveChange(movePos: 'left' | 'right'):void
    手动触发一次轮播事件，用于pc端的触发。
    movePos: 'left' | 'right' : 需要'left'或'right'作为参数，如果是'left'，则往左轮播，反之往右轮播。

## slide.setTimer(): void
    开启轮播定时器。

## slide.clearTimer(): void
    关闭轮播定时器。

## slide.update(updateChildCallback: (box: HTMLElement) => void): void
    更新轮播图视图，在轮播图有子节点需要更新时使用。
    updateChildCallback: (box: HTMLElement) => void ：传入一个回调函数，该回调函数用于写入添加、插入、删除子节点的操作，提供box参数，box为子节点的父元素，可使用box进行修改操作。


# Waterfall(瀑布流式布局)

# 参数

    (element: HTMLElement, {
        marginTop: number,
        minMargin: number,
        throttle: number = 200
    })
    
    element: 绑定的元素,
    {
        marginTop: 可选值，上边距,
        minMargin: 可选值，左右下最小边距，边距只能大于或等于这个值,
        throttle: 可选值，节流防抖的时间间隔，默认为200ms，在pc端生效
    }

# 使用

    html
        <div class='waterfall'>
            <div class='box'>
                <item />
                <item />
                <item />
                ...
            </div>
        </div>

    js
        const waterfall = new Waterfall(el)
        waterfall.reset() // 在实例化后待内容区生成后需要调用一次reset来确认布局

# api

##  waterfall.reset(transition = 0)

    重新布局，参数transition为布局时的过渡时间，reset用于重新布局或删除元素后布局或插入元素后布局

## waterfall.update()

    更新布局，在往后添加元素后使用

# LazyLoad（懒加载插件）

    具有针对图片进行懒加载的功能

# 工作原理

- 用户为图片设置[data-src]属性，然后由LazyLoad获取所有含有[data-src]属性的元素
- LazyLoad对含有[data-src]属性的元素进行存储
- 监听每个含有[data-src]属性的元素的最近设置了[overflow:scroll]的父元素的各种事件(由用户传入，默认监听scroll事件)
- 通过事件判断含有[data-src]属性的元素的位置是否进入浏览器视口，如果进入则把元素的属性[data-src]上的值赋值给属性[src]
- 符合条件的元素将被LazyLoad在存储容器中移除，从而实现懒加载功能

# 参数

    {
        preload: number, /* 预加载的宽高，默认为 1 */
        loading: string, /* 加载中的显示的图片的路径，默认为 '' */
        error: string, /* 加载失败时现实的图片的路径，默认为 '' */
        attempt: number, /* 失败后尝试加载的次数，默认为 3 次 */
        throttle: number,  /* 节流时间，默认为 200ms */
        eventListener: Array<string> /* 需要监听的事件，以数组的形式传入事件名称，默认为 ['scroll'] */
    }

# 使用

    /* html */
        <img data-src='xxx.com' src='' />

    /* js */
        const lazyLoad = new LazyLoad({/* 配置参数，也可以不传使用默认参数 */})

# API

## lazyLoad.update()
    在视图发生更新后调用，使LazyLoad获取带有属性[data-src]的元素并存储

## lazyLoad.render()
    在插件内部会在监听事件的时候自动调用，也可以手动调用该方法

## lazyLoad.eventManager
    获取事件管理器，可以调用事件管理器的方法来添加监听和移除一些不必要的监听

  
# EventManager（事件集中管理器）

    用于对需要多重事件绑定的元素，能有效地管理元素下所绑定的事件

    在EventManager内部具有以下结构
        Map {
            dom -> Map {
                        'eventName' -> Set [eventFn1,eventFn2,...]
                   }
        }
    
    其中最外层容器由 Map 构成，最外层容器的名值对为 [元素 -> 内层Map]，内层Map的名值对为 [事件名 -> Set事件方法集合]

    外层Map -> 存储元素和其对应的事件名和事件方法
    内层Map -> 存储事件名和其对应的事件方法
    Set -> 存储事件方法

# 使用

    const eventManager = new EventManager()

# API

## eventManager.bindEvent(el,eventName,event)
    为EventManager添加监听并绑定目标事件
    el为需要被监听的元素
    eventName为事件名
    event为事件方法

## eventManager.unbindEvent(eventName = 'all',el = eventListener)
    对目标元素解绑事件并移除监听
    eventName为事件名，默认值为'all'，即移除所有目标元素的所有事件
    el为目标元素，默认值为eventListener（内部的存储器，用户不传值时为默认值），即移除所有元素的所有事件

## eventManager.clear()
    移除所有元素的所有事件

## eventManager.toString()
    打印eventManager的状态

# 注意
    在某个元素需要被删除时请在删除元素前调用unbindEvent('all',需要删除的元素)来解开EventManager对该元素的管理，避免造成内存泄漏
