namespace ttaby {
	/**
	 * 使用频率比较高的配置使用这个类来管理，使用相对不频繁的配置由使用者自行管理并且及时释放内存，降低内存消耗。
	 */
	export class Configuration {
		// 成长任务
		public static growuptask = null;
		// 成长积分
		public static growupscore = null;
		// 累计充值
		public static activerecharge = null;
		// 房间名称
		public static roomname = null;
		// 房间
		public static room = null;
		// 物品
		public static item = null;
		// 错误码
		public static errorCode = null;
		// 房间图鉴
		public static handbook = null;
		// 鱼
		public static fish = null;
		// 鱼阵
		public static fish_array = null;
		// 综合参数
		public static param = null;
		// 鱼表现参数
		public static fish_show = null;
		// 鱼的对象池配置
		public static fishpool = null;
		// boss变异
		public static bosschange = null;
		//炮配置
		public static cannon = null;
		//炮倍率
		public static cannon_power = null;
		//子弹配置
		public static bullet = null;
		// 路径列表
		public static pathList = null;
		// 等级
		public static level = null;
		// 指定鱼全灭功能
		public static function_killall = null;
		// 穿透功能
		public static function_penetration = null;
		// 炸弹类功能
		public static function_explode = null;
		// 技能
		public static skill = null;
		// 道具兑换
		public static skillbuy = null;
		// vip道具等级
		public static vipskill = null;
		// 功能吃鱼
		public static function_eatfish = null;
		// 气泡提示
		public static fishbubble = null;
		// fishcollider
		public static fishbollider = null;
		// 能量炮倍
		public static energymultiple = null;
		// 炮台倍率
		public static cannon_multiple = null;
		// 能量兑换
		public static energyexchange = null;
		// vip
		public static vip = null;
		// 游戏通用参数
		public static game_common = null;
		// 月卡配置
		public static monthcard = null;
		// 房间任务
		public static room_task = null;
		// 活跃奖励
		public static active_reward = null;
		// 加载文案
		public static loading = null;
		// 弹头配置
		public static bomb = null;
		// 活动ID表
		public static activityId = null;
		// 黄金积分
		public static drawluck = null;
		// 黄金鱼
		public static goldfish = null;

		public static Init(): void {
			this.growuptask = ResManager.getRes("成长活动任务.json");
			this.growupscore = ResManager.getRes("成长活动积分.json");
			this.activerecharge = ResManager.getRes("累计充值活动.json");
			this.room = ResManager.getRes("房间.json");
			this.item = ResManager.getRes("物品.json");
			this.errorCode = ResManager.getRes("错误码配置.json");
			this.handbook = ResManager.getRes("房间图鉴.json");
			this.fish = ResManager.getRes("鱼.json");
			this.fish_array = ResManager.getRes("鱼阵.json");
			this.param = this.MakeKey(ResManager.getRes("综合参数.json"), "parameterNameEn");
			this.fish_show = ResManager.getRes("鱼表现配置.json");
			this.fishpool = ResManager.getRes("对象池用鱼表.json");
			this.bosschange = ResManager.getRes("变异海王.json");
			this.cannon = ResManager.getRes("炮配置.json");
			this.cannon_power = ResManager.getRes("炮倍率.json");
			this.cannon_multiple = this.MakeKey(ResManager.getRes("炮倍率.json"), "cannonMultiple");
			this.bullet = ResManager.getRes("子弹配置.json");
			this.pathList = ResManager.getRes("path.json");
			this.level = ResManager.getRes("等级.json");
			this.function_killall = ResManager.getRes("指定鱼全灭功能.json");
			this.function_penetration = ResManager.getRes("穿透功能.json");
			this.function_explode = ResManager.getRes("炸弹类功能.json");
			this.skill = ResManager.getRes("技能.json");
			this.skillbuy = this.MakeKey(ResManager.getRes("道具兑换.json"), "item_id");
			this.vipskill = this.MakeKey(ResManager.getRes("vip道具等级.json"), "vipLevel");
			this.function_eatfish = this.MakeKey(ResManager.getRes("吃鱼功能.json"), "id");
			this.fishbubble = ResManager.getRes("气泡提示.json");
			this.fishbollider = ResManager.getRes("fishbox.json");
			this.energymultiple = ResManager.getRes("能量炮倍.json");
			this.energyexchange = this.MakeKey(ResManager.getRes("能量兑换.json"), "id");
			this.vip = this.MakeKey(ResManager.getRes("vip.json"), "vipLevel");
			this.game_common = this.MakeKey(ResManager.getRes("游戏通用参数.json"), "key");
			this.monthcard = this.MakeKey(ResManager.getRes("月卡配置.json"), "id");
			this.room_task = this.MakeKey(ResManager.getRes("房间任务.json"), "Id");
			this.active_reward = this.MakeKey(ResManager.getRes("活跃奖励.json"), "Id");
			this.loading = ResManager.getRes("加载文案配置.json");
			this.bomb = this.MakeKey(ResManager.getRes("弹头配置.json"), "Id");
			this.activityId = this.MakeKey(ResManager.getRes("活动ID表.json"), "Id");
			this.drawluck = this.MakeKey(ResManager.getRes("黄金积分.json"), "GoldLevel");
			this.goldfish = this.MakeKey(ResManager.getRes("黄金鱼图鉴.json"), "id");
			//----------------删除zip中的文件，释放内存------------------------------
			ResManager.RemoveZipFile("成长活动任务.json");
			ResManager.RemoveZipFile("成长活动积分.json");
			ResManager.RemoveZipFile("累计充值活动.json");
			ResManager.RemoveZipFile("房间.json");
			ResManager.RemoveZipFile("物品.json");
			ResManager.RemoveZipFile("错误码配置.json");
			ResManager.RemoveZipFile("房间图鉴.json");
			ResManager.RemoveZipFile("鱼.json");
			ResManager.RemoveZipFile("鱼阵.json");
			ResManager.RemoveZipFile("综合参数.json");
			ResManager.RemoveZipFile("鱼表现配置.json");
			ResManager.RemoveZipFile("鱼组.json");
			ResManager.RemoveZipFile("对象池用鱼表.json");
			ResManager.RemoveZipFile("变异海王.json");
			ResManager.RemoveZipFile("炮配置.json");
			ResManager.RemoveZipFile("炮倍率.json");
			ResManager.RemoveZipFile("子弹配置.json");
			ResManager.RemoveZipFile("path.json");
			ResManager.RemoveZipFile("等级.json");
			ResManager.RemoveZipFile("指定鱼全灭功能.json");
			ResManager.RemoveZipFile("穿透功能.json");
			ResManager.RemoveZipFile("炸弹类功能.json");
			ResManager.RemoveZipFile("技能.json");
			ResManager.RemoveZipFile("道具兑换.json");
			ResManager.RemoveZipFile("vip道具等级.json");
			ResManager.RemoveZipFile("吃鱼功能.json");
			ResManager.RemoveZipFile("气泡提示.json");
			ResManager.RemoveZipFile("fishbox.json");
			ResManager.RemoveZipFile("能量炮倍.json");
			ResManager.RemoveZipFile("能量兑换.json");
			ResManager.RemoveZipFile("vip.json");
			ResManager.RemoveZipFile("游戏通用参数.json");
			ResManager.RemoveZipFile("月卡配置.json");
			ResManager.RemoveZipFile("房间任务.json");
			ResManager.RemoveZipFile("活跃奖励.json");
			ResManager.RemoveZipFile("加载文案配置.json");
			ResManager.RemoveZipFile("弹头配置.json");
			ResManager.RemoveZipFile("活动ID表.json");
			ResManager.RemoveZipFile("黄金积分.json");
			ResManager.RemoveZipFile("黄金鱼图鉴.json");
		}

		public static MakeKey(data: any, key: string): any {
			let newRet = {};
			for (let v in data) {
				newRet[data[v][key]] = data[v];
			}
			return newRet;
		}
	}
}