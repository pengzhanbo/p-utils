/**
 * @module array 定义数组工具方法
 * @author pengzhanbo
 */

import {isArray} from './validator';

/**
 * @function arrayGroupLength 将一维数组分为length个二维数组
 * @param {Array} array 原数组
 * @param {Number} length 组长度
 * @return {Array<array>}
 */
export function arrayGroupLength(array, length) {
    length = length || 0;
    // 如果数据非数组，或者分组的长度依据为0，
    // 则直接返回原数据
    if (!isArray(array) || length === 0) {
        return array;
    }

    let result = [];
    let i = 0;
    // 通过进一法
    // 求出需要分出多少组
    let len = Math.ceil(array.length / length);

    for (; i < len; i++) {
        // 利用数组 splice 方法，删除数组元素的时会返回被删除的元素
        // 将删除的元素放入结果数组中
        result.push(array.splice(0, length));
    }

    return result;
};

/**
 * 从数组中移除特定的项
 * @param item
 * @param array
 */
export const arrayRemove = (item, array) => {
    let index = array.indexOf(item);
    if (index > -1) {
        array.splice(index, 1);
    }
    return array;
};
