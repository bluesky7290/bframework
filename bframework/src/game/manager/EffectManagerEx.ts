namespace ttaby {
	export class EffectManagerEx {
		private static m_effectList: any = {};
		public constructor() {
		}

		/**
		 * 龙骨游戏特效
		 */
		public static ShowGameEffectWithDB(name: string, fromDragonBonesDataName: string, count?: number): core.DragonBonesArmature {
			fromDragonBonesDataName = fromDragonBonesDataName || name;
			let dbEffect = core.DragonBonesFactory.instance.makeArmature(name, fromDragonBonesDataName);
			core.LayerCenter.getInstance().getLayer(LayerEnum.EFFECT).addChild(dbEffect);
			if (this.m_effectList[fromDragonBonesDataName]) {
				this.m_effectList[fromDragonBonesDataName].push(dbEffect);
			} else {
				this.m_effectList[fromDragonBonesDataName] = [];
				this.m_effectList[fromDragonBonesDataName].push(dbEffect)
			}
			return dbEffect;
		}

		/**
		 * 销毁龙骨特效
		 */
		public static DestoryEffectWithDB(effect: core.DragonBonesArmature, name: string): void {
			if (effect && this.m_effectList[name]) {
				let index: number = this.m_effectList[name].indexOf(effect);
				effect.destroy();
				delete this.m_effectList[name][index];
			}
		}
		/**
		 * 位图游戏特效
		 */
		public static ShowGameEffectWithImage(name: string): egret.Bitmap {
			let imgEffect = new egret.Bitmap(ResManager.getRes(name));
			core.LayerCenter.getInstance().getLayer(LayerEnum.EFFECT).addChild(imgEffect);
			return imgEffect;
		}
		/**
		 * 龙骨UI特效
		 */
		public static ShowUIEffectWithDB(name: string, fromDragonBonesDataName?: string, count?: number, childIndex?: number): core.DragonBonesArmature {
			fromDragonBonesDataName = fromDragonBonesDataName || name;
			let dbEffect = core.DragonBonesFactory.instance.makeArmature(name, fromDragonBonesDataName);
			if (childIndex) {
				core.LayerCenter.getInstance().getLayer(LayerEnum.UIEFFECT).addChildAt(dbEffect, childIndex);
			} else {
				core.LayerCenter.getInstance().getLayer(LayerEnum.UIEFFECT).addChild(dbEffect);
			}
			if (this.m_effectList[fromDragonBonesDataName]) {
				this.m_effectList[fromDragonBonesDataName].push(dbEffect);
			} else {
				this.m_effectList[fromDragonBonesDataName] = [];
				this.m_effectList[fromDragonBonesDataName].push(dbEffect)
			}
			return dbEffect;
		}
		/**
		 * 位图UI特效
		 */
		public static ShowUIEffectWithImage(name: string): egret.Bitmap {
			let imgEffect = new egret.Bitmap(ResManager.getRes(name));
			core.LayerCenter.getInstance().getLayer(LayerEnum.UIEFFECT).addChild(imgEffect);
			return imgEffect;
		}
		/**
		 * eui.Image UI特效
		 */
		public static ShowUIEffectWithEUIImage(name: string): eui.Image {
			let imgEffect = new eui.Image(ResManager.getRes(name));
			core.LayerCenter.getInstance().getLayer(LayerEnum.UIEFFECT).addChild(imgEffect);
			return imgEffect;
		}

		public static DestoryAllEffectWithDB(): void {
			for (let k in this.m_effectList) {
				let effectarr: core.DragonBonesArmature[] = this.m_effectList[k];
				for (let i: number = 0; i < effectarr.length; i++) {
					this.DestoryEffectWithDB(effectarr[i], k);
				}
				// if
				delete this.m_effectList[k];
			}
		}
	}
}