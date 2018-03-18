/**
 * @module collision 用于做碰撞检测的工具
 * @author pengzhanbo
 * 以下方法只考虑两物体在分离到靠近过程的碰撞检测
 * @function:vectorCollision(A,B,C,D):传参方式：A={x:0,y:0},B={x:0,y:0}，C={x:0,y:0}，D={x:0,y:0}
 * 用于不规则物体之间的碰撞检测，这里只做了线段与线段之间的，具体按实际情况使用
 * @function:circleToRect(c,r):传参方式：c={x:0,y:0,r:0}  r={x:0,y:0,w:0,h:0}
 * 用于圆与非旋转矩形之间的碰撞检测
 * @function:circleCollision(c1,c2):传参方式：c1={x:0,y:0,r:0},c2={x:0,y:0,r:0}
 * 用于圆与圆之间的碰撞检测
 * @function:distance(A,B):传参方式：A={x:0,y:0},B={x:0,y:0}
 * 计算两点之间的距离
 *
 */
var collision = {
    // 不规则物体之间的碰撞检测
    vectorCollision: function(A, B, C, D) {
        // A={x:0,y:0},B={x:0,y:0}，C={x:0,y:0}，D={x:0,y:0}
        // 线段AB,CD是否相交
        var ACB = (C.x - A.x) * (B.y - A.y) - (B.x - A.x) * (C.y - A.y); //AC,AB的向量积
        var ADB = (D.x - A.x) * (B.y - A.y) - (B.x - A.x) * (D.y - A.y); //AD,AB的向量积
        var CAD = (A.x - C.x) * (D.y - C.y) - (D.x - C.x) * (A.y - C.y); //CA,CD的向量积
        var CBD = (B.x - C.x) * (D.y - C.y) - (D.x - C.x) * (B.y - C.y); //CB,CD的向量积
        if (ACB * ADB < 0 && CAD * CBD < 0) {
            // C,D在AB两侧 且  A,B在CD两侧
            return true;
        } else if (ACB == 0 && collision.vectorValueZero(A, B, C)) {
            // AC,AB重合时，判断点C是否在AB上
            return true;
        } else if (ADB == 0 && collision.vectorValueZero(A, B, D)) {
            // AD,AB重合时，判断点D是否在AB上
            return true;
        } else if (CAD == 0 && collision.vectorValueZero(C, D, A)) {
            // CA,CD重合时，判断点A是否在CD上
            return true;
        } else if (CBD == 0 && collision.vectorValueZero(C, D, B)) {
            // CB,CD重合时，判断点B是否在CD上
            return true;
        } else {
            return false;
        }
        // true表示相交，false表示不相交
    },
    vectorValueZero: function(A, B, C) {
        // 用于判断 点C是否在AB上
        if (A.x < B.x) {
            var x_min = A.x;
            var x_max = B.x;
        } else {
            var x_min = B.x;
            var x_max = A.x;
        }
        if (A.y < B.y) {
            var y_min = A.y;
            var y_max = B.y;
        } else {
            var y_min = B.y;
            var y_max = A.y;
        }
        if (C.x >= x_min && C.x <= x_max && C.y >= y_min && C.y <= y_max) {
            return true;
        } else {
            return false;
        }
    },
    // 圆与非旋转矩形之间的碰撞
    circleToRect: function(c, r) {
        // c={x:0,y:0,r:0}  r={x:0,y:0,w:0,h:0}
        var nx, ny;
        if (c.x < r.x) {
            nx = r.x;
        } else if (c.x > r.x) {
            nx = r.x + r.w;
        } else {
            nx = c.x;
        }
        if (c.y < r.y) {
            ny = r.y;
        } else if (c.y > r.y) {
            ny = r.y + r.h;
        } else {
            ny = c.y;
        }
        if (collision.distance(c, { x: nx, y: ny }) < c.r) {
            return true;
        } else {
            return false;
        }
    },
    // 圆与圆之间的碰撞
    circleCollision: function(c1, c2) {
        if (collision.distance(c1, c2) <= c1.r + c2.r) {
            return true;
        } else {
            return false;
        }
    },
    distance: function(A, B) {
        // A={x:0,y:0},B={x:0,y:0}
        var x = Math.abs(B.x - A.x);
        var y = Math.abs(B.y - A.y);
        return Math.sqrt(x * x + y * y);
    }
};
