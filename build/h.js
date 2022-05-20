(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["h"] = factory();
	else
		root["h"] = factory();
})(self, function() {
return /******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	// The require scope
/******/ 	var __webpack_require__ = {};
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "EventListener": () => (/* reexport */ EventListener),
  "LazyLoad": () => (/* reexport */ LazyLoad),
  "Slide": () => (/* reexport */ Slide),
  "Waterfall": () => (/* reexport */ Waterfall)
});

;// CONCATENATED MODULE: ./src/components/EventListener/index.ts
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function invokeHandler(handler, event) {
  if (typeof handler === 'function') {
    // 如果包装事件是函数，则调用该事件
    handler.call(this, event);
  } else if (_typeof(handler) === 'object') {
    // 如果是数组，则调用每项事件
    for (var i = 0; i < handler.length; ++i) {
      invokeHandler.call(this, handler[i], event);
    }
  }
}
/**
 *  传入 el 元素以及事件代理池对象 on ，为 el 元素代理事件池，适用于需要绑定多个事件的元素，
 * 只需关注 on 对象即可。
 *
 *  EventListener 并不是真正绑定 on 对象中的事件，而是为每个事件绑定一个侦听器，由侦听器触发 on 对象中的方法。
 * EventListener 使使用者无需调用 addEventListener 绑定事件，只需简单在传入的 on 对象修改即可。
 *
 * 用法：
 *
 *  const el = document.createElement('div')
 *
 *  const eventListener = new EventListener(
      el,
      {
        click: [(e) => console.log(e), () => console.log('hi')],
      }
    )

    eventListener.on.dblclick = function() {} // 绑定了双击事件，也可以赋值一个方法数组

    delete eventListener.on.dblclick // 解除了双击事件，也可以移除某个双击事件，只需要在数组中删除目标方法即可

    eventListener.reflect({ // 重置 on 对象
      click: [() => console.log(555)]
    })
 */


var EventListener = /*#__PURE__*/function () {
  function EventListener(el, on) {
    var _this = this;

    _classCallCheck(this, EventListener);

    /**
     * on 对象需要代理才能进行简单的添加删除事件操作，这是处理对象
     */
    this._handle = {
      set: function set(on, event, listenerHandler) {
        var isAdd = !Reflect.has(on, event);
        Reflect.set(on, event, listenerHandler);

        if (isAdd) {
          _this._add(event);
        }

        return true;
      },
      deleteProperty: function deleteProperty(on, event) {
        var isDel = Reflect.has(on, event);

        if (isDel) {
          _this._delete(event);
        }

        return Reflect.deleteProperty(on, event);
      }
    };
    this.on = new Proxy(on !== null && on !== void 0 ? on : {}, this._handle);
    this._el = el;
    this._listenerMap = {};

    this._add();
  }

  _createClass(EventListener, [{
    key: "el",
    get: function get() {
      return this._el;
    }
    /**
     * 创建事件侦听器代理函数 handle ，handle 函数调用时会触发所有 this.on[eventTag]
     * @param {string} eventTag 事件名称
     * @returns {(event: Event) => void}
     */

  }, {
    key: "_createListener",
    value: function _createListener(eventTag) {
      var self = this;
      return function handle(event) {
        invokeHandler.call(this, self.on[eventTag], event);
      };
    }
    /**
     * 以 on 对象中的键为 _listenerMap 添加侦听器
     * @param {?string} event 事件名，不传则添加全部
     */

  }, {
    key: "_add",
    value: function _add(event) {
      if (event) {
        var listener = this._createListener(event);

        this.el.addEventListener(event, listener, false);
        this._listenerMap[event] = listener;
      } else {
        var eventPool = Object.keys(this.on);

        for (var i = 0; i < eventPool.length; ++i) {
          var _event = eventPool[i];

          var _listener = this._createListener(_event);

          this.el.addEventListener(_event, _listener, false);
          this._listenerMap[_event] = _listener;
        }
      }
    }
    /**
     * 以 on 对象中的键删除 _listenerMap 中的侦听器
     * @param {?string} event 事件名，不传则删除全部
     */

  }, {
    key: "_delete",
    value: function _delete(event) {
      if (event) {
        this.el.removeEventListener(event, this._listenerMap[event], false);
        delete this._listenerMap[event];
      } else {
        var eventPool = Object.keys(this._listenerMap);

        for (var i = 0; i < eventPool.length; ++i) {
          var _event2 = eventPool[i];
          this.el.removeEventListener(_event2, this._listenerMap[_event2], false);
          delete this._listenerMap[_event2];
        }
      }
    }
    /**
     * 为 on 对象重新赋值，并移除所有侦听器，绑定新的侦听器
     * @param {On} on
     */

  }, {
    key: "reflect",
    value: function reflect(on) {
      this._delete();

      this.on = new Proxy(on, this._handle);

      this._add();
    }
  }]);

  return EventListener;
}();
;// CONCATENATED MODULE: ./src/components/LazyLoad/ImageListener.ts
function ImageListener_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function ImageListener_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function ImageListener_createClass(Constructor, protoProps, staticProps) { if (protoProps) ImageListener_defineProperties(Constructor.prototype, protoProps); if (staticProps) ImageListener_defineProperties(Constructor, staticProps); return Constructor; }

/**
 * 劫持图片元素，可检测其是否处于视口再加载图片
 */
var ImageListener = /*#__PURE__*/function () {
  function ImageListener(el, src, options) {
    ImageListener_classCallCheck(this, ImageListener);

    this.el = el;
    this.src = src || '';
    this.options = options;
  }

  ImageListener_createClass(ImageListener, [{
    key: "_getDOMRect",
    value: function _getDOMRect(el) {
      return el.getBoundingClientRect();
    }
    /**
     * 检查元素是否在视口中
     * @returns {boolean}
     */

  }, {
    key: "_checkInView",
    value: function _checkInView() {
      var _this$options = this.options,
          viewport = _this$options.viewport,
          preload = _this$options.preload;

      var _this$_getDOMRect = this._getDOMRect(this.el),
          top = _this$_getDOMRect.top,
          right = _this$_getDOMRect.right,
          bottom = _this$_getDOMRect.bottom,
          left = _this$_getDOMRect.left;

      var w = viewport.w,
          h = viewport.h;
      return top < h * preload && bottom > 0 && left < w * preload && right > 0;
    }
  }, {
    key: "_loadImg",
    value: function _loadImg(resolve, reject) {
      if (this._checkInView()) {
        var img = new Image();
        img.src = this.src;
        img.onload = resolve;
        img.onerror = reject;
        return true;
      }

      return false;
    }
    /**
     * 暴露的接口，用于检测元素是否进入视口，如果进入视口，那么渲染该元素
     * @returns {boolean}
     */

  }, {
    key: "load",
    value: function load() {
      var _this = this;

      var attempt = this.options.attempt;

      var resolve = function resolve() {
        _this.el.src = _this.src;
      };

      var reject = function reject(e) {
        var count = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;

        if (count === attempt) {
          _this.el.src = _this.options.error;
          return;
        }

        _this._loadImg(resolve, reject.bind(_this, e, ++count));
      };

      return this._loadImg(resolve, reject);
    }
  }]);

  return ImageListener;
}();


;// CONCATENATED MODULE: ./src/components/LazyLoad/ListNode.ts
function ListNode_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function ListNode_createClass(Constructor, protoProps, staticProps) { if (protoProps) ListNode_defineProperties(Constructor.prototype, protoProps); if (staticProps) ListNode_defineProperties(Constructor, staticProps); return Constructor; }

function ListNode_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * 链表节点
 */
var Node = function Node(value) {
  ListNode_classCallCheck(this, Node);

  this.value = value;
  this.next = null;
};
/**
 * 链表
 */


var ListNode = /*#__PURE__*/function () {
  function ListNode() {
    ListNode_classCallCheck(this, ListNode);

    this.head = null;
    this.tail = null;
    this.length = 0;
  }
  /**
   * 末尾添加一个值
   * @param {T} value
   */


  ListNode_createClass(ListNode, [{
    key: "add",
    value: function add(value) {
      if (!this.head) {
        this.head = new Node(value);
        this.tail = this.head;
      } else {
        var node = new Node(value);
        this.tail.next = node;
        this.tail = node;
      }

      ++this.length;
    }
    /**
     * 删除符合值的节点
     * @param {T} value
     * @returns
     */

  }, {
    key: "remove",
    value: function remove(value) {
      var prev = null;
      var cur = this.head;

      while ((cur === null || cur === void 0 ? void 0 : cur.value) !== value) {
        prev = cur;
        cur = cur.next;
      }

      if (!cur) return;

      if (cur === this.head) {
        this.head = cur.next;
        !this.head && (this.tail = null);
      } else {
        prev.next = cur.next;
        !cur.next && (this.tail = prev);
      }

      --this.length;
    }
    /**
     * 判断链表是否为空
     * @returns {boolean}
     */

  }, {
    key: "isEmpty",
    value: function isEmpty() {
      return this.length === 0;
    }
    /**
     * 遍历节点
     * @param {(value: T, i: number) => void} callback
     */

  }, {
    key: "forEach",
    value: function forEach(callback) {
      var cur = this.head,
          i = 0;

      while (cur) {
        callback.call(this, cur.value, i);
        cur = cur.next;
        ++i;
      }
    }
  }]);

  return ListNode;
}();


;// CONCATENATED MODULE: ./src/utils/index.ts
/**
 * 检查类型，符合则返回，不符合会报错
 * @param {any} target
 * @param {string} type
 * @returns {boolean}
 */
function checkType(value, type) {
  type = type[0].toUpperCase() + type.substring(1);

  if (Object.prototype.toString.call(value) === "[object ".concat(type, "]")) {
    return true;
  }

  return false;
}
/**
 * 检查是否为移动端
 * @returns {booean}
 */

function isMobile() {
  if (navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i)) {
    return true;
  } else {
    return false;
  }
}
/**
 * 防抖 +节流函数
 * @param {function} fn
 * @param {number} time
 * @returns {function}
 */

function throttle(func) {
  var time = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
  var flag = true;
  var timer = null;
  return function () {
    var _this = this;

    for (var _len = arguments.length, rest = new Array(_len), _key = 0; _key < _len; _key++) {
      rest[_key] = arguments[_key];
    }

    if (timer != null) window.clearTimeout(timer);

    if (flag) {
      flag = false;
      func.apply(this, [].concat(rest));
      window.setTimeout(function () {
        flag = true;
      }, time);
    } else {
      timer = window.setTimeout(function () {
        func.apply(_this, [].concat(rest));
      }, time);
    }
  };
}
;// CONCATENATED MODULE: ./src/components/LazyLoad/index.ts
function LazyLoad_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function LazyLoad_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function LazyLoad_createClass(Constructor, protoProps, staticProps) { if (protoProps) LazyLoad_defineProperties(Constructor.prototype, protoProps); if (staticProps) LazyLoad_defineProperties(Constructor, staticProps); return Constructor; }




/**
 * 找有指定属性并且指定属性有指定值的父亲
 * @param {HTMLElement | null} parent 父元素
 * @param {string[]} props 属性链
 * @param {string} value 属性值
 * @returns {(Window & typeof globalThis) | HTMLElement} 如果有指定父元素，那么返回父元素，否则返回 window
 */

function searchParent(parent, props, value) {
  while (parent) {
    try {
      var flag = false;

      for (var i = 0; i < props.length; ++i) {
        var prop = props[i];

        if (getComputedStyle(parent)[prop] === value) {
          flag = true;
          break;
        }
      }

      if (flag) break;
    } catch (e) {
      parent = parent.parentNode;
      break;
    }

    parent = parent.parentNode;
  }

  return parent === null ? window : parent;
}
/**
 * 把属性中带有 data-src 的图片元素添加到监听链表中，当元素进入视口时将渲染该图片
 */


var LazyLoad = /*#__PURE__*/function () {
  function LazyLoad(options) {
    var _this = this;

    LazyLoad_classCallCheck(this, LazyLoad);

    this._options = this._handleOptions(options);
    this._listNode = new ListNode();
    this._viewport = {
      w: window.innerWidth,
      h: window.innerHeight
    };
    this.render = throttle(this._render.bind(this), this._options.throttle);
    this.update();
    this.render(); // 视口尺寸改变时需要更新视口范围的判断依据

    window.addEventListener('resize', throttle(function () {
      _this._viewport = {
        w: window.innerWidth,
        h: window.innerHeight
      };
    }, this._options.throttle));
  } // 处理options参数


  LazyLoad_createClass(LazyLoad, [{
    key: "_handleOptions",
    value: function _handleOptions(options) {
      if (!options) return {
        preload: 1,
        loading: '',
        error: '',
        attempt: 3,
        throttle: 300,
        eventListener: ['scroll']
      };
      var preload = options.preload,
          loading = options.loading,
          error = options.error,
          attempt = options.attempt,
          throttle = options.throttle,
          eventListener = options.eventListener;
      !checkType(preload, 'number') && (preload = 1);
      !checkType(loading, 'string') && (loading = '');
      !checkType(error, 'string') && (error = '');
      !checkType(attempt, 'number') && (attempt = 3);
      !checkType(throttle, 'number') && (throttle = 200);
      !checkType(eventListener, 'array') && (eventListener = ['scroll']);
      return {
        preload: preload,
        loading: loading,
        error: error,
        attempt: attempt,
        throttle: throttle,
        eventListener: eventListener
      };
    }
    /**
     * 渲染
     */

  }, {
    key: "_render",
    value: function _render() {
      var _this2 = this;

      window.requestAnimationFrame(function () {
        _this2._listNode.forEach(function (listener) {
          listener.load() && _this2._listNode.remove(listener);
        });
      });
    }
    /**
     * 更新 ImageListener 并进行一次渲染
     */

  }, {
    key: "update",
    value: function update() {
      var _this3 = this;

      var options = this._options;
      var oImg = document.querySelectorAll('[data-src]');
      oImg.forEach(function (img) {
        if (img.tagName === 'IMG') {
          img.src = _this3._options.loading;
          var el = img;
          var src = img.getAttribute('data-src');
          img.removeAttribute('data-src');

          _this3._listNode.add(new ImageListener( // 劫持该元素
          el, src, {
            preload: options.preload,
            loading: options.loading,
            error: options.error,
            attempt: options.attempt,
            viewport: _this3._viewport
          })); // 如果当前元素的祖父元素可以滑动，那么添加渲染事件


          options.eventListener.forEach(function (event) {
            searchParent(img.parentNode, ['overflow', 'overflow-x', 'overflow-y'], 'scroll').addEventListener(event, _this3.render); // addEventListener 对于相同函数只绑定一次
          });
        }
      });
      this.render(); // 更新后触发一次 render，把处在视口中的元素渲染
    }
  }]);

  return LazyLoad;
}();
;// CONCATENATED MODULE: ./src/components/Waterfall/index.ts
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function Waterfall_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function Waterfall_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function Waterfall_createClass(Constructor, protoProps, staticProps) { if (protoProps) Waterfall_defineProperties(Constructor.prototype, protoProps); if (staticProps) Waterfall_defineProperties(Constructor, staticProps); return Constructor; }


/**
 * 根据给定条件计算列数和外边距
 * @param {number} rootWidth 总宽度
 * @param {number} innerWidth 内容物宽度
 * @param {number} minMargin 外边距的最小值，最终得出的外边距只能大于或等于这个值
 * @returns {compose}
 */

function handleCompose(rootWidth, innerWidth) {
  var minMargin = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
  var line = 1; // 定义每列列数
  // 如果一个内容物 + 两个最小外边距大于或等于容器宽度，那么外边距是 options 的设定值

  if (rootWidth <= innerWidth + minMargin * 2) return {
    line: line,
    margin: minMargin
  };
  line = Math.floor(rootWidth / innerWidth); // 计算列数

  return function handleMargin(line) {
    if (line < 1) return {
      line: 1,
      margin: minMargin
    };
    var margin = (rootWidth - innerWidth * line) / (line + 1); // 计算外边距

    if (margin < minMargin) return handleMargin(line - 1); // 如果计算出的外边距小于设定值，则牺牲一行重新计算

    return {
      line: line,
      margin: margin
    };
  }(line);
}

var Waterfall = /*#__PURE__*/function () {
  function Waterfall(el, options) {
    Waterfall_classCallCheck(this, Waterfall);

    var _a;

    this._options = options;
    this._el = el;
    this._pos = 0; // 获取最新的 el 下面的第一个子元素作为容器

    if (!this._el.firstElementChild) {
      throw new Error("el need a child element");
    }

    this._box = this._el.firstElementChild;
    this._box.style.position = 'relative';
    this._children = this._box.children;
    this._heights = [];

    if (!isMobile()) {
      // 如果不是移动端，需要添加视口尺寸改变事件重置瀑布流布局
      window.addEventListener('resize', throttle(this.reset.bind(this, 200), (_a = options === null || options === void 0 ? void 0 : options.throttle) !== null && _a !== void 0 ? _a : 200));
    }
  } // 处理options参数


  Waterfall_createClass(Waterfall, [{
    key: "_handleOptions",
    value: function _handleOptions() {
      var _a;

      var width = this._el.clientWidth;
      var childWidth = this._children[0].offsetWidth;

      var _ref = (_a = this._options) !== null && _a !== void 0 ? _a : {},
          marginTop = _ref.marginTop,
          minMargin = _ref.minMargin;

      var _handleCompose = handleCompose(width, childWidth, minMargin),
          line = _handleCompose.line,
          margin = _handleCompose.margin; // 得出列数和外边距


      this._margin = margin;
      this._marginTop = marginTop == null ? margin : marginTop; // 如果设定了上外边距，那么使用设定值

      this._heights = new Array(line).fill(0); // 初始化每列高度
    }
    /**
     * 从 pos 项开始布局内容物
     * @param {number} transition 动画时间，在排版时将会看到效果
     */

  }, {
    key: "_layout",
    value: function _layout() {
      var transition = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
      var _box = this._box,
          _children = this._children,
          _heights = this._heights,
          _marginTop = this._marginTop,
          _margin = this._margin;
      var childWidth = _children[0].offsetWidth;

      for (; this._pos < this._children.length; ++this._pos) {
        handler(this._pos);
      }
      /**
       * 布局处理
       * @param {number} i 当前处理项的索引
       */


      function handler(i) {
        window.requestAnimationFrame(function () {
          _children[i].style.cssText += "position: absolute;"; // 设置绝对定位，使元素统一起点位置

          var insert = _heights.indexOf(Math.min.apply(Math, _toConsumableArray(_heights))); // 获取当前插入位置


          _children[i].style.cssText += // 放置内容物到结果位置
          "\n          transition: all ".concat(transition, "ms;\n          transform: translate3d(").concat(_margin * (insert + 1) + childWidth * insert, "px,").concat(_marginTop + _heights[insert], "px,0);\n        "); // 刷新容器的高度

          _heights[insert] += _marginTop + _children[i].offsetHeight;
          _box.style.cssText += "\n          height: ".concat(Math.max.apply(Math, _toConsumableArray(_heights)) + _margin, "px;\n          transition: all ").concat(transition, "ms;\n        ");
        });
      }
    }
    /**
     * 重置布局，在刷新、插入、删除的情况下使用
     * @param {number} transition 动画时间，在排版时将会看到效果
     */

  }, {
    key: "reset",
    value: function reset() {
      var transition = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
      this._pos = 0; // 重置索引

      this._handleOptions(); // 重置配置项


      this._layout(transition); // 布局

    }
    /**
     * 更新，当有新的内容物时需要调用更新方法使新内容物布局，在推入的情况下使用
     */

  }, {
    key: "update",
    value: function update() {
      this._layout();
    }
  }]);

  return Waterfall;
}();
;// CONCATENATED MODULE: ./src/components/Slide/insertHeadAndTail.ts
/**
 * 往目标元素前后插入其子元素后前的克隆
 * @param parent
 * @param htmlElementArr
 * @returns {HTMLElement[]}
 */
function insertHeadAndTail(parent, htmlElementArr) {
  var tail = htmlElementArr[0].cloneNode(true),
      head = htmlElementArr[htmlElementArr.length - 1].cloneNode(true);
  parent.insertBefore(head, parent.firstElementChild);
  parent.appendChild(tail);
  return Array.from(parent.children);
}

/* harmony default export */ const Slide_insertHeadAndTail = (insertHeadAndTail);
;// CONCATENATED MODULE: ./src/components/Slide/transform.ts
/**
 * 设置目标元素的 translate3d、transition属性
 * @param el
 * @param translate3d
 * @param transition
 */
function transform(el) {
  var translate3d = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [0, 0];
  var transition = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
  el.style.cssText += "\n        transition: all ".concat(transition, "ms;\n        transform: translate3d(").concat(translate3d[0], "%,").concat(translate3d[1], "%,0)\n    ");
}

/* harmony default export */ const Slide_transform = (transform);
;// CONCATENATED MODULE: ./src/components/Slide/Cross/index.ts
function Cross_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function Cross_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function Cross_createClass(Constructor, protoProps, staticProps) { if (protoProps) Cross_defineProperties(Constructor.prototype, protoProps); if (staticProps) Cross_defineProperties(Constructor, staticProps); return Constructor; }




var Cross = /*#__PURE__*/function () {
  function Cross(el, options) {
    Cross_classCallCheck(this, Cross);

    this.el = el;
    this.options = options;
    this.children = [];
    this.pos = -100;
    this.point = 0;
    this.changeEvent = [];
    this.layout();
    this.setTimer();
    options.bindEvent && this.bindTouchEvent();
  }

  Cross_createClass(Cross, [{
    key: "layout",
    value: function layout() {
      var el = this.el;
      var _this$options = this.options,
          box = _this$options.box,
          children = _this$options.children;
      el.style.display = 'none';
      this.children = Slide_insertHeadAndTail(box, children);
      el.style.cssText += "\n            overflow: hidden;\n        ";
      box.style.cssText += "\n            display: flex;\n            transform: translate3d(".concat(this.pos, "%,0,0)\n        ");
      this.children.forEach(function (child) {
        child.style.cssText += "\n                flex: 1 0 auto;\n                display: block;\n                width: 100%;\n            ";
      });
      el.style.display = '';
    }
  }, {
    key: "change",
    value: function change() {
      var _this = this;

      window.requestAnimationFrame(function () {
        var _this$options2 = _this.options,
            box = _this$options2.box,
            transition = _this$options2.transition,
            children = _this$options2.children,
            changeEvent = _this.changeEvent;
        _this.pos = -100 * _this.point - 100;
        Slide_transform(box, [_this.pos, 0], transition);

        if (_this.point >= children.length) {
          _this.point = 0;
          _this.pos = -100 * _this.point - 100;
          changeEvent.forEach(function (callback) {
            return callback(_this.point);
          });
          window.setTimeout(function () {
            Slide_transform(box, [_this.pos, 0], 0);
          }, transition);
          return;
        } else if (_this.point < 0) {
          _this.point = children.length - 1;
          _this.pos = -100 * _this.point - 100;
          changeEvent.forEach(function (callback) {
            return callback(_this.point);
          });
          window.setTimeout(function () {
            Slide_transform(box, [_this.pos, 0], 0);
          }, transition);
          return;
        }

        changeEvent.forEach(function (callback) {
          return callback(_this.point);
        });
      });
    }
  }, {
    key: "bindTouchEvent",
    value: function bindTouchEvent() {
      var self = this;
      var el = this.el,
          _this$options3 = this.options,
          box = _this$options3.box,
          triggerPos = _this$options3.triggerPos;
      el.addEventListener('touchstart', touchstart);
      el.addEventListener('touchmove', touchmove);
      el.addEventListener('touchend', touchend);
      var css = window.getComputedStyle(el);
      var elWidth = el.clientWidth;
      var elOffsetLeft = el.getClientRects()[0].left;
      var borderLeft = parseFloat(css.borderLeftWidth.substring(0, css.borderLeftWidth.length - 2));
      var startPos = 0,
          movePos = 0;

      function touchstart(e) {
        e.preventDefault();
        self.clearTimer();
        startPos = countPos(e.touches[0].pageX);
      }

      function touchmove(e) {
        movePos = countPos(e.touches[0].pageX) - startPos;
        Slide_transform(box, [movePos + self.pos, 0]);
      }

      function touchend() {
        self.setTimer();

        if (movePos >= triggerPos) {
          --self.point;
        } else if (movePos <= -triggerPos) {
          ++self.point;
        }

        self.change();
        startPos = 0, movePos = 0;
      }

      function countPos(pos) {
        return Math.ceil((pos - elOffsetLeft - borderLeft) / elWidth * 100);
      }
    }
  }, {
    key: "onchange",
    value: function onchange(callback) {
      this.changeEvent.push(callback);
    }
  }, {
    key: "moveChange",
    value: function moveChange(movePos) {
      movePos === 'left' ? --this.point : ++this.point;
      this.change();
    }
  }, {
    key: "setTimer",
    value: function setTimer() {
      var _this2 = this;

      var triggerTime = this.options.triggerTime;
      this.timer = window.setInterval(function () {
        ++_this2.point;

        _this2.change();
      }, triggerTime);
    }
  }, {
    key: "clearTimer",
    value: function clearTimer() {
      window.clearInterval(this.timer);
    }
  }, {
    key: "update",
    value: function update(updateChildCallback) {
      var _this$options4 = this.options,
          box = _this$options4.box,
          nav = _this$options4.nav;
      var options = this.options,
          children = this.children;
      box.removeChild(children[0]);
      box.removeChild(children[children.length - 1]);
      updateChildCallback(box);
      options.children = Array.from(box.children);

      if (nav) {
        nav.layout(options.children.length);
      }

      this.layout();
      this.change();
    }
  }]);

  return Cross;
}();

/* harmony default export */ const Slide_Cross = (Cross);
;// CONCATENATED MODULE: ./src/components/Slide/Vertical/index.ts
function Vertical_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function Vertical_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function Vertical_createClass(Constructor, protoProps, staticProps) { if (protoProps) Vertical_defineProperties(Constructor.prototype, protoProps); if (staticProps) Vertical_defineProperties(Constructor, staticProps); return Constructor; }




var Vertical = /*#__PURE__*/function () {
  function Vertical(el, options) {
    Vertical_classCallCheck(this, Vertical);

    this.el = el;
    this.options = options;
    this.children = [];
    this.pos = 0;
    this.point = 0;
    this.changeEvent = [];
    this.layout();
    this.setTimer();
  }

  Vertical_createClass(Vertical, [{
    key: "layout",
    value: function layout() {
      var el = this.el;
      var _this$options = this.options,
          box = _this$options.box,
          children = _this$options.children;
      var height = el.clientHeight;
      el.style.display = 'none';
      this.children = Slide_insertHeadAndTail(box, children);
      this.pos = -100;
      el.style.cssText += "\n            position: relative;\n            overflow: hidden;\n        ";
      box.style.cssText += "\n            transform: translate3d(0,".concat(this.pos, "%,0);\n            height: ").concat(height, "px;\n        ");
      this.children.forEach(function (child) {
        child.style.cssText += "\n                display: block;\n                height: ".concat(height, "px;\n            ");
      });
      el.style.display = '';
    }
  }, {
    key: "setTimer",
    value: function setTimer() {
      var _this = this;

      var triggerTime = this.options.triggerTime;
      this.timer = window.setInterval(function () {
        ++_this.point;

        _this.change();
      }, triggerTime);
    }
  }, {
    key: "change",
    value: function change() {
      var _this2 = this;

      window.requestAnimationFrame(function () {
        var _this2$options = _this2.options,
            box = _this2$options.box,
            transition = _this2$options.transition,
            children = _this2$options.children;
        var changeEvent = _this2.changeEvent;
        _this2.pos = -100 * _this2.point - 100;
        Slide_transform(box, [0, _this2.pos], transition);

        if (_this2.point >= children.length) {
          _this2.point = 0;
          _this2.pos = -100 * _this2.point - 100;
          changeEvent.forEach(function (callback) {
            return callback(_this2.point);
          });
          window.setTimeout(function () {
            Slide_transform(box, [0, _this2.pos], 0);
          }, transition);
          return;
        } else if (_this2.point < 0) {
          _this2.point = children.length - 1;
          _this2.pos = -100 * _this2.point - 100;
          changeEvent.forEach(function (callback) {
            return callback(_this2.point);
          });
          window.setTimeout(function () {
            Slide_transform(box, [0, _this2.pos], 0);
          }, transition);
          return;
        }

        changeEvent.forEach(function (callback) {
          return callback(_this2.point);
        });
      });
    }
  }, {
    key: "onchange",
    value: function onchange(callback) {
      this.changeEvent.push(callback);
    }
  }, {
    key: "moveChange",
    value: function moveChange(movePos) {
      movePos === 'left' ? --this.point : ++this.point;
      this.change();
    }
  }, {
    key: "clearTimer",
    value: function clearTimer() {
      window.clearInterval(this.timer);
    }
  }, {
    key: "update",
    value: function update(updateChildCallback) {
      var _this$options2 = this.options,
          prevChildren = _this$options2.children,
          box = _this$options2.box,
          nav = _this$options2.nav;
      var options = this.options;
      var fragmenet = document.createDocumentFragment();
      prevChildren.forEach(function (child) {
        return fragmenet.appendChild(child);
      });
      box.innerHTML = '';
      box.appendChild(fragmenet);
      updateChildCallback(box);
      options.children = Array.from(box.children);

      if (nav) {
        nav.layout(options.children.length);
      }

      this.layout();
      this.change();
    }
  }]);

  return Vertical;
}();

/* harmony default export */ const Slide_Vertical = (Vertical);
;// CONCATENATED MODULE: ./src/components/Slide/Nav/index.ts
function Nav_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function Nav_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function Nav_createClass(Constructor, protoProps, staticProps) { if (protoProps) Nav_defineProperties(Constructor.prototype, protoProps); if (staticProps) Nav_defineProperties(Constructor, staticProps); return Constructor; }

var HIGH_COLOR = 'rgba(255,255,255,.8)';
var COLOR = 'rgba(0,0,0,.3)';

var Nav = /*#__PURE__*/function () {
  function Nav(el, childLen) {
    var _this = this;

    Nav_classCallCheck(this, Nav);

    this.update = function (pos) {
      var children = _this.nav.children;

      for (var i = 0; i < _this.childLen; ++i) {
        children[i].style.backgroundColor = COLOR;
      }

      children[pos].style.backgroundColor = HIGH_COLOR;
    };

    var content = document.createElement('div');
    content.className += "slide-nav-box";
    content.style.cssText += "position: relative;";
    el.appendChild(content);
    this.el = content;
    this.childLen = childLen;
    this.createNav();
    this.update(0);
  }

  Nav_createClass(Nav, [{
    key: "createNav",
    value: function createNav() {
      var el = this.el,
          childLen = this.childLen;
      var nav = document.createElement('div'),
          point = document.createElement('div');
      el.appendChild(nav);
      layoutNavStyle();
      layoutPointStyle();
      createPoint();
      this.nav = nav;

      function createPoint() {
        for (var i = 0; i < childLen; ++i) {
          nav.appendChild(point.cloneNode(true));
        }
      }

      function layoutNavStyle() {
        var len = nav.clientWidth * 0.02;
        nav.className += 'slide-nav';
        nav.style.cssText += "\n                display: flex;\n                justify-content: center;\n                align-items: center;\n                position: absolute;\n                left: 0;\n                right: 0;\n                bottom: ".concat(len, "px;\n                z-index: 2;\n            ");
      }

      function layoutPointStyle() {
        var len = nav.clientWidth * 0.02;
        point.className += 'slide-nav-item';
        point.style.cssText += "\n                width: ".concat(len, "px;\n                height: ").concat(len, "px;\n                margin: 0 ").concat(len, "px;\n                background-color: ").concat(COLOR, ";\n                border-radius: 50%;\n            ");
      }
    }
  }, {
    key: "layout",
    value: function layout(childLen) {
      this.el.removeChild(this.nav);
      this.childLen = childLen;
      this.createNav();
      this.update(0);
    }
  }]);

  return Nav;
}();

/* harmony default export */ const Slide_Nav = (Nav);
;// CONCATENATED MODULE: ./src/components/Slide/index.ts
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }





var handlerOptions = Symbol('handlerOptions');
var Slide = _defineProperty({
  create: function create(el, options) {
    options = this[handlerOptions](el, options);
    var slide = options.transverse ? new Slide_Cross(el, options) : new Slide_Vertical(el, options);
    options.nav && slide.onchange(options.nav.update);
    return slide;
  }
}, handlerOptions, function (el, options) {
  var transverse = true,
      createNav = true,
      transition = 200,
      triggerTime = 3000,
      triggerPos = 10,
      bindEvent = true;
  checkType(options === null || options === void 0 ? void 0 : options.transverse, 'boolean') && (transverse = options.transverse);
  checkType(options === null || options === void 0 ? void 0 : options.createNav, 'boolean') && (createNav = options.createNav);
  checkType(options === null || options === void 0 ? void 0 : options.transition, 'number') && (transition = options.transition);
  checkType(options === null || options === void 0 ? void 0 : options.triggerTime, 'number') && (triggerTime = options.triggerTime);
  checkType(options === null || options === void 0 ? void 0 : options.triggerPos, 'number') && (triggerPos = options.triggerPos);
  checkType(options === null || options === void 0 ? void 0 : options.bindEvent, 'boolean') && (bindEvent = options.bindEvent);

  if (!el.firstElementChild) {
    throw new Error("el need a child element");
  }

  var box = el.firstElementChild,
      children = Array.from(box.children);
  var nav = createNav ? new Slide_Nav(el, children.length) : undefined;
  return {
    nav: nav,
    box: box,
    children: children,
    transverse: transverse,
    transition: transition,
    triggerTime: triggerTime,
    triggerPos: triggerPos,
    bindEvent: bindEvent
  };
});
;// CONCATENATED MODULE: ./src/index.ts




/******/ 	return __webpack_exports__;
/******/ })()
;
});
//# sourceMappingURL=h.js.map