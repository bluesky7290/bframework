namespace ttaby {
	/**
	 * 屏幕抖动
	 */
	export class ScreenShake {
		private static instance: ScreenShake;   //单例

		public static getInstance(): ScreenShake {
			if (this.instance == null) {
				this.instance = new ScreenShake();
			}
			return this.instance;
		}

		/**
		 * 震动显示对象
		 * @param        target    震动目标对象
		 * @param        time      震动持续时长（秒）
		 * @param        rate      震动频率(一秒震动多少次)
		 * @param        maxDis    震动最大距离
		 */
		public shake(target: egret.DisplayObject, time: number, repeatCount: number, initx: number, inity: number, onComplete: Function, thisObject: any): void {
			let tw = TweenLite.fromTo(target, time,
				{
					x: initx - 20,
					y: inity + 20,
					repeat: repeatCount - 1,
					yoyo: true,
				},
				{
					x: initx + 20,
					y: inity - 20,
					ease: RoughEase.ease.config({
						strength: 1,
						points: 10,
						template: Linear.easeNone,
						randomize: false
					}),
					clearProps: "all"
				});

			tw.eventCallback("onComplete", () => {
				onComplete.call(thisObject);
			}, null, this);
		}

		/**
		 * 模拟dotween的DOShakePosition
		 */
		public DOShakePosition(target: egret.DisplayObject, strength: core.Vector2, duration: number, repeatCount: number, onComplete?: Function, thisObject?: any): void {
			TweenMax.killTweensOf(target);
			// 执行时间划分
			let fadeOut = true;
			let randomness = 90;
			let vectorBased = true;
			let shakeMagnitude = strength.length();
			let totIterations = Math.floor(10 * duration);
			if (totIterations < 2) totIterations = 2;
			let decayXTween = shakeMagnitude / totIterations;
			let tDurations = new Array<number>(totIterations);
			let sum = 0;
			for (let i = 0; i < totIterations; ++i) {
				let iterationPerc = (i + 1) / totIterations;
				let tDuration = fadeOut ? duration * iterationPerc : duration / totIterations;
				sum += tDuration;
				tDurations[i] = tDuration;
			}
			let tDurationMultiplier = duration / sum;
			for (let i = 0; i < totIterations; ++i) tDurations[i] = tDurations[i] * tDurationMultiplier;

			// 执行位移划分
			let ang = core.MathUtils.range(0, 360);
			let tos = new Array<core.Vector2>(totIterations);
			for (let i = 0; i < totIterations; ++i) {
				if (i < totIterations - 1) {
					if (i > 0) ang = ang - 180 + core.MathUtils.range(-randomness, randomness);
					if (vectorBased) {
						let rndQuaternion = core.MathUtils.range(-randomness, randomness);
						let to = this.Vector3FromAngle(ang, shakeMagnitude).multiplyConstant(rndQuaternion);
						to.x = core.Vector2.ClampMagnitude(to, strength.x).x;
						to.y = core.Vector2.ClampMagnitude(to, strength.y).y;
						tos[i] = to;
						if (fadeOut) shakeMagnitude -= decayXTween;
						strength = core.Vector2.ClampMagnitude(strength, shakeMagnitude);
					}
				} else {
					tos[i] = new core.Vector2(0, 0);
				}
			}

			let initx = target.x;
			let inity = target.y;
			// 开始执行shake动画
			let sequence = new TimelineMax({ repeat: repeatCount - 1, yoyo: true, ease: Linear.easeNone });
			for (let i = 0; i < tos.length; i++) {
				let d = tDurations[i];
				let t = tos[i];
				sequence.add(TweenLite.to(target, d, { x: initx + t.x, y: inity + t.y, ease: Quad.easeOut }));
			}
			// 执行完回调
			sequence.eventCallback("onComplete", () => {
				if (onComplete) {
					onComplete.call(this);
				}
			}, null, this);
		}

		private Vector3FromAngle(degrees: number, magnitude: number): core.Vector2 {
			let radians = core.MathUtils.getRadian(degrees);
			return new core.Vector2(magnitude * Math.cos(radians), magnitude * Math.sin(radians));
		}
	}
}