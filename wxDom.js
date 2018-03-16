/**
 * 获取节点相对滚动节点的 offset值 （而非小程序提供的相对可视窗口的offset值）
 * @param {string} select 节点 与 select()方法一致
 * @param {string} parent 节点相对滚动节点，非必传，不传以 viewport为默认值
 */
export function getOffset(select, parent) {
    let query = wx.createSelectorQuery();
    let parentQuery = parent ? query.select(parent) : query.selectViewPort();
    query.select(select).boundingClientRect();
    parentQuery.scrollOffset();
    return new Promise((resolve, reject) => {
        query.exec(([selectRect, parentRect]) => {
            resolve({
                top: selectRect.top + parentRect.scrollTop,
                left: selectRect.left + parentRect.scrollLeft,
                height: selectRect.height,
                width: selectRect.width
            });
        });
    });
}

export function getAllOffset(select, parent) {
    let query = wx.createSelectorQuery();
    let parentQuery = parent ? query.select(parent) : query.selectViewPort();
    query.selectAll(select).boundingClientRect();
    parentQuery.scrollOffset();
    return new Promise((resolve, reject) => {
        query.exec(([selectRects, parentRect]) => {
            resolve(selectRects.map(rect => {
                return {
                    top: rect.top + parentRect.scrollTop,
                    left: rect.left + parentRect.scrollLeft,
                    height: rect.height,
                    width: rect.width
                };
            }));
        });
    });
}
