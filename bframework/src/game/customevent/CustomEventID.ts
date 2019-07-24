namespace ttaby {
    /**
        * 事件消息定义类
        */
    export class CustomEventID {
        /**
         * 断线重连成功消息
         */
        public static NETRECONNECTE: string = "ttaby.CustomEventID.NETRECONNECTE";
        /**
         * 网络断开消息
         */
        public static NETDISCONNECTED: string = "ttaby.CustomEventID.NETDISCONNECTED";
        /**
         * 游戏恢复
         */
        public static GAMERESUME: string = "ttaby.CustomEventID.GAMERESUME";
        /**
         * 游戏暂停
         */
        public static GAMEPAUSE:string = "ttaby.CustomEventID.GAMEPAUSE";
     } 
}