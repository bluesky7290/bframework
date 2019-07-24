module core {
    /**
     * 数学工具类
     */
    export class MathUtils {
        /**
         * 向上取整
         * @param  {number} value
         * @return number
         */
        public static ceil(value: number): number {
            if (value % 1 == 0) {
                return value;
            }
            if (value > 0) {
                return (value + 1) << 0;
            } else {
                return value << 0;
            }
        }
        /**
         * 返回一个在min和max之间的随机浮点数
         */
        public static range(min: number, max: number): number {
            return Math.random() * (max - min) + min;
        }
        /**
         * [min,max)范围内随机一个整数
         * @param  {number} min 最小值
         * @param  {number} max 最大值
         * @return number   随机值
         */
        public static random(min: number, max: number): number {
            return Math.random() * (max - min) + min << 0;
        }
        /**
         * (n,m]范围内随机一个整数
         * @param  {number} min 最小值
         * @param  {number} max 最大值
         * @return number   随机值
         */
        public static randomintM(min: number, max: number): number {
            return Math.floor(Math.random() * (max - min) + min) + 1;
        }
        /**
         * (n,m)范围内随机一个整数
         * @param  {number} min 最小值
         * @param  {number} max 最大值
         * @return number  随机值
         */
        public static randomInt(min: number, max: number): number {
            return Math.round(Math.random() * (max - min - 2) + min + 1);
        }
        /**
         * [n,m]范围内随机一个整数
         * @param  {number} min 最小值
         * @param  {number} max 最大值
         * @return number   随机值
         */
        public static randomIntNM(min: number, max: number): number {
            return Math.round(Math.random() * (max - min) + min);
        }

        /**
         * 数组内随机一个元素
         * @param  {T[]} arr    数组
         * @return T
         */
        public static getRandomElement<T>(arr: T[]): T {
            var key: number = Math.floor(Math.random() * arr.length);
            return arr[key];
        }
        /**
          * 计算两点距离
          * @param p1
          * @param p2
          * @return {number}
          */
        public static distance(p1: egret.Point, p2: egret.Point): number {
            return Math.sqrt(Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2));
        }
        /**
         * 返回半径为1的圆内的一个随机点
         */
        public static insideUnitCircle(): egret.Point {
            var randomAngle: number = this.range(0, 360);
            var randomDis: number = this.range(0, 1);
            var randomX: number = randomDis * Math.cos(randomAngle * Math.PI / 180);
            var randomY: number = randomDis * Math.sin(randomAngle * Math.PI / 180);
            return new egret.Point(randomX, randomY);
        }
        /**
         * 返回半径为1的圆边的一个随机点
         */
        public static onUnitCircle(): egret.Point {
            var randomAngle: number = this.range(0, 360);
            var randomX: number = Math.cos(randomAngle * Math.PI / 180);
            var randomY: number = Math.sin(randomAngle * Math.PI / 180);
            return new egret.Point(randomX, randomY);
        }
        /**
         * 弧度制转换为角度值
         * @param radian 弧度制
         * @returns {number}
         */
        public static getAngle(radian: number): number {
            return 180 * radian / Math.PI;
        }
        /**
         * 角度值转换为弧度制
         * @param angle
         */
        public static getRadian(angle: number): number {
            return angle / 180 * Math.PI;
        }
        /**
         * 获取两点间弧度(水平方向)
         * @param p1X
         * @param p1Y
         * @param p2X
         * @param p2Y
         * @returns {number}
         */
        public static getRadian2(p1X: number, p1Y: number, p2X: number, p2Y: number): number {
            var xdis: number = p2X - p1X;
            var ydis: number = p2Y - p1Y;
            return Math.atan2(ydis, xdis);
        }
        /**
         * 获取两点间角度(水平方向)
         * @param p1X
         * @param p1Y
         * @param p2X
         * @param p2Y
         * @returns {number}
         */
        public static getAngle2(p1X: number, p1Y: number, p2X: number, p2Y: number): number {
            return this.getAngle(this.getRadian2(p1X, p1Y, p2X, p2Y));
        }
        /**
         * 限定value在min和max之间
         */
        public static clamp(value: number, min: number, max: number): number {
            return Math.max(min, Math.min(max, value));
        }
        /**
         * 限定value在0和1之间
         */
        public static clamp01(value: number): number {
            return this.clamp(value, 0, 1);
        }
    }
}