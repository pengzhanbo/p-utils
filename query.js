/**
 * @module query
 * @author pengzhanbo
 */

import {
    hasOwn,
    isArray
} from './validator';

/**
 * @method getQuery 通过 key 获取 链接上的 参数
 * @param {String} key  键名
 * @return {queryString}
 */
export function getQuery(key) {
    // 匹配查找包括 search以及hash上带有的所有参数
    // hash参数的权重搞得search参数
    let hash = window.location.hash.replace(/^#(.*\?)?/, '');
    let search = window.location.search.replace(/^\?/, '');
        // 通过key，创建正则表达式，则子表达式 1 则是匹配的最终结果
    let pattern = new RegExp('(?:^|&)' + key + '=(.*?)(?:&|$)');
    let result = pattern.exec(hash + '&' + search);
    return result
    // 匹配的结果进行二次解码，确保输出结果正确性
        ? decodeURIComponent(decodeURIComponent(result[1]))
        : '';
}

/**
 * @method getAllQuery 获取链接上的所有参数
 * @return {queryObject}
 */
export function getAllQuery() {
    // 获取并过滤多余的字符
    let hash = window.location.hash.replace(/^#(.*\?)?/, '');
    let search = window.location.search.replace(/^\?/, '');
    let queryString = (search + '&' + hash).replace(/^&|&$/, '');
    // 子表达式1与子表达式2为键值对
    let pattern = new RegExp('(.*?)=(.*?)(&|$)', 'g');
    let result;
    let query = {};
    result = pattern.exec(queryString);
    while (result) {
        query[result[1]] = decodeURIComponent(decodeURIComponent(result[2]));
        result = pattern.exec(queryString);
    }
    return query;
}

/**
 * @method encodeQuery 编码query对象为 queryString
 * @param {Object} queryObj query对象
 * @return {queryString} query字符串
 */
export function encodeQuery(queryObj = {}) {
    let queryString = '';
    for (let key in queryObj) {
        if (hasOwn(queryObj, key)) {
            if (isArray(queryObj[key])) {
                queryObj[key] = queryObj[key].join(',');
            }
            queryString += `${key}=${encodeURI(encodeURI(queryObj[key]))}&`;
        }
    }
    return queryString.slice(0, -1);
}
