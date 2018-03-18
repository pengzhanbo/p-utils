/**
 * 归并排序
 */
const merge = (left, right, compare) => {
    let re = [];
    while (left.length > 0 && right.length > 0) {
        if (compare(left[0], right[0])) {
            re.push(left.shift());
        } else {
            re.push(right.shift());
        }
    }
    return re.concat(left).concat(right);
};

const mergeSort = (array, compare) => {
    if (array.length <= 1) return array;
    let mid = Math.floor(array.length / 2);
    let left = array.slice(0, mid);
    let right = array.slice(mid);
    return merge(mergeSort(left, compare), mergeSort(right, compare), compare);
};

export default mergeSort;
