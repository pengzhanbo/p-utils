/**
 * @module dom
 */

/**
 * @function getOffset 获取元素距离页面顶部、左边的距离
 * @param {documentElement} el
 * @return {top, left}
 */
export function getOffset(el) {
    let left = 0;
    let top = 0;
    while (el) {
        left += el.offsetLeft;
        top += el.offsetTop;
        el = el.offsetParent;
    }
    return {
        left,
        top
    };
}

/**
 * 原生浏览器事件触发
 * @param element
 * @param event
 * @returns {boolean}
 */
export function trigger(element, event) {
    if (document.createEventObject) {
        // IE浏览器支持fireEvent方法
        let evt = document.createEventObject();
        return element.fireEvent('on' + event, evt);
    } else {
        // 其他标准浏览器使用dispatchEvent方法
        let evt = document.createEvent('HTMLEvents');
        evt.initEvent(event, true, true);
        return !element.dispatchEvent(evt);
    }
}

/**
 * @method hasClass 检索标签是否包含className
 * @param e 元素
 * @param c className
 * @return {boolean}
 */
export function hasClass(e, c) {
    var re = new RegExp('(^|\\s)' + c + '(\\s|$)');
    return re.test(e.className);
};

/**
 * @method addClass 给标签增加一个className，存在则忽略
 * @param e 元素
 * @param c className
 */
export function addClass(e, c) {
    if (hasClass(e, c)) {
        return;
    }
    var newClass = e.className.split(' ');
    newClass.push(c);
    e.className = newClass.join(' ');
};

/**
 * @method removeClass 删除标签上的一个className
 * @param e 元素
 * @param c className
 */
export function removeClass(e, c) {
    if (!hasClass(e, c)) {
        return;
    }
    var re = new RegExp('(^|\\s)' + c + '(\\s|$)', 'g');
    e.className = e.className.replace(re, ' ').replace(/(^\s*)|(\s*$)/g, '');
};

/**
 * @method 设置元素scrollTop
 * @param target 元素 default：document
 * @param scrollTop
 */
export function setScrollTop(target, scrollTop) {
    if ((typeof target === 'string' || typeof target === 'number') &&
        typeof scrollTop === 'undefined') {
        scrollTop = target;
        target = document;
        document.documentElement.scrollTop = scrollTop;
        document.body.scrollTop = scrollTop;
    } else {
        if (target === document) {
            console.log('target:document');
            document.body.scrollTop = scrollTop || 0;
            document.documentElement.scrollTop = scrollTop || 0;
        } else {
            target.scrollTop = scrollTop || 0;
        }
    }
};

/**
 * @method scrollTop 返回元素
 * @param target 元素
 */
export function getScrollTop(target) {
    if (target === document || !target) {
        return document.documentElement.scrollTop || document.body.scrollTop;
    } else {
        return target.scrollTop;
    }
};
