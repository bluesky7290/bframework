module core {
	/**
     * webSocket的基础封装
     * 本类定位于解决H5及Native中webSocket的各种问题，由于是基础封装，所以本类仅包含以下功能
     * 1、与服务器的链接、断开、异常捕获和接收及发送数据
     * 2、链接状态维护
     * 注意：本类不包括心跳保活功能，实际使用过程中如有需要请自行扩展。
     */
    export class SocketAPI {

        private static s_instance: SocketAPI;

        private m_webSocket: egret.WebSocket;
        /**
         * 目标服务器地址
         */
        private m_address: string;
        /**
         * WebSocket连接状态
         */
        private m_state: WebSocketStateEnum = WebSocketStateEnum.CLOSED;
        /**
         * WebSocket发送和接收数据类型
         */
        private m_type: WebSocketTypeEnum = WebSocketTypeEnum.TYPE_STRING;

        public constructor() {
            let webSocket: egret.WebSocket = new egret.WebSocket();
            webSocket.addEventListener(egret.Event.CONNECT, this.onConnected, this);
            webSocket.addEventListener(egret.ProgressEvent.SOCKET_DATA, this.onSocketData, this);
            webSocket.addEventListener(egret.IOErrorEvent.IO_ERROR, this.onIOError, this);
            webSocket.addEventListener(egret.Event.CLOSE, this.onClosed, this);
            this.m_webSocket = webSocket;
        }

        public static get instance(): SocketAPI {
            if (SocketAPI.s_instance == null) {
                SocketAPI.s_instance = new SocketAPI();
            }
            return SocketAPI.s_instance;
        }

        private onConnected(event: egret.Event): void {
            Log.log("与WebSocket服务器链接成功");
            this.m_state = WebSocketStateEnum.CONNECTED;
            core.EventManager.getInstance().sendEvent(new SocketEventData(EventID.SOCKET_CONNECT));
        }

        private onSocketData(event: egret.ProgressEvent): void {
            let buffer: ByteBuffer = new ByteBuffer();
            this.m_webSocket.readBytes(buffer);
            if (buffer.length > 0) {
                core.EventManager.getInstance().sendEvent(new SocketEventData(EventID.SOCKET_DATA, buffer));
            }
        }

        private onIOError(event: egret.IOErrorEvent): void {
            Log.log("与WebSocket服务器链接失败");
            this.m_state = WebSocketStateEnum.CLOSED;
            core.EventManager.getInstance().sendEvent(new SocketEventData(EventID.SOCKET_IOERROR));
        }

        private onClosed(event: egret.Event): void {
            Log.log("与WebSocket服务器断开链接");
            this.m_state = WebSocketStateEnum.CLOSED;
            core.EventManager.getInstance().sendEvent(new SocketEventData(EventID.SOCKET_CLOSE));
        }
        /**
         * 发送数据
         * @param  {egret.ByteArray} data
         */
        public sendData(data: egret.ByteArray): void {
            if (this.m_state == WebSocketStateEnum.CONNECTED) {
                this.m_webSocket.writeBytes(data);
                egret.callLater(this.flushToServer, this);
            }
        }

        private flushToServer(): void {
            this.m_webSocket.flush();
        }
        /**
         * @param host 服务器IP 如：127.0.0.1
         * @param port 服务器端口 如：8080
         * @param isSSL 是否应用SSL
         */
        public setAddress(host: string, port: number, isSSL: boolean = false): void {
            this.m_address = `${isSSL ? 'wss' : 'ws'}://${host}:${port}`;
        }
        /**
         * @param address 服务器地址 如：ws://127.0.0.1:8080 或 wss://127.0.0.1:8080
         */
        public setAddressURL(address: string): void {
            this.m_address = address;
        }

        /**
         * 设置发送数据类型
         * @param  {WebSocketTypeEnum} type
         * @returns this
         */
        public setType(type: WebSocketTypeEnum): void {
            switch (type) {
                case WebSocketTypeEnum.TYPE_STRING:
                    this.m_webSocket.type = egret.WebSocket.TYPE_STRING;
                    break;
                case WebSocketTypeEnum.TYPE_BINARY:
                    this.m_webSocket.type = egret.WebSocket.TYPE_BINARY;
                    break;
            }
        }

        /**
         * 移除监听
         */
        public removeEventListener(): void {
            this.m_webSocket.addEventListener(egret.Event.CONNECT, this.onConnected, this);
            this.m_webSocket.addEventListener(egret.ProgressEvent.SOCKET_DATA, this.onSocketData, this);
            this.m_webSocket.addEventListener(egret.IOErrorEvent.IO_ERROR, this.onIOError, this);
            this.m_webSocket.addEventListener(egret.Event.CLOSE, this.onClosed, this);
        }

        /**
         * 连接服务器
         */
        public connect(): void {
            this.m_state = WebSocketStateEnum.CONNECTING;
            this.m_webSocket.connectByUrl(this.m_address);
        }
        /**
         * 断开与服务器的连接
         */
        public close(): void {
            this.removeEventListener();
            this.m_state = WebSocketStateEnum.CLOSING;
            this.m_webSocket.close();
        }
        /**
         * 获取当前链接状态
         */
        public get state(): WebSocketStateEnum {
            return this.m_state;
        }
    }

    /**
     * CONNECTING   正在尝试连接服务器
     * CONNECTED    已成功连接服务器 
     * CLOSING      正在断开服务器连接
     * CLOSED       已断开与服务器连接
     */
    export enum WebSocketStateEnum {
        CONNECTING,
        CONNECTED,
        CLOSING,
        CLOSED
    }

    /**
     * TYPE_STRING 以字符串格式发送和接收数据
     * TYPE_BINARY 以二进制格式发送和接收数据
     */
    export enum WebSocketTypeEnum {
        TYPE_STRING,
        TYPE_BINARY
    }
}
