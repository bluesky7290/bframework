module core {
	export class Vector2 extends egret.HashObject {
		public static ZERO: Vector2 = new Vector2();
		public static RIGHT: Vector2 = new Vector2(1, 0);
		public static LEFT: Vector2 = new Vector2(-1, 0);
		public static UP: Vector2 = new Vector2(0, -1);
		public static DOWN: Vector2 = new Vector2(0, 1);
		public static ONE: Vector2 = new Vector2(1, 1);

		public x: number;
		public y: number;

		public constructor(x?: any, y?: any) {
			super();
			this.x = 0;
			this.y = 0;
			if (typeof x === 'object') {
				this.x = x.x || 0;
				this.y = x.y || 0;
			}
			else {
				if (y === undefined) { y = x; }

				this.x = x || 0;
				this.y = y || 0;
			}
		}

		public clone(): Vector2 {
			return new Vector2(this.x, this.y);
		}

		public copy(src: Vector2): Vector2 {
			this.x = src.x;
			this.y = src.y;

			return this;
		}

		public setFromObject(obj: any): Vector2 {
			this.x = obj.x || 0;
			this.y = obj.y || 0;

			return this;
		}

		public set(x: number, y: number): Vector2 {
			if (y === undefined) { y = x; }

			this.x = x;
			this.y = y;

			return this;
		}

		public setTo(x: number, y: number): Vector2 {
			return this.set(x, y);
		}

		public setToPolar(azimuth: number, radius?: number): Vector2 {
			if (!radius) { radius = 1; }

			this.x = Math.cos(azimuth) * radius;
			this.y = Math.sin(azimuth) * radius;

			return this;
		}

		public equals(v: Vector2): boolean {
			return ((this.x === v.x) && (this.y === v.y));
		}

		public angle(): number {
			let angle = Math.atan2(this.y, this.x);

			if (angle < 0) {
				angle += 2 * Math.PI;
			}

			return angle * 57.29578;
		}

		public add(src: Vector2): Vector2 {
			this.x += src.x;
			this.y += src.y;

			return this;
		}

		public subtract(src: Vector2): Vector2 {
			this.x -= src.x;
			this.y -= src.y;

			return this;
		}

		public multiply(src: Vector2): Vector2 {
			this.x *= src.x;
			this.y *= src.y;

			return this;
		}

		public multiplyConstant(constant: number): Vector2 {
			this.x *= constant;
			this.y *= constant;

			return this;
		}

		public scale(value: number): Vector2 {
			if (isFinite(value)) {
				this.x *= value;
				this.y *= value;
			}
			else {
				this.x = 0;
				this.y = 0;
			}

			return this;
		}

		public divide(src: Vector2): Vector2 {
			this.x /= src.x;
			this.y /= src.y;

			return this;
		}
		/**
		 * 取反
		 */
		public negate(): Vector2 {
			this.x = -this.x;
			this.y = -this.y;

			return this;
		}

		public distance(src: Vector2): number {
			let dx = src.x - this.x;
			let dy = src.y - this.y;

			return Math.sqrt(dx * dx + dy * dy);
		}

		public distanceSq(src: Vector2): number {
			let dx = src.x - this.x;
			let dy = src.y - this.y;

			return dx * dx + dy * dy;
		}

		public length(): number {
			let x = this.x;
			let y = this.y;

			return Math.sqrt(x * x + y * y);
		}

		public lengthSq(): number {
			let x = this.x;
			let y = this.y;

			return x * x + y * y;
		}

		public normalize(): Vector2 {
			let x = this.x;
			let y = this.y;
			let len = x * x + y * y;

			if (len > 0) {
				len = 1 / Math.sqrt(len);

				this.x = x * len;
				this.y = y * len;
			}

			return this;
		}

		public normalizeRightHand(): Vector2 {
			let x = this.x;

			this.x = this.y * -1;
			this.y = x;

			return this;
		}

		public dot(src: Vector2): number {
			return this.x * src.x + this.y * src.y;
		}

		public cross(src: Vector2): number {
			return this.x * src.y - this.y * src.x;
		}

		public lerp(src: Vector2, t: number): Vector2 {
			if (t === undefined) { t = 0; }

			var ax = this.x;
			var ay = this.y;

			this.x = ax + t * (src.x - ax);
			this.y = ay + t * (src.y - ay);

			return this;
		}

		public reset(): Vector2 {
			this.x = 0;
			this.y = 0;

			return this;
		}

		public static multiplyConstant(src: Vector2, constant: number, out?: Vector2): Vector2 {
			let x = src.x *= constant;
			let y = src.y *= constant;
			if (out) {
				return out.set(x, y);
			} else {
				return new Vector2(x, y);
			}
		}

		public static add(src: Vector2, dest: Vector2, out?: Vector2): Vector2 {
			let x = src.x + dest.x;
			let y = src.y + dest.y;
			if (out) {
				return out.set(x, y);
			} else {
				return new Vector2(x, y);
			}
		}

		public static subtract(src: Vector2, dest: Vector2, out?: Vector2): Vector2 {
			let x = src.x - dest.x;
			let y = src.y - dest.y;
			if (out) {
				return out.set(x, y);
			} else {
				return new Vector2(x, y);
			}
		}

		public static divide(src: Vector2, dest: Vector2, out?: Vector2): Vector2 {
			let x = src.x /= dest.x;
			let y = src.y /= dest.y;
			if (out) {
				return out.set(x, y);
			} else {
				return new Vector2(x, y);
			}
		}

		public static divideConstant(src: Vector2, constant: number, out?: Vector2): Vector2 {
			let x = src.x /= constant;
			let y = src.y /= constant;
			if (out) {
				return out.set(x, y);
			} else {
				return new Vector2(x, y);
			}
		}

		public static dot(src: Vector2, dest: Vector2): number {
			return src.x * dest.x + src.y * dest.y;
		}

		public static Angle(from: Vector2, to: Vector2): number {
			let num = Math.sqrt(from.lengthSq() * to.lengthSq());
			if (num < Number.MIN_VALUE) {
				return 0;
			}
			let f = MathUtils.clamp(from.dot(to) / num, -1, 1);
			return Math.acos(f) * 57.29578;
		}

		public static ClampMagnitude(vector: core.Vector2, maxLength: number): Vector2 {
			if (vector.lengthSq() > maxLength * maxLength) {
				return vector.normalize().multiplyConstant(maxLength);
			}
			return vector;
		}

		/**
		 * 创建vector2实例基于对象池，使用完记得还回对象池
		 */
		public static CreateWithPool(x?: any, y?: any): Vector2 {
			let v = core.ObjectPool.pop("core.Vector2") as Vector2;
			v.x = x;
			v.y = y;
			return v;
		}
		/**
		 * 归还到对象池里面
		 */
		public static Recover(v: Vector2): boolean {
			return core.ObjectPool.push(v);
		}
	}
}