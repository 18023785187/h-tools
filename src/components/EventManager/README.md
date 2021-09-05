
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

