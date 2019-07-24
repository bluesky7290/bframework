namespace ttaby {
	export class GlobalConfig {
		// 是否加密协议
		public static readonly OpenEncrypt = false;
		public static C2SProtocol: C2SProtocol = null;
		public static S2CProtocol: S2CProtocol = null;
		public static NetworkMgr: NetworkManager = null;
		public static MessageManager: MessageManager = null;

		/**
		 * 初始化全局模块
		 */
		public static Init(): void {
			this.NetworkMgr = new NetworkManager();
			this.C2SProtocol = new C2SProtocol();
			this.S2CProtocol = new S2CProtocol();
			this.MessageManager = new MessageManager();
		}
	}

	// 退出房间
	export class QuitRoomType {
		public static readonly normal = 0;
		public static readonly changeRoom = 1;
		public static readonly changeTable = 2;
		public static readonly changeToSingle = 3;
	}
	// 场景
	export enum SceneType {
		/**默认界面 */
		Main,
		/**大厅界面 */
		Hall,
		/**房间界面 */
		Room,
		/**加载界面 */
		Loading
	}
	// 公告类型
	export enum NOTICE_TYPE {
		LOGIN,
		GAME,
	}
	/** 排行榜类型 */
	export var RankType: any = {
		"Boom": 1,
		"Gold": 2,
		"Violet": 8
	};
	/**当前场景 */
	export var CurScene: number = SceneType.Main;
	/**当前房间类型 */
	export var CurRoomType: number = 0;
	/**当前房间id */
	export var CurRoomId: number = 1;
	/** 当前排行榜类型 */
	export var CurRanktype: number = 0;
	/**下个房间id */
	export var NextRoomId: number = 0;
	/**当前子弹速度 */
	export var curbulletspeed = 3;
	/**退出房间id */
	export var QuitRoomID: number = 0;
	/** 是否机械风暴中 */
	export var isCray: boolean = false;
	/** 还未展现的临时金币数 */
	export var tmpGold: number = 0;
	// 屏幕边界
	export class ScreenBound {
		private static readonly screenSolutionRatio = 16 / 9;
		public static left = 0;
		public static right = 0;
		public static top = 0;
		public static bottom = 0;
		public static width = 0;
		public static height = 0;
		public static screenRatio = core.Vector2.ZERO;

		public static calRatio(width: number, height: number): void {
			let screenRatio = new core.Vector2(1, 1);
			if (width / height > this.screenSolutionRatio) {
				let ratio = (width / height) / this.screenSolutionRatio;
				screenRatio = new core.Vector2(ratio, 1);
			}

			if (width / height < this.screenSolutionRatio) {
				let ratio = (height / width) / (9 / 16);
				screenRatio = new core.Vector2(1, ratio)
			}
			this.screenRatio = screenRatio;

			this.left = 0;
			this.right = width;
			this.top = 0;
			this.bottom = height;
			this.width = width;
			this.height = height;
		}
	}

	// 击中滤镜效果
	export class FishHitFliter {
		private static colorFlilter = null;
		private static colorTransform = null;

		public static GetHitFliter(): egret.ColorMatrixFilter {
			if (!this.colorFlilter) {
				let colorMatrix = [
					0.7, 0, 0, 0, 0,
					0, 0, 0, 0, 0,
					0, 0, 0, 0, 0,
					0, 0, 0, 1, 0
				];
				this.colorFlilter = new egret.ColorMatrixFilter(colorMatrix);
			}
			return this.colorFlilter;
		}

		public static GetHitColor(): dragonBones.ColorTransform {
			if (!this.colorTransform) {
				this.colorTransform = new dragonBones.ColorTransform(1, 0.7, 0, 0, 0, 0, 0, 0);
			}
			return this.colorTransform;
		}
	}

	// 按钮点击状态
	export class ButtonFliter {
		private static upFlilter = null;
		private static downFlilter = null;
		private static disabledFliter = null;

		public static GetUpFliter(): egret.ColorMatrixFilter {
			if (!this.downFlilter) {
				let colorMatrix = [
					1, 0, 0, 0, 0,
					0, 1, 0, 0, 0,
					0, 0, 1, 0, 0,
					0, 0, 0, 1, 0
				];
				this.downFlilter = new egret.ColorMatrixFilter(colorMatrix);
			}
			return this.downFlilter;
		}

		public static GetDownFliter(): egret.ColorMatrixFilter {
			if (!this.downFlilter) {
				let colorMatrix = [
					0.7, 0, 0, 0, 0,
					0, 0.7, 0, 0, 0,
					0, 0, 0.7, 0, 0,
					0, 0, 0, 1, 0
				];
				this.downFlilter = new egret.ColorMatrixFilter(colorMatrix);
			}
			return this.downFlilter;
		}

		public static GetDisabledFliter(): egret.ColorMatrixFilter {
			if (!this.disabledFliter) {
				let colorMatrix = [
					0.7, 0, 0, 0, 0,
					0, 0.7, 0, 0, 0,
					0, 0, 0.7, 0, 0,
					0, 0, 0, 0.7, 0
				];
				this.disabledFliter = new egret.ColorMatrixFilter(colorMatrix);
			}
			return this.disabledFliter;
		}
	}


	// 公用接口
	export class CommonFunction {
		/**
		 * 当前游戏资源版本
		 */
		public static CurrentVersion(): string {
			let version: string = "";
			if (RELEASE) {
				version = "1.0.18.0719";
			} else {
				version = "1.0.18.0719_dev";
			}
			return version;
		}
		/**
		 * 设置物品图片, id 为物品id
		 */
		public static SetItemIconById(image: eui.Image, id) {
			let item = Configuration.item[id];
			let iconURL = item.icon + "_png";
			if (ResManager.hasRes(iconURL)) {
				image.source = ResManager.getRes(iconURL);
			}
		}
		/**
		 * 打开UI
		 */
		public static OpenUI(openController: ControllerEnum, openData?: any): void {
			UIManager.instance.openController(openController, openData);
		}
		/**
		 * 关闭UI
		 */
		public static CloseUI(openController: ControllerEnum): void {
			UIManager.instance.closeController(openController);
		}
		/**
		 * 打开弹窗UI
		 */
		public static OpenPopup(openController: ControllerEnum, openData?: any): void {
			UIManager.instance.openPopup(openController, openData);
		}
		/**
		 * 关闭弹窗UI
		 */
		public static ClosePopup(openController: ControllerEnum): void {
			UIManager.instance.closePopup(openController);
		}
		/**
		 * 关闭所有UI
		 */
		public static CloseAll(): void {
			UIManager.instance.closeAll();
		}
		/**
		 * 文字提示
		 */
		public static ShowTip(content: string, time?: number): void {
			Event.Brocast(InternalEvt.CMD_SHOW_TIP, [content, time]);
		}
		/**
		 * 恭喜获得奖励
		 */
		public static ShowRewardDialog(data: any, bo?: any): void {
			Event.Brocast(InternalEvt.CMD_SHOW_GETPANEL, [data, bo]);
		}
		/**
		 * 恭喜获得炮台
		 */
		public static ShowRewardTurretDialog(data: any): void {
			Event.Brocast(InternalEvt.CMD_OPEN_REWARDTURRETPANEL, data);
		}
		/**
		 * 恭喜获得话费
		 */
		public static ShowRewardPhoneChargeDialog(data: any): void {
			Event.Brocast(InternalEvt.CMD_OPENUI_REWARDPHONECHARGE, data);
		}
		/**
		 * 弹窗提示,一个参数
		 */
		public static ShowPromptOneParam(content: string, text3?: string, func3?: Handler): void {
			Event.Brocast(InternalEvt.CMD_SETONEPARAM, [content, text3, func3]);
		}
		/**
		 * 弹窗提示,两个参数
		 */
		public static ShowPromptTowParam(content: string, text1?: string, text2?: string, func1?: Handler, func2?: Handler): void {
			Event.Brocast(InternalEvt.CMD_SETTWOPARAM, [content, text1, text2, func1, func2]);
		}
		/**
		 * 获取屏幕内随机一点的位置
		 */
		public static RandomScreenPos(num: number): Array<core.Vector2> {
			let posx: Array<number> = [];
			let posy: Array<number> = [];
			let pos: Array<core.Vector2> = [];
			for (let i: number = 0; i < num * 2; i++) {
				if (i < num) {
					posx[i] = core.MathUtils.randomIntNM(Math.floor(core.LayerCenter.stageWidth * 1 / 8), Math.floor(core.LayerCenter.stageWidth * 7 / 8));
				} else {
					posy[i - num] = core.MathUtils.randomIntNM(Math.floor(core.LayerCenter.stageHeight * 1 / 8), Math.floor(core.LayerCenter.stageHeight * 7 / 8));
				}
			}
			for (let i: number = 0; i < num; i++) {
				let vec: core.Vector2 = core.Vector2.CreateWithPool(posx[i], posy[i]);
				pos.push(vec);
				core.Vector2.Recover(vec);
			}
			return pos;
		}
	}

	// 红点id
	export enum dotType {
		mail = 1, // 邮件
		task = 2, // 任务
		sand_task = 3, // 沙滩任务
		liveness = 4, // 活跃度
		catch_fish_expert = 5, // 捕鱼达人
		monthly_card = 6, // 月卡
		vip = 7,  // vip奖励
		accumu_recharge = 8, // 累计充值
		hunshi = 9, // 魂石
		grow_up = 10, // 捕鱼成长活动
		red_packet = 11, // 红包抽奖活动
		new_fish_expert = 12, // 新捕鱼达人
		daily_share = 13, // 每日分享
		invite_task = 14, // 邀请任务
		invite_bind = 15, // 邀请绑定
		exchange_item = 16, // 限时兑换
		invite_bing = 17, // 绑定好友
	}
}