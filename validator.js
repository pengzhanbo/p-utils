/**
 * @module validator
 * @author pengzhanbo
 */

/**
 * @method hasOwn  判断一个属性是定义在对象本身而不是继承自原型链
 * @param {Object} obj 对象
 * @param {String} key 键
 * @return {Boolean}
 */
export function hasOwn(obj, key) {
    return !!Object.prototype.hasOwnProperty.call(obj, key);
}

/**
 * 判断对象是否空对象
 * @param  {[object]}  obj [被测元素]
 * @return {Boolean}     [是否为空对象]
 */
export function isEmptyObject(obj) {
    for (let attr in obj) {
        if (hasOwn(obj, attr)) {
            return false;
        }
    }
    return true;
}

/**
 * @method isType 类型判断
 * @param variable 变量
 * @param type 类型
 * @return {Boolean}
 */
export function isType(variable, type) {
    return Object.prototype.toString.call(variable) === `[object ${type}]`;
}

/**
 * @method isString 字符串类型判断
 * @param variable 变量
 * @return {Boolean}
 */
export function isString(variable) {
    return isType(variable, 'String');
}

/**
 * @method isArray 数组判断
 * @param variable 变量
 * @return {Boolean}
 */
export function isArray(variable) {
    return isType(variable, 'Array');
}

/**
 * @method isObject 对象判断
 * @param variable 变量
 * @return {Boolean}
 */
export function isObject(variable: any) {
    return isType(variable, 'Object');
}

/**
 * @method isNull
 * @param variable 变量
 * @return {Boolean}
 */
export function isNull(variable) {
    return isType(variable, 'Null');
}

/**
 * @method isRegExp
 * @param variable 变量
 * @return {Boolean}
 */
export function isRegExp(variable) {
    return isType(variable, 'RegExp');
}

export function isBoolean(variable) {
    return isType(variable, 'Boolean');
}

/**
 * @method isEmpty 空判断
 * @return {Boolean}
 */
export function isEmpty(variable, trim) {
    // 如果为对象
    if (isObject(variable)) {
        return Object.keys(variable).length === 0;
    }
    // 如果为数组
    if (isArray(variable)) {
        return variable.length === 0;
    }
    // 如果为 undefined 或者 null
    if (isNull(variable) || typeof variable === 'undefined') {
        return true;
    }
    // 把变量转为字符串
    variable = '' + variable;
    // 去除首尾空格
    // 一个长的空字符串，是否当做一个空字符串 ？
    if (trim) {
        variable = variable.replace(/(^\s+)|(\s+$)/g, '');
    }
    return variable === '';
}
