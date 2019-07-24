namespace ttaby {
	/**
	 * NetOpCodes 网络消息协议ID
	 * NetEvt 网络消息事件枚举
	 * InternalEvt 模块通信事件枚举
	 */
	export class Protocal {
		public static readonly Connect = 101;     //连接服务器
		public static readonly Exception = 102;     //异常掉线
		public static readonly Disconnect = 103;     //正常断线   
		public static readonly Message = 104;   //消息到达
	}
	/**
	 * 网络消息协议ID
	 */
	export class NetOpCodes {
		// 错误信息
		public static readonly V_ERRORMSG = 901;
		// 提示信息
		public static readonly V_HINTMSG = "notice";

		public static readonly V_GM = 109;

		// 心跳包
		public static readonly V_PING = 3;

		// 同步时间
		public static readonly V_TIMESTAMP = 147;

		// 登录
		public static readonly V_LOGIN = 1001;

		// 玩家将被踢下线
		public static readonly V_KICK_USER = "kick_user";

		// 请求修改昵称
		public static readonly V_CHANGENAME = 1006;
		// 修改昵称回包
		public static readonly V_CHANGENAME_BACK = 191;

		// 请求修改个性签名
		public static readonly V_CHANGESIGN = 1007;
		// 修改个性签名回包
		public static readonly V_CHANGESIGN_BACK = 152;

		// 客户端请求其他用户信息
		public static readonly V_OTHERPLAYERINFO = 1008;
		// 服务端返回其他用户信息
		public static readonly V_OTHERPLAYERINFO_BACK = 5008;

		// 服务端推送用户信息改变
		public static readonly V_ROLEINFOCHANGED_PUSH = 5009;


		// V_PUSH_FISH = "spawn_fish"; //306
		// 放鱼
		// 背包数据请求
		public static readonly V_BAGINFO = 1101;
		// 背包数据回应
		public static readonly V_BAGINFO_BACK = 5101;


		// 背吧装备数据
		public static readonly V_BAGEQUIPMENT = 122;

		// 切换装备
		public static readonly V_BAG_SWITCH_EQUIPMENT = 123;

		// 赠送装备
		public static readonly V_BAG_GIVEPROPS_TO_OTHER = 126;

		// 客户端请求倍率房间列表
		public static readonly V_MULTIPLEROOMLISTREQUEST = 1201;
		// 服务端返回倍率房间列表
		public static readonly V_MULTIPLEROOMLISTREQUEST_BACK = 5201;
		// 任务请求倍率房间列表
		public static readonly V_MULTIPLEROOMLISTREQUEST_MISSION = 1251;
		//客户端请求魂石房间列表
		public static readonly V_SOULROOMLISTREQUEST = 1261;
		// 请求是否有未读邮件
		public static readonly V_MAIL_UNREAD = 1102;

		// 请求邮件列表
		public static readonly V_MAIL_LIST = 1103;
		// 返回邮件列表
		public static readonly V_MAIL_LIST_BACK = "mail_list";

		// 请求邮件正文
		public static readonly V_MAIL_CONTENT = 1104;

		// 请求接受附件
		public static readonly V_MAIL_GETATTACHMENT = 1105;


		// 请求删除邮件
		public static readonly V_MAIL_DELETE = 1106;


		// 客户端请求进入倍率房间
		public static readonly V_ENTERMULTIPLEROOMREQUEST = 1202;
		// 服务端返回进入倍率房间
		public static readonly V_ENTERMULTIPLEROOMREQUEST_BACK = 5202;


		// 客户端请求快速进入倍率房间
		public static readonly V_QUICKENTERMULTIPLEROOMREQUEST = 1206;

		// 客户端请求退出倍率房间
		public static readonly V_LEAVEMULTIPLEROOMREQUEST = 1203;
		// 服务端返回退出倍率房间
		public static readonly V_LEAVEMULTIPLEROOMREQUEST_BACK = 5203;
		// 服务端向客户端同步其他玩家进入房间
		public static readonly V_SYNCMULTIPLEROOMPLAYER_BACK = "table_player_sit_down";
		// 服务端向客户端同步其他玩家离开房间
		public static readonly V_SYNCMULTIPLEROOMPLAYEROUT_BACK = "table_player_stand_up";
		// 服务器向客户端同步魂石房间
		public static readonly V_SYNCMULTIPLESOULROOMPLAYER_BACK = "energy_room_exchange_sync";
		// 客户端请求切换炮倍率
		public static readonly V_CHANGETURRETTIME = 1207;
		// 服务端返回切换炮倍率
		public static readonly V_CHANGETURRETTIME_BACK = 5207;
		// 服务端向客户端同步其他玩家炮倍率变化
		public static readonly V_CHANGETURRETTIME_PUSH = "sync_using_cannon_multiple";

		// 服务端向客户端推送房间里的鱼生成
		public static readonly V_SYNCMULTIPLEROOMFISHCREATE_PUSH = "spawn_fish";

		// 服务端向客户端推送鱼状态改变
		public static readonly V_SYNCMULTIPLEROOMFISHCHANGE_PUSH = "fish_change";

		// 服务端向客户端推送房间里的鱼销毁
		public static readonly V_SYNCMULTIPLEROOMFISHDESTROY_PUSH = 5210;

		// 客户端向服务端请求发射子弹
		public static readonly V_LAUNCHBULLETREQUEST = 1211;
		// 服务端向客户端返回发射子弹
		public static readonly V_LAUNCHBULLETREPLY = 5211;
		// 服务端向客户端同步子弹发射
		public static readonly V_SYNCLAUNCHBULLET = "table_fire";

		// 客户端向服务端请求子弹打中鱼
		public static readonly V_BULLET_HIT_FISH = 1213;
		// 服务端向客户端同步子弹打爆鱼
		public static readonly V_SYNCBULLETKILLFISH = "table_fish_net";

		// 客户端请求升级炮台
		public static readonly V_UPGRADETURRET = 1301;
		// 服务端回复客户端升级炮台的请求
		public static readonly V_UPGRADETURRET_BACK = 5301;
		// 客户端请求打开vip界面信息
		public static readonly V_OPENVIPUIREQUEST = 170;
		// 服务器给客户端返回vip UI的信息
		public static readonly V_OPENVIPUIREPLY = 5351;
		// 客户端请求打开 SHOP 界面信息
		public static readonly V_OpenShoppingMallUIRequest = 1352;
		// 服务器给客户端返回shop UI的信息
		public static readonly V_OpenShoppingMallUIReply = 5352;

		// 客户端请求任务列表
		public static readonly V_OpenMissionUIReply = 8036;
		// 客户端请求任务列表
		public static readonly V_OpenMissionCompleteReply = 8038;
		// 客户端请求打开活跃度宝箱列表
		public static readonly V_OpenActiveBoxReply = 8039;
		// 客户端请求一键领取任务奖励
		public static readonly V_OpenMissionAllCompleteReply = 8040;
		// 推送活跃度变化
		public static readonly V_OpenActiveChangeReply = "push_liveness";

		// 客户端请求打开锻造
		public static readonly V_OpenFrogingUIReply = 8041;
		// 客户端请求锻造升级
		public static readonly V_OpenFrogingUIUpgradeReply = 8042;
		//客户端请求能量升级
		public static readonly V_OpenEnergyUIUpgradeReply = 185;
		// 客户端请求炮台倍数
		public static readonly V_OpenUpTurretUIReply = 8037;

		// 转盘7天签到
		public static readonly V_WeekSignIn = 110;

		// 转盘7天签到奖励
		public static readonly V_WeekSignInLottery = 111;

		// 道具回收
		public static readonly V_RECYCLE_PROP = 108;

		// 服务端向客户端推送任务更新
		public static readonly V_MISSIONCHANGE_PUSH = "push_changed_task";

		// 打开黄金鱼抽奖
		public static readonly V_OpenLuckDrawUIReply = 8043;

		// 黄金鱼抽奖//开始抽奖
		public static readonly V_OpenLuckDrawPlayReply = 8044;

		// 黄金鱼抽奖积分推送
		public static readonly V_LuckDrawScoreReply = "notify_gold_fish_lottery";

		// 使用道具ID
		public static readonly V_UseSkillReply = 8045;

		// 使用召唤卡ID
		public static readonly V_UseBossSkillReply = 8046;

		// 同步使用道具
		public static readonly V_SYNC_UseSkillReply = "sync_skill_effect";

		// 同步道具结束
		public static readonly V_SYNC_UseSkillEnd = "sync_skill_end";

		// 玩家升级
		public static readonly V_USER_LEVELUP = "user_level_up";

		// 开始某个功能的倒计时
		public static readonly V_TIMER_START = 120;
		// 广播某功能倒计时
		public static readonly V_TIMER_STARTREPLY = "function_timer_start";

		// 机械风暴
		public static readonly V_CRAY_STORM = "machine_storm";

		// 鱼阵来了
		public static readonly V_FISH_ARRAY_COMMING = "fish_array_coming";

		// 鱼阵
		public static readonly V_FISH_ARRAY = "spawn_fish_array";

		// 同步子弹和打中鱼网
		public static readonly V_TABLE_SYNC_EVENT = "table_sync_event";

		// 生成小boss
		public static readonly V_SPAWN_SMALL_BOSS = "spawn_small_boss";

		// 小boss逃离
		public static readonly V_SMALL_BOSS_ESCAPE = "small_boss_escape";

		// boss吃鱼
		public static readonly V_BOSS_EAT_FISH = "table_eat_fish";

		// 鱼阵结束
		public static readonly V_FISH_ARRAY_FINISHED = "fish_array_finish";

		// 吃鱼
		public static readonly V_EAT_FISH = 133;

		// 锁定鱼的id
		public static readonly V_Push_LockFish = 8047;

		// 切换炮台
		public static readonly V_CHANGE_TURRET = "switch_cannon";

		// 加速卡换炮
		public static readonly V_DOUBLE_TURRET = "change_cannon";
		// 加速卡换炮
		public static readonly V_PUSH_SKILL_INFO = "push_skill_info";

		// 使用弹头
		public static readonly V_USE_BOMB = 134;

		// 弹头使用获得
		public static readonly V_BOMB_GET = "spec_bullet_score";

		// 请求商城购买
		public static readonly V_SHOPBUY_PROP = 8050;

		// 请求沙滩任务
		public static readonly V_TASKPARTY_LIST = 8051;

		// 请求沙滩奖励
		public static readonly V_TASKPARTY_REWARD = 8052;

		// 请求沙滩炮奖励
		public static readonly V_TASKPARTY_TURRET = 8053;

		// 请求获取沙滩挑战内容
		public static readonly V_TASKPARTY_CHALLENGE = 8054;

		// 请求沙滩任务主动弹出
		public static readonly V_TASKPARTY_LIST_EJECT = 8055;

		// 沙滩挑战内容推送
		public static readonly V_TASKPARTY_PUSH = "push_changed_sand_task";

		// 新手进度（等入时广播）
		public static readonly V_REQUEST_ROKIEPROCESS_NOTICE = "push_rookie_process";
		// 更新新手进度回调
		public static readonly V_REQUEST_ROKIEPROCESS_UPDATE = 144;

		// 跑马灯
		public static readonly V_BROADCAST = "game_broadcast_info";

		// cdkey
		public static readonly V_SENDCDKEY = 145;

		// 救济金
		public static readonly V_BANKRUPT = 146;

		// 技能剩余时间
		public static readonly V_REMAIN_SKILLTIME = "skill_remain_time";

		// 炸弹河豚炸
		public static readonly V_SYNC_HETUN_BOMB = "sync_bomb_fish_click";

		// 机械风暴结束
		public static readonly V_CRAY_FINISH = "sync_machine_storm_gold";

		// 同步玩家救济金
		public static readonly V_SYNC_BRANKRUPTCY = "sync_bankruptcy";

		// 红点
		public static readonly V_GET_REDPOINT = 9001;

		// 查询玩家信息
		public static readonly V_SEARCH_PLAYER = 151;

		// 点击头像查询玩家信息
		public static readonly V_SEARCH_ICON_PLAYER = 153;

		// 兑换商城
		public static readonly V_EXCHANGESHOP = 154;

		// 兑换物品
		public static readonly V_EXCHANGEGOOD = 155;


		// 商城信息
		public static readonly V_SHOPINFO_VIEW = "mall_list";

		// 获得引导数据
		public static readonly V_GET_NEWBIE_GUIDE_PROGRESS = 157;

		// 请求排行榜信息
		public static readonly V_GET_RANKING_INFO = 160;
		//客户端请求排行榜配置信息
		public static readonly V_GET_RANKING_TABLEINFO = 187;

		public static readonly V_GET_RANKING_INFO_LAST = 183;

		// 开始发送排行榜信息
		public static readonly V_GET_START_SEND_RANK = "send_rank_data_start";
		// 发送排行榜信息
		public static readonly V_GET_SEND_RANK = "send_rank_data";
		// 结束发送排行榜信息
		public static readonly V_GET_END_SEND_RANK = "send_rank_data_end";

		// 开始发送排行榜信息
		public static readonly V_GET_START_SEND_LASTRANK = "send_last_rank_data_start";
		// 发送排行榜信息
		public static readonly V_GET_SEND_LASTRANK = "send_last_rank_data";
		// 结束发送排行榜信息
		public static readonly V_GET_END_SEND_LASTRANK = "send_last_rank_data_end";

		// 开始发送Boss排行榜信息
		public static readonly V_GET_START_SEND_BOSSRANK = "send_room_act_rank_data_start";
		// 发送Boss排行榜信息
		public static readonly V_GET_SEND_BOSSRANK = "send_room_act_rank_data";
		// 结束发送BOss排行榜信息
		public static readonly V_GET_END_SEND_BOSSRANK = "send_room_act_rank_data_end";

		// 开始发送Boss排行榜信息
		public static readonly V_GET_START_SEND_ENERGYRANK = "send_energy_rank_data_start";
		// 发送Boss排行榜信息
		public static readonly V_GET_SEND_ENERGYRANK = "send_energy_rank_data";
		// 结束发送BOss排行榜信息
		public static readonly V_GET_END_SEND_ENERGYRANK = "send_energy_rank_data_end";


		// 开始发送Boss排行榜信息
		public static readonly V_GET_START_SEND_LASTENERGYRANK = "send_last_energy_rank_data_start";
		// 发送Boss排行榜信息
		public static readonly V_GET_SEND_LASTENERGYRANK = "send_last_energy_rank_data";
		// 结束发送BOss排行榜信息
		public static readonly V_GET_END_SEND_LASTENERGYRANK = "send_last_energy_rank_data_end";


		//活动信息请求
		public static readonly V_GET_ACTIVE_DATA = 9006;
		//活动信息请求（外部用）
		public static readonly V_GET_ACTIVE_DATA_OUTSIDE = 9008;
		//请求活动奖励
		public static readonly V_GET_END_ACTIVE_REWARD = 9007;

		//活动信息请求
		public static readonly V_GET_ACTIVE_TABLE = 9015;
		//活动信息请求
		public static readonly V_GET_ACTIVE_DATA_NEW = 9016;
		//请求活动奖励
		public static readonly V_GET_END_ACTIVE_REWARD_NEW = 9017;


		//请求活动在现在需要弹出窗口的活动
		public static readonly V_GET_ACTIVE_POPDATA = 8058;
		//请求活动列表
		public static readonly V_GET_ACTIVE_TABLIST = 8059;

		//穿透射击
		public static readonly V_PENETRATION_SHOOT = 8060;
		public static readonly V_PENETRATION_SHOOT_SYNC = "penetration_shoot_sync";
		public static readonly V_PENETRATION_SHOOT_FINISHED = "func_penetration_conn";

		// 等级信息
		public static readonly V_GET_VIP_INFO = "sync_vip_info";
		// 请求房间数据
		public static readonly V_GET_ROOM_INFO = 8061;
		// 请求订单数据
		public static readonly V_REQUEST_ORDER = 8062;

		public static readonly V_BOUGHT_MONTHCARD = "bought_monthly_card";

		public static readonly V_REQUEST_MONTHCARD_BUY = 8063;
		public static readonly V_REQUEST_MONTHCARD_GET = 8064;
		public static readonly V_REQUEST_MONTHCARD_DATA = 8065;
		public static readonly V_SHOPRMB_REPLAY = "purchase_notify";

		public static readonly V_GIFT_NOTICE = "gift_notice"; // 礼包推送
		public static readonly V_GIFT_PUSH = "push_gift_result";  // rmb 购买推送
		public static readonly V_GIFT_DATA = 8066;  //礼包数据
		public static readonly V_GIFT_TAKE = 8067; // 请求礼包 流水ID 或 直接领取


		public static readonly V_PROP_SENDTIMES = 8068; // 获得礼物赠送次数
		// 删除装备
		public static readonly V_CHANGE_EQUIPMENT = "push_changed_equipment";

		// 推送数量（活动）
		public static readonly V_PUSH_COMMONACTIVITY = "push_common_activity";

		//兑换能量
		public static readonly V_REQNERGY_EXCHANGE = 184;

		// 成长数据推送
		public static readonly V_PUSH_GROWUP = "push_changed_grow_up_task";

		//成功数据获取回调
		public static readonly V_RB_GROWUP = 8069;

		//成功数据获取回调
		public static readonly V_RB_GROWUP_GETREWARD = 8070;

		//成长数据推送 新手8天
		public static readonly V_PUSH_GROWUP_LOGIN = "push_grow_up_activity";

		//红包推送
		public static readonly V_PUSH_REDPACKET = "push_red_packet_draw";
		//红包请求返回
		public static readonly V_REDPACKETREWARD = 8071;

		public static readonly V_PUSH_SPECIFIC = "push_specific_prop";

		public static readonly V_REQ_REDPACKET_REWARDINFO = 8072;
		public static readonly V_REQ_REDPACKET_REWARDGET = 8073;
		public static readonly V_SET_PHONE = 8074;
		public static readonly V_SET_UNBIND_PHONE = 8077;


		public static readonly V_REQ_PHONECODE = 8075;
		public static readonly V_REQ_DOWNLOADCODE = 8076;
		public static readonly V_REQ_DAILYSHARE = 8078;
		public static readonly V_REQ_DAILYSHARECONFIG = 8079;
		public static readonly V_REQ_DAILYSHARECOMPLETE = 8080;

		//pc扫描支付结果
		public static readonly V_PUSH_PAY_RESULT = "pay_order_result";
		public static readonly V_CLEAROUT_FISH = "fish_run_away";

		//清除活动数据
		public static readonly V_CLEAROUT_ACTIVE = "push_clear_activity";


		//客户端请求房间魂石金榜数据
		public static readonly V_GET_BOSSRANKING_INFO = 195;

		//客户端请求房间魂石房今日数据
		public static readonly V_GET_ROOMTODAYRANKING_INFO = 197;

		//客户端请求房间魂石房昨日数据
		public static readonly V_GET_ROOMYESTERDAYRANKING_INFO = 198;

		//VIP兑换商城按钮请求
		public static readonly V_GET_VIPSHOPLIMIT_INFO = 199;



		//绑定邀请人
		public static readonly V_GET_BINGINVITER = 204;


		// 召唤boss奖励
		public static readonly V_GET_CALLBOSS_REWARD = "summon_boss_rewards";

		// 使用召唤boss卡之后房间状态
		public static readonly V_CHANGE_TABLE_STATUS = "change_table_status";

		// 服务器下推弹框信息
		public static readonly V_POPUP_MESSAGE = "popup_msg";

		// 服务器下推活动配置
		public static readonly V_PUSH_ACTIVITY_CONFIG = "push_activity_cfg";
		public static readonly V_PUSH_CLEAR_FISH = "table_clear_fish";

		//服务器下推删除邮件
		public static readonly V_PUSH_MAILDELL = "delete_mail";

		//活动数量状态改变
		public static readonly V_PUSH_ACTIVITY_STATUS = "push_mul_activity";

		//客户端手动请求同步金币，钻石，能量
		public static readonly V_PUSH_SYNC_MONEY = 208;

		// 服务端推送每日优惠礼包信息
		public static readonly V_PUSH_GOS = "push_gos";

		// 服务端推送购买每日优惠礼包
		public static readonly V_PUSH_GOS_RESULT = "push_gos_result";

		// 客户端请求购买每日优惠礼包
		public static readonly V_REQ_BUY_GOS="req_buy_gos";
	}

	/**
	 * 网络状态
	 */
	export class NetEvt {
		// 成功连上服务器
		public static readonly NET_STATE_CONNECTED = "NET_STATE_CONNECTED";
		// 断开与服务器的连接
		public static readonly NET_STATE_DISCONNECTED = "NET_STATE_DISCONNECTED";
		// 打开锻造请求
		public static readonly NET_CMD_FROGING_OPEN = "NET_CMD_FROGING_OPEN";
		// 登录消息
		public static readonly NET_CMD_LOGIN = "NET_CMD_LOGIN";
		// 网络消息到达
		public static readonly NET_STATE_MESSAGEARRIVE = "NET_STATE_MESSAGEARRIVE";
		//  打开7天签到活动界面
		public static readonly NET_OPEN_WEEKSIGNINPANEL = "NET_OPEN_WEEKSIGNINPANEL";
		// 普通跑马灯
		public static readonly NET_BROADCAST_NORMAL = "NET_BROADCAST_NORMAL";
		// 房间捕获跑马灯
		public static readonly NET_BROADCAST = "NET_BROADCAST";
		// 刷新房间炮倍
		public static readonly NET_CMD_CHANGETURRETTIME_BACK = "NET_CMD_CHANGETURRETTIME_BACK";
		// 切换装备
		public static readonly NET_CMD_SWITCH_EQUIPMENT = "NET_CMD_SWITCH_EQUIPMENT";
		// 服务端零点推送
		public static readonly NET_PUSH_SERVERTIME = "NET_PUSH_SERVERTIME";
	}

	/**
	 * 模块通信事件枚举
	 */
	export class InternalEvt {
		// 场景跳转
		public static readonly CMD_LEVEL_LOADED = "CMD_LEVEL_LOADED";
		// 黄金抽奖小panel
		public static readonly CMD_LUCKDRAWSHOW = "CMD_LUCKDRAWSHOW";
		// 删除炮
		public static readonly CMD_DELETE_TURRET = "CMD_DELETE_TURRET";
		// 子弹发射
		public static readonly CMD_BULLET_EMISSION = "CMD_BULLET_EMISSION";
		// 刷新金币数量
		public static readonly CMD_UPDATE_GOLDCOIN = "CMD_UPDATE_GOLDCOIN";
		// 刷新钻石数量
		public static readonly CMD_UPDATE_DIAMOND = "CMD_UPDATE_DIAMOND";
		// 刷新奖券数量
		public static readonly CMD_UPDATE_LOTTERY = "CMD_UPDATE_LOTTERY";

		// 刷新物品数量
		public static readonly CMD_UPDATE_ITEM = "CMD_UPDATE_ITEM";

		// 更改摇杆设置
		public static readonly CMD_CHANGE_JOYSTICK = "CMD_CHANGE_JOYSTICK";

		// 打开设置界面
		public static readonly CMD_OPEN_SETPANEL = "CMD_OPEN_SETPANEL";
		// 打开提示界面
		public static readonly CMD_OPEN_PROMPTPANEL = "CMD_OPEN_PROMPTPANEL";
		// 打开商品界面
		public static readonly CMD_OPEN_SHOPPANEL = "CMD_OPEN_SHOPPANEL";
		// 打开黄金鱼抽奖界面
		public static readonly CMD_OPEN_MISSIONPANEL = "CMD_OPEN_MISSIONPANEL";
		// 打开任务界面
		public static readonly CMD_OPEN_LUCKDRAWPANEL = "CMD_OPEN_LUCKDRAWPANEL";
		// 打开成就界面
		public static readonly CMD_OPEN_ACHIEVEMENTPANEL = "CMD_OPEN_ACHIEVEMENTPANEL";
		// 打开背包界面
		public static readonly CMD_OPEN_BAGPANEL = "CMD_OPEN_BAGPANEL";
		// 打开背包物体操作界面
		public static readonly CMD_OPEN_BAGITEMOPTIONPANEL = "CMD_OPEN_BAGITEMOPTIONPANEL";
		// 打开兑换界面
		public static readonly CMD_OPEN_FRIENDPANEL = "CMD_OPEN_FRIENDPANEL";
		// 打开好友界面
		public static readonly CMD_OPEN_EXCHANGEPANEL = "CMD_OPEN_EXCHANGEPANEL";
		// 打开保险箱界面
		public static readonly CMD_OPEN_SAFEBOXPANEL = "CMD_OPEN_SAFEBOXPANEL";
		// 打开炮台界面
		public static readonly CMD_OPEN_TURRETPANEL = "CMD_OPEN_TURRETPANEL";
		// 打开个人信息界面
		public static readonly CMD_OPEN_PERSONALMSGPANEL = "CMD_OPEN_PERSONALMSGPANEL";
		// 打开邮件界面
		public static readonly CMD_OPEN_MAILPANEL = "CMD_OPEN_MAILPANEL";
		// 打开炮台解锁界面
		public static readonly CMD_OPEN_UNLOCKTURRETPANEL = "CMD_OPEN_UNLOCKTURRETPANEL";
		// 打开选择炮台界面
		public static readonly CMD_OPEN_CHOSETURRETPANEL = "CMD_OPEN_CHOSETURRETPANEL";
		// 打开房间列表界面
		public static readonly CMD_OPEN_ROOMLISTPANEL = "CMD_OPEN_ROOMLISTPANEL";
		// 打开魂石房间列表界面
		public static readonly CMD_OPEN_SOULROOMLISTPANEL = "CMD_OPEN_SOULROOMLISTPANEL";
		// 打开VIP界面
		public static readonly CMD_OPEN_VIPPANEL = "CMD_OPEN_VIPPANEL";
		// 打开VIP每日补足界面
		public static readonly CMD_OPEN_VIPVERYDAY = "CMD_OPEN_VIPVERYDAY";
		// 打开通知公告界面
		public static readonly CMD_OPEN_NOTICPANEL = "CMD_OPEN_NOTICPANEL";
		// 打开登入公告界面
		public static readonly CMD_OPEN_NOTICE_LOGIN = "CMD_OPEN_NOTICE_LOGIN";
		// 打开脸图公告界面
		public static readonly CMD_OPEN_NOTICE_PICTURE = "CMD_OPEN_NOTICE_PICTURE";
		// 打开cdkey界面
		public static readonly CMD_OPEN_FROGINGPANEL = "CMD_OPEN_FROGINGPANEL";
		// 打开炮台锻造界面
		public static readonly CMD_OPEN_CDKEYPANEL = "CMD_OPEN_CDKEYPANEL";
		// 打开排行榜界面
		public static readonly CMD_OPEN_RANKINGPANEL = "CMD_OPEN_RANKINGPANEL";

		// 退出房间
		public static readonly CMD_EXIT_ROOM = "CMD_EXIT_ROOM";
		// 奖励界面
		public static readonly CMD_SHOW_GETPANEL = "CMD_SHOW_GETPANEL";
		// 商城界面
		public static readonly CMD_SHOP_GETPANEL = "CMD_SHOP_GETPANEL";
		// 图鉴
		public static readonly CMD_HANDBOOK_PANEL = "CMD_HANDBOOK_PANEL";
		// 图鉴
		public static readonly CMD_ROOMDETAILS_PANEL = "CMD_ROOMDETAILS_PANEL";
		// 隐藏兑换商店
		public static readonly CMD_HIDE_EXCHANGESHOPPANEL = "CMD_HIDE_EXCHANGESHOPPANEL";

		// 隐藏VIP限定
		public static readonly CMD_HIDE_EXCHANGEVIPPANEL = "CMD_HIDE_EXCHANGEVIPPANEL";

		// 鱼 死亡
		public static readonly CMD_FISH_DEAD = "CMD_FISH_DEAD";
		// 显示背景遮罩
		public static readonly CMD_SHOW_MASK = "CMD_SHOW_MASK";
		// 未读邮件
		public static readonly CMD_MAIL_UNREAD = "CMD_MIAL_UNREAD";
		// 邮件列表
		public static readonly CMD_MAIL_LIST = "CMD_MAIL_LIST";
		// 邮件正文
		public static readonly CMD_MAIL_CONTENT = "CMD_MAIL_CONTENT";
		// 领取邮件附件
		public static readonly CMD_MAIL_ATTACHMENT = "CMD_MAIL_ATTACHMENT";
		// 删除邮件
		public static readonly CMD_MAIL_DELETE = "CMD_MAIL_DELETE";

		// 提示;两参数
		public static readonly CMD_SETTWOPARAM = "CMD_SETTWOPARAM";
		// 提示;单参数
		public static readonly CMD_SETONEPARAM = "CMD_SETONEPARAM";


		// 刷新自己的金币 钻石
		public static readonly CMD_SETGOLD_DIAMOND_NUM = "CMD_SETGOLD_DIAMOND_NUM";

		// 刷新自己 奖券
		public static readonly CMD_UPDATE_SELF_LOTTERY = "CMD_UPDATE_SELF_LOTTERY";

		// 刷新自己 VIP
		public static readonly CMD_UPDATE_SELF_VIP = "CMD_UPDATE_SELF_VIP";

		// 刷新自己 能量
		public static readonly CMD_UPDATE_SELF_ENERGY = "CMD_UPDATE_SELF_ENERGY";
		// 播放金币效
		public static readonly CMD_PLAY_EFFECT_COIN = "CMD_PLAY_EFFECT_COIN";

		// 机械风暴加时间
		public static readonly CMD_CRAY_ADD_TIME = "CMD_CRAY_ADD_TIME";

		// 机械风暴加时间 第二步
		public static readonly CMD_CRAY_ADD_TIMETX = "CMD_CRAY_ADD_TIMETX";

		// 机械风暴加倍率
		public static readonly CMD_CRAY_ADD_POWER = "CMD_CRAY_ADD_POWER";

		// 机械风暴加倍率 第二步
		public static readonly CMD_CRAY_ADD_POWERTX = "CMD_CRAY_ADD_POWERTX";

		// 其他人打死机械风暴
		public static readonly CMD_CRAY_DIE_OTHER = "CMD_CRAY_DIE_OTHER";

		// 播放打中特效
		public static readonly CMD_PLAY_EFFECT_BAO = "CMD_PLAY_EFFECT_BAO";

		// 替换桌面背景
		public static readonly CMD_REPACE_BACKGROUD_2D = "CMD_REPACE_BACKGROUD_2D";

		// 关闭背景灯
		public static readonly CMD_CLOSE_BG_LIGHT = "CMD_CLOSE_BG_LIGHT";

		// 闪电鳗 死亡
		public static readonly CMD_SANDIANMAN_FISH_DIE = "CMD_SANDIANMAN_FISH_DIE";



		// 更换炮台
		public static readonly CMD_CHANGE_TURRET = "CMD_CHANGE_TURRET";

		// 子弹击中鱼
		public static readonly CMD_BULLET_HIT_FISH = "CMD_BULLET_HIT_FISH";

		// 炸弹河豚da死亡
		public static readonly CMD_HETUNBIG_FISH_DIE = "CMD_HETUNBIG_FISH_DIE";

		// boss 鲲打爆提示
		public static readonly CMD_PLAY_BOSS_EXPLODE = "CMD_PLAY_BOSS_EXPLODE";

		// xxx鱼 来了 提示
		public static readonly CMD_FISHCAME_TIP = "CMD_FISHCAME_TIP";

		// 机械风暴转盘 界面
		public static readonly CMD_OPEN_CRAYDRAWPANEL = "CMD_OPEN_CRAYDRAWPANEL";
		// 机械风暴 分数展示
		public static readonly CMD_OPEN_CRAYGRADE = "CMD_OPEN_CRAYGRADE";
		// 暂停自动射击  参数1 禁止 自动开炮  参数 2 不禁止自动开炮
		public static readonly CMD_STOP_AUTO = "CMD_STOP_AUTO";

		// 特殊鱼 分数特效
		public static readonly CMD_SHOW_SPECIAL_GRADE = "CMD_SHOW_SPECIAL_GRADE";
		// 播放全屏金币特效
		public static readonly CMD_PLAYBOOMEFFECT = "CMD_PLAYBOOMEFFECT";

		// 播放底盘动画
		public static readonly CMD_PLAYPLATEEFFECT = "CMD_PLAYPLATEEFFECT";

		// tip
		public static readonly CMD_SHOW_TIP = "CMD_SHOW_TIP";

		// boss鲲进场
		public static readonly CMD_BOSS_KUN_ENTERTIP = "CMD_BOSS_KUN_ENTERTIP";

		// boss鲲生成
		public static readonly CMD_BOSS_KUN_ENTER = "CMD_BOSS_KUN_ENTER";

		// 物品掉落
		public static readonly CMD_PROP_DROP = "CMD_PROP_DROP";

		// 进入狂暴
		public static readonly CMD_FRENZY_SKILL = "CMD_FRENZY_SKILL";

		// 道具数量增加
		public static readonly CMD_SETSKILL_ADD = "CMD_SETSKILL_ADD";

		// 背包按钮坐标
		public static readonly CMD_NOTICE_BAGBTNPOS = "CMD_NOTICE_BAGBTNPOS";

		// 炮台坐标坐标
		public static readonly CMD_NOTICE_TURRENTPOS = "CMD_NOTICE_TURRENTPOS";

		// 救济金  V_BANKRUPT
		public static readonly CMD_REQUEST_BANKRUPT = "CMD_REQUEST_BANKRUPT";

		// 显示大厅（显示时位移按钮）
		public static readonly CMD_SHOW_HALL = "CMD_SHOW_HALL";

		// SHOW ROOMLIST hall 需要位移
		public static readonly CMD_SHOW_ROOMLIST = "CMD_SHOW_ROOMLIST";

		// CLOSE ROOMLIST hall 需要位移
		public static readonly CMD_CLOSE_ROOMLIST = "CMD_CLOSE_ROOMLIST";

		// 技能剩余时间
		public static readonly CMD_REMAIN_SKILLTIME = "CMD_REMAIN_SKILLTIME";

		// 播放新获得物品特效
		public static readonly CMD_PLAYFX_GETNEWITEM = "CMD_PLAYFX_GETNEWITEM";

		// 加载场景
		public static readonly CMD_LOADSCENE = "CMD_LOADSCENE";

		// hall界面主动打开周签到
		public static readonly CMD_OPENVIEW_WEEKSIGN = "CMD_OPENVIEW_WEEKSIGN";

		// UI事件监听UIEventSystem
		public static readonly CMD_SET_UIEVENTSYSTEM = "CMD_SET_UIEVENTSYSTEM";

		// 排序HALL显示UI
		public static readonly CMD_SORT_HALLSHOWVIEW = "CMD_SORT_HALLSHOWVIEW";

		// 河豚死亡
		public static readonly CMD_SYNC_HETUNDIE = "CMD_SYNC_HETUNDIE";

		// 更新玩家等级
		public static readonly CMD_UPDATE_USERLEVEL = "CMD_UPDATE_USERLEVEL";

		// 打开公告
		public static readonly CMD_OPEN_ANNOUNCEPANEL = "CMD_OPEN_ANNOUNCEPANEL";

		// 震屏
		public static readonly CMD_SHAKE_CAMERA = "CMD_SHAKE_CAMERA";

		// 清除房间数据
		public static readonly CMD_CLEAR_ROOMDATA = "CMD_CLEAR_ROOMDATA";

		// 广播玩家救济金状态
		public static readonly CMD_PLAYER_BRANKRUPT = "CMD_PLAYER_BRANKRUPT";

		// BOSS 入场提示
		public static readonly CMD_OPEN_BOSSENTER = "CMD_OPEN_BOSSENTER";
		// Boss 删除
		public static readonly CMD_BOSS_REMOVE = "CMD_BOSS_REMOVE";

		// 广播使用技能
		public static readonly CMD_SKILL_USE = "CMD_SKILL_USE";

		// 红点改变
		public static readonly CMD_REDDOT_CHANGE = "CMD_REDDOT_CHANGE";

		// 打开引导UI
		public static readonly CMD_OPENUI_GUIDEVIEW = "CMD_OPENUI_GUIDEVIEW";

		// 房间任务move
		public static readonly CMD_ROOMTASK_MOVE = "CMD_ROOMTASK_MOVE";

		// 查询玩家反馈
		public static readonly CMD_SEARCH_PLAYER_DATA = "CMD_SEARCH_PLAYER_DATA";

		// 手动查询玩家数据反馈
		public static readonly CMD_SEARCH_PLAYER_INFO = "CMD_SEARCH_PLAYER_INFO";

		// 房间任务更换推送
		public static readonly CMD_ROOMTASK_CHANGE = "CMD_ROOMTASK_CHANGE";

		// 沙滩派对隐藏
		public static readonly CMD_SANDTASKHIDE = "CMD_SANDTASKHIDE";

		// 获取新手引导数据
		public static readonly CMD_GET_NEWBIE_GUIDE_PROGRESS = "CMD_GET_NEWBIE_GUIDE_PROGRESS";

		// 刷新玩家货币UI
		public static readonly CMD_UPDATE_PLAYER_MONEY = "CMD_UPDATE_PLAYER_MONEY";

		// 房间任务更新
		public static readonly CMD_ROOMMISSION_UPDATE = "CMD_ROOMMISSION_UPDATE";

		// 引导结束触发
		public static readonly CMD_GUIDE_END = "CMD_GUIDE_END";

		// 登陆返回
		public static readonly CMD_LOGIN_CALLBACK = "CMD_LOGIN_CALLBACK";

		// 断线重连弹框提示
		public static readonly CMD_OPEN_RECONNECTPANEL = "CMD_OPEN_RECONNECTPANEL";

		// 打开关闭某个活动
		public static readonly CMD_OPEN_EVERYACTIVEPANEL = "CMD_OPEN_EVERYACTIVEPANEL";


		// BOSS逃离
		public static readonly CMD_BOSS_ESCAPE = "CMD_BOSS_ESCAPE";

		// 打开捕鱼达人弹窗
		//  CMD_OPEN_CATCHFISHTIP = "CMD_OPEN_CATCHFISHTIP";

		// 打死龟队长
		public static readonly CMD_KILL_TORTOISECAPTAIN = "CMD_KILL_TORTOISECAPTAIN";

		// 乌龟队长结束
		public static readonly CMD_KILL_TORTOISECAPTAIN_FINISHED = "CMD_KILL_TORTOISECAPTAIN_FINISHED";

		// 乌龟队长发射
		public static readonly CMD_TORTOISECAPTAIN_SHOT = "CMD_TORTOISECAPTAIN_SHOT";

		// 乌龟队长发射
		public static readonly CMD_TORTOISECAPTAIN_SHOT_SYNC = "CMD_TORTOISECAPTAIN_SHOT_SYNC";

		// 乌龟队长发射结束
		public static readonly CMD_TORTOISECAPTAIN_SHOT_FINISHED = "CMD_TORTOISECAPTAIN_SHOT_FINISHED";

		// 打开转盘界面
		public static readonly CMD_OPEN_TURNTABLE = "CMD_OPEN_TURNTABLE";

		// 打开获得炮台奖励界面
		public static readonly CMD_OPEN_REWARDTURRETPANEL = "CMD_OPEN_REWARDTURRETPANEL";

		// boss打落物品
		public static readonly CMD_BOSS_DROPITEM = "CMD_BOSS_DROPITEM";

		// 鱼潮来临
		public static readonly CMD_FISH_GROUP_CAMING = "CMD_FISH_GROUP_CAMING";

		// 回复使用道具
		public static readonly CMD_PUSH_SKILLINFO = "CMD_PUSH_SKILLINFO";

		// applicationpause
		public static readonly CMD_APPLICATION_PAUSE = "CMD_APPLICATION_PAUSE";
		// applicationfocus
		public static readonly CMD_APPLICATION_FOCUS = "CMD_APPLICATION_FOCUS";
		// 清掉鱼
		public static readonly CMD_CLEAR_FISHES = "CMD_CLEAR_FISHES";

		public static readonly CMD_OPENUI_HALL = "CMD_OPENUI_HALL";

		public static readonly CMD_OPENUI_QQGIFT = "CMD_OPENUI_QQGIFT";

		// 魂王争霸赛排行榜打开UI
		public static readonly CMD_OPENUI_SOULRANK = "CMD_OPENUI_SOULRANK";


		public static readonly CMD_OPENUI_MONTHCARD = "CMD_OPENUI_MONTHCARD";
		public static readonly CMD_MONTHCARD_GET = "CMD_MONTHCARD_GET";
		public static readonly CMD_MONTHCARD_BUY = "CMD_MONTHCARD_BUY";
		public static readonly CMD_MONTHCARD_BOUGHT = "CMD_MONTHCARD_BOUGHT";
		public static readonly CMD_MONTHCARD_DATA = "CMD_MONTHCARD_DATA";
		// 支付回调
		public static readonly CMD_PAY_CALLBACK = "CMD_PAY_CALLBACK";
		// 开始支付
		public static readonly CMD_PAY_BEGIN = "CMD_PAY_BEGIN";
		// 订单刷新
		public static readonly CMD_PAY_ORDERREFRESH = "CMD_PAY_ORDERREFRESH";

		// 新手礼包
		public static readonly CMD_OPEN_ROKIEGIFT = "CMD_OPEN_ROKIEGIFT";
		// 打开礼包界面
		public static readonly CMD_OPENUI_GIFT = "CMD_OPENUI_GIFT";

		// 新手礼包领取

		public static readonly CMD_GIFT_NOTICE = "CMD_GIFT_NOTICE";
		public static readonly CMD_GIFT_UPDATE = "CMD_GIFT_UPDATE";
		public static readonly CMD_GIFT_UPDATEBTN = "CMD_GIFT_UPDATEBTN";

		public static readonly CMD_PROP_UPDATESENDTIMES = "CMD_PROP_UPDATESENDTIMES";

		// 打开破产 礼包
		public static readonly CMD_OPENUI_BANKRUPTCY = "CMD_OPENUI_BANKRUPTCY";


		public static readonly CMD_PALY_GETGOLDFX = "CMD_PALY_GETGOLDFX";

		// 请求打开支付选择界面
		public static readonly CMD_PAYMENT_PAYMODE = "CMD_PAYMENT_PAYMODE";
		// 请求订单
		public static readonly CMD_PAYMENT_REQUESTORDER = "CMD_PAYMENT_REQUESTORDER";
		// 打卡引导魂石界面
		public static readonly CMD_OPENUI_GUIDSOULSTONE = "CMD_OPENUI_GUIDSOULSTONE";

		// 打开技能界面
		public static readonly CMD_OPENUI_SKILLVIEW = "CMD_OPENUI_SKILLVIEW";
		// 打开房间任务界面
		public static readonly CMD_OPENUI_MISSIONVIEW = "CMD_OPENUI_MISSIONVIEW";
		// 暂时隐藏房间任务界面
		public static readonly CMD_CLOSEUI_MISSIONVIEW = "CMD_CLOSEUI_MISSIONVIEW";

		// 打开能量兑换界面
		public static readonly CMD_OPEN_EnergyExchange = "CMD_OPEN_EnergyExchange";

		// 打开能量兑换界面
		public static readonly CMD_OPENUI_GROWUP = "CMD_OPENUI_GROWUP";

		// 更新成长信息
		public static readonly CMD_GROWUP_UPDATE = "CMD_GROWUP_UPDATE";

		// 更新成长信息
		public static readonly CMD_GROWUP_UPDATEBTN = "CMD_GROWUP_UPDATEBTN";

		// 临时金币刷新
		public static readonly CMD_TEMPGOLD_FRESH = "CMD_TEMPGOLD_FRESH";

		// 活动领取奖励更新
		public static readonly CMD_ACTIVE_GETUPDATE = "CMD_ACTIVE_GETUPDATE";

		// 打开红包界面
		public static readonly CMD_OPENUI_REDPACKET = "CMD_OPENUI_REDPACKET";

		// 更新红包按钮
		public static readonly CMD_UPDATE_REDPACKETBTN = "CMD_UPDATE_REDPACKETBTN";

		// 领取红包
		public static readonly CMD_GET_REDPACKETREWARD = "CMD_GET_REDPACKETREWARD";

		// 抽奖红包回调
		public static readonly CMD_OPENUI_REDPACKETREWARD = "CMD_OPENUI_REDPACKETREWARD";

		// 打开Pc房间限制
		public static readonly CMD_OPENUI_ROOMLIMIT = "CMD_OPENUI_ROOMLIMIT";

		// 打开Pc下载界面
		public static readonly CMD_OPENUI_PCDOWNLOAD = "CMD_OPENUI_PCDOWNLOAD";

		// 显示房间右边按钮
		public static readonly CMD_SHOW_ROOMRIGHTBTN = "CMD_SHOW_ROOMRIGHTBTN";

		// 跑马灯消息录入
		public static readonly CMD_INSERT_BROADCAST = "CMD_INSERT_BROADCAST";

		// 绑定号码
		public static readonly CMD_OPENUI_SETPHONE = "CMD_OPENUI_SETPHONE";

		// 领取红包回调
		public static readonly CMD_REDPACKET_REWARD = "CMD_REDPACKET_REWARD";

		// 绑定号码成功
		public static readonly CMD_SUCCESS_SETPHONE = "CMD_SUCCESS_SETPHONE";
		// 绑定号码成功
		public static readonly CMD_SUCCESS_UNBINDPHONE = "CMD_SUCCESS_UNBINDPHONE";

		// 领取话费
		public static readonly CMD_OPENUI_REWARDPHONECHARGE = "CMD_OPENUI_REWARDPHONECH领取话费";

		// 打开绑定手机界面
		public static readonly CMD_OPENUI_BINDPHONEPANEL = "CMD_OPENUI_BINDPHONEPANEL";

		// 打开金龙魂石排行榜
		public static readonly CMD_OPENUI_BOSSRANK = "CMD_OPENUI_BOSSRANK";
		// 关闭金龙魂石排行榜
		public static readonly CMD_CLOSEUI_BOSSRANK = "CMD_CLOSEUI_BOSSRANK";

		// 打开魂石房排行榜
		public static readonly CMD_OPENUI_ROOMRANK = "CMD_OPENUI_ROOMRANK";
		// 控制隐藏显示魂石房排行榜
		public static readonly CMD_SHOWANDHIDE_ROOMRANK = "CMD_SHOWANDHIDE_ROOMRANK";

		// 打开boss召唤界面
		public static readonly CMD_OPENUI_BOSSCALL = "CMD_OPENUI_BOSSCALL";

		// 更新引导类型
		public static readonly CMD_UPDATE_GUIDE_TYPE = "CMD_UPDATE_GUIDE_TYPE";

		// 章鱼抽奖界面 
		public static readonly CMD_OPENUI_OCTOPUSREWARD = "CMD_OPENUI_OCTOPUSREWARD";

		// 客服界面
		public static readonly CMD_OPEN_CUSTOMERBTN = "CMD_OPEN_CUSTOMERBTN";

		// 魂石房踢玩家出去
		public static readonly CMD_GETOUT_PLAYER = "CMD_GETOUT_PLAYER";

		// 召唤boss奖励
		public static readonly CMD_CALLBOSS_REWARD = "CMD_CALLBOSS_REWARD";

		// 召唤boss卡使用状态改变
		public static readonly CMD_CALLBOSS_CHANGESTATUS = "CMD_CALLBOSS_CHANGESTATUS";

		// 成功分享
		public static readonly CMD_SHARE_SUCCESS = "CMD_SHARE_SUCCESS";

		// 跳转UI
		public static readonly CMD_OPENUI_UIJUMP = "CMD_OPENUI_UIJUMP";

		// boss离开的cd
		public static readonly CMD_CDTIME_BOSSLEAVE = "CMD_CDTIME_BOSSLEAVE";

		// boss cd结束
		public static readonly CMD_CDTIME_FINISHEND = "CMD_CDTIME_FINISHEND";

		// boss cd; 倒记时开始
		public static readonly CMD_CDTIME_LEAVESTART = "CMD_CDTIME_LEAVESTART";

		// 打开奖卷
		public static readonly CMD_CDTIME_TICKET = "CMD_CDTIME_TICKET";

		// 章鱼玩家离开
		public static readonly CMD_ZHANGYUPLAYER_LEAVE = "CMD_ZHANGYUPLAYER_LEAVE";

		// 收到活动配置
		public static readonly CMD_RECEIVE_ACTIVITY_CONFIG = "CMD_RECEIVE_ACTIVITY_CONFIG";

		// 下个房间引导
		public static readonly CMD_OPENUI_NEXTROOM = "CMD_OPENUI_NEXTROOM";

		// 清鱼
		public static readonly CMD_CELAR_ALLFISHS = "CMD_CELAR_ALLFISHS";

		// 通用活动数量改变协议
		public static readonly CMD_ACTIVE_STATUSCHANGE = "CMD_ACTIVE_STATUSCHANGE";

		// 召唤号角UI
		public static readonly CMD_OPENUI_HORNLEVELUSE = "CMD_OPENUI_HORNLEVELUSE";

		/** 关闭选炮界面 */
		public static readonly CMD_CLOSEUI_CHANGETURRET = "CMD_CLOSEUI_CHANGETURRET";

		/** 特殊鱼 */
		public static readonly CMD_SPECIALFISH_ENTER = "CMD_SPECIALFISH_ENTER";

		/** 财神鱼的拉霸机小游戏 */
		public static readonly CMD_LABAJI_GAME = "CMD_LABAJI_GAME";

		/** 清场的时候清除冰冻 */
		public static readonly CMD_ESCAPE_UNFROZEN = "CMD_ESCAPE_UNFROZEN";

		/** 设置自动开炮 */
		public static readonly CMD_SET_AUTOSHOT = 'CMD_SET_AUTOSHOT';

		/** 打开炮倍选择 */
		public static readonly CMD_OPENUI_CHOOSETURRETTIME = "CMD_OPENUI_CHOOSETURRETTIME";

		/**闪电鳗死亡特效 */
		public static readonly CMD_SHANDIANMAN_DIE_EFFECT = "CMD_SHANDIANMAN_DIE_EFFECT";

		/**商城tooltip */
		public static readonly CMD_SHOP_SHOW_TOOLTIP = "CMD_SHOP_SHOW_TOOLTIP";
	}
}