/**
 * @module cookie
 * @author pengzhanbo
 */

// import {objectAssign} from './object-assign';
import {hasOwn} from './validator';

// alias encodeURIComponent
let encode = encodeURIComponent;
// alias decodeURIComponent
let decode = decodeURIComponent;

// 默认cookie配置
let defaultOption = {
    'path': '/',
    'domain': '',
    // 过期时间 默认 7天过期时间
    // M:月， d: 天， m: 分， s: 秒
    'expires': '7d'
};

let cookiePattern = '=(.*?)((; )|$)';

/**
 * @method setCookie
 * @param {String} key cookie键
 * @param {String} value cookie 值
 * @param {Object} option cookie 配置
 * @return {Void}
 */
export function setCookie(key, value, option) {
    key = encode(key);
    value = encode(value);
    document.cookie = `${key}=${value}` + computedOption(option || {});
}

/**
 * @method getCookie
 * @param {String} key cookie键
 * @return {String}
 */
export function getCookie(key: string): string {
    key = encode(key);
    let match = new RegExp(key + cookiePattern).exec(document.cookie);
    return match ? decode(match[1]) : '';
}

/**
 * @method removeCookie
 * @param {String} key cookie键
 * @return {Void}
 */
export function removeCookie(key) {
    setCookie(key, '', {
        expires: '-1d'
    });
}

/**
 * @method computedOption
 * @param {Object} option cookie配置
 * @return {String}
 */
function computedOption(option) {
    let optionString = '';
    option = Object.assign(defaultOption, option);
    option.expires = computedExpires(option.expires);

    for (let key in option) {
        if (hasOwn(option, key) && option[key]) {
            optionString += `; ${key}=${option[key]}`;
        }
    }
    return optionString;
}

// M:月(30天)， d: 天，h m: 分， s: 秒
function computedExpires(expires) {
    let pattern = 'Mdhms'.split('');
    let factor = [2592000, 86400, 3600, 60, 1];
    let time = 0;
    let d = new Date();
    for (let i = 0, len = pattern.length; i < len; i++) {
        let match = new RegExp(`(-?\\d+)${pattern[i]}`).exec(expires);
        time += match ? (parseInt(match[1]) * factor[i]) : 0;
    }
    d.setTime(d.getTime() + time * 1000);
    return d.toGMTString();
}

export let cookie = {
    set: setCookie,
    get: getCookie,
    remove: removeCookie
};
