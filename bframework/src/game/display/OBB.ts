namespace ttaby {
	class PreOBB {
		public isTrigger: boolean = false;
		public otherOBB: OBB;
	}


	class Store {
		public constructor(x: string)
		public constructor(x: number, y: number)
		public constructor(x?, y?) { }
	}

	export class OBB extends egret.HashObject {
		public vertex: Array<core.Vector2>;//四个顶点，0 is lower left
		private axis: Array<core.Vector2>;// 0点延伸的两个坐标轴向量（简化运算）,长度为对应边的长度分之一
		private origin: Array<number>;/** origin[a] = vertes[0].dot(axis[a]); */
		private out: egret.Point;
		private v0: core.Vector2;
		private v1: core.Vector2;
		private obbObj: egret.DisplayObject;
		public points: Array<core.Vector2> = [];
		private preOBB: PreOBB;

		public constructor(obbObj: egret.DisplayObject, points: Array<core.Vector2>)
		public constructor(obbObj: egret.DisplayObject, offset: core.Vector2, size: core.Vector2)
		public constructor(obbObj: egret.DisplayObject, p1?: any, p2?: any) {
			super();
			if (typeof p2 !== 'undefined') {
				this.vertex = [new core.Vector2(0, 0), new core.Vector2(0, 0), new core.Vector2(0, 0), new core.Vector2(0, 0)];
				this.axis = [new core.Vector2(0, 0), new core.Vector2(0, 0)];
				this.origin = [0, 0];
				this.out = new egret.Point();
				this.v0 = new core.Vector2();
				this.v1 = new core.Vector2();

				let width = p2.x;
				let height = p2.y;
				let offsetx = -width * 0.5 + p1.x;
				let offsety = -height * 0.5 - p1.y;

				this.points.push(new core.Vector2(offsetx, offsety));
				this.points.push(new core.Vector2(offsetx + width, offsety));
				this.points.push(new core.Vector2(offsetx + width, height + offsety));
				this.points.push(new core.Vector2(offsetx, height + offsety));

				this.obbObj = obbObj;
				this.preOBB = new PreOBB();
			} else {
				this.vertex = [new core.Vector2(0, 0), new core.Vector2(0, 0), new core.Vector2(0, 0), new core.Vector2(0, 0)];
				this.axis = [new core.Vector2(0, 0), new core.Vector2(0, 0)];
				this.origin = [0, 0];
				this.out = new egret.Point();
				this.v0 = new core.Vector2();
				this.v1 = new core.Vector2();

				this.obbObj = obbObj;
				this.points = p1;
				this.preOBB = new PreOBB();
			}
		}

		/**
		 * 更新转换
		 */
		public Update(): void {
			// 转化为世界坐标
			this.obbObj.localToGlobal(this.points[0].x, this.points[0].y, this.out);
			this.vertex[0].set(this.out.x, this.out.y);

			this.obbObj.localToGlobal(this.points[1].x, this.points[1].y, this.out);
			this.vertex[1].set(this.out.x, this.out.y);

			this.obbObj.localToGlobal(this.points[2].x, this.points[2].y, this.out);
			this.vertex[2].set(this.out.x, this.out.y);

			this.obbObj.localToGlobal(this.points[3].x, this.points[3].y, this.out);
			this.vertex[3].set(this.out.x, this.out.y);

			// 设置轴的长度为 1/边长，则其点乘的结构必然在【0，1】之间
			this.axis[0] = core.Vector2.subtract(this.vertex[1], this.vertex[0], this.v0);//vertex[1] - vertex[0];
			this.axis[0] = core.Vector2.divideConstant(this.axis[0], this.axis[0].lengthSq(), this.v0);//axis[0] / axis[0].getLengthSQ();
			this.axis[1] = core.Vector2.subtract(this.vertex[3], this.vertex[0], this.v1);
			this.axis[1] = core.Vector2.divideConstant(this.axis[1], this.axis[1].lengthSq(), this.v1);

			this.origin[0] = core.Vector2.dot(this.vertex[0], this.axis[0]);
			this.origin[1] = core.Vector2.dot(this.vertex[0], this.axis[1]);
		}

		private IsOverlapsTo(other: OBB): boolean {
			for (let i = 0; i < 2; ++i) {
				// 查询other的顶点在axis上的最大最小值 
				let t = other.vertex[0].dot(this.axis[i]);
				let tMin = t;
				let tMax = t;
				for (let j = 1; j < 4; ++j) {
					t = other.vertex[j].dot(this.axis[i]);
					if (t < tMin) {
						tMin = t;
					} else if (t > tMax) {
						tMax = t;
					}
				}
				// 最大最小值是否在this的这条边内
				if ((tMin > 1 + this.origin[i]) || (tMax < this.origin[i])) {
					return false;
				}
			}
			return true;
		}

		/**
		 * 检查两个OBB是否产生碰撞
		 */
		public intersects(other: OBB): boolean {
			this.Update();
			other.Update();
			let ret = (this.IsOverlapsTo(other) && other.IsOverlapsTo(this));
			if (other === this.preOBB.otherOBB) {
				if (ret && this.preOBB.isTrigger) {
					return false;
				}
			} else {
				this.preOBB.otherOBB = other;
				this.preOBB.isTrigger = ret;
			}
			return ret;
		}
	}
}