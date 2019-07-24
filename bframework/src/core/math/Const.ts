module core {
	export class Const {
		public static PI2: number = Math.PI * 2;
		public static TAU: number = Math.PI * 0.5;
		public static EPSILON: number = 1.0e-6;
		public static DEG_TO_RAD: number = Math.PI / 180;
		public static RAD_TO_DEG: number = 180 / Math.PI;

		/**
		 * 弧度转角度
		 */
		public RadToDeg(radians): number {
			return radians * Const.RAD_TO_DEG;
		}
		/**
		 * 根据圆心point旋转指定角度angle后的坐标
		 */
		public Rotate(point: Vector2, angle: number): Vector2 {
			let x = point.x;
			let y = point.y;

			point.x = (x * Math.cos(angle)) - (y * Math.sin(angle));
			point.y = (x * Math.sin(angle)) + (y * Math.cos(angle));

			return point;
		}
	}
}