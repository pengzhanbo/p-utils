/**
 * @module date
 * @author pengzhanbo
 */
/**
 * @method dateDiff 时间差
 * @param {timestamp} start  开始时间戳
 * @param {timestamp} end  结束时间戳
 * @param {String} type  d: 天数 h: 小时数 m: 分钟 s：秒
 * @return {Number} diff 时间差
 */
export function dateDiff(start, end, type) {
    let diff = Math.abs(getDateZone(start) - getDateZone(end)) / 1000;
    // d : 24 * 60 * 60
    // h : 60 * 60
    // m : 60
    // s : 1
    let factor = [
        ['s', 1],
        ['m', 60],
        ['h', 60],
        ['d', 24]
    ];
    let index = 0;
    do {
        diff /= factor[index][1];
    } while (factor[index++][0] !== type && index < factor.length);

    return Math.ceil(diff);
}

function getDateZone(timestamp) {
    if (timestamp <= 0) {
        return 0;
    }
    let d = new Date();
    d.setTime(timestamp);
    let year = d.getFullYear();
    let month = d.getMonth() + 1;
    let da = d.getDate();
    return new Date(year, month - 1, da, 0, 0, 0).getTime();
}

/**
 * 获取当前时间或者距离当前时间days天的时间戳
 * @param {number} days 天数
 * @return {timestamp}
 */
let date = new Date();
let timestamp = 86400000;

export function getTimeByDays(days: number = 0) {
    days = days || 0;
    return date.getTime() + days * timestamp;
}

/**
 * 格式化非标准时间时间戳
 * @param {number|string} timestamp
 * @return {string}
 */
export function formatUnTimestamp(timestamp) {
    timestamp = Math.ceil(timestamp / 1000);
    let s = timestamp % 60;
    let m = Math.floor(timestamp / 60);
    let h = Math.floor(m / 60);
    s = s < 10 ? '0' + s : s;
    m = m < 10 ? '0' + m : m;
    h = h < 10 ? '0' + h : h;
    return `${h}:${m}:${s}`;
}

/**
 * 日期格式化函数
 * @param  {DateString}  timestamp default: 当前时间
 * @param  {formatString} fmt  default: yyyy-mm-dd  y:年 m:月 d:日 w:星期 h:小时 M:分钟 s:秒
 */
export function dateFormat(timestamp, fmt) {
    let D = new Date();
    let week = '日一二三四五六';
    timestamp && D.setTime(timestamp);
    fmt = fmt || 'yyyy-mm-dd';
    let d = {
        'm+': D.getMonth() + 1,
        'd+': D.getDate(),
        'w+': week.charAt(D.getDay()),
        'h+': D.getHours(),
        'M+': D.getMinutes(),
        's+': D.getSeconds()
    };
    if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (D.getFullYear() + '').slice(-RegExp.$1.length));
    }
    Object.keys(d).forEach((key) => {
        if (new RegExp(`(${key})`).test(fmt)) {
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? d[key] : (`00${d[key]}`).slice(('' + d[key]).length));
        }
    });
    return fmt;
};

/**
 * 将时区字符串转为时区数值（单位:分钟）
 * @param strTimezone 时区字符串，比如 GMT+8、GMT-9:30
 */
export function getTimezoneOffset(strTimezone = 'GMT+8') {
    const isWestern = strTimezone.indexOf('-') > -1; // 判断是不是西区，否则就是东区或者0时区
    const times = strTimezone.match(/[\d:]+/)[0].split(':'); // GMT+8 -> ['8'] 或 GMT-9:30 -> ['9', '30']
    times.length === 1 && times.push('0');

    const offset = parseInt(times[0]) * 60 + parseInt(times[1]);
    return parseInt(isWestern ? offset : ('-' + offset));
};

/**
 * 根据本地时间换算出时区的时间
 * @param strTimezone 目标所在时区，不传或者传空值默认就是本地时区，也就是没有时差
 */
export function getDestinationDate(strTimezone) {
    const date = new Date();
    let localTimezone = date.getTimezoneOffset();
    return date.getTime() + (strTimezone ? ((localTimezone - getTimezoneOffset(strTimezone)) * 60 * 1000) : 0);
};
