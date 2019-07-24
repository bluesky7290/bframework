module core {
	/**
     * 本类为Base64编码的基础实现，本类为与C++服务器通信的定制实现，通用实现请使用DOMAPI。
     */
    export class Base64 {
        private static s_encodeChars: number[] = Base64.initEncodeChar();
        private static s_decodeChars: number[] = Base64.initDecodeChar();

        public constructor() {
        }

        private static initEncodeChar(): number[] {
            var encodeChars: number[] = new Array(64);
            var chars: string = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
            for(var i: number = 0,len: number = chars.length;i < len;i++) {
                encodeChars[i] = chars.charCodeAt(i);
            }
            return encodeChars;
        }

        private static initDecodeChar(): number[] {
            var decodeChars: number[] =
                [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
                    -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
                    -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,62,-1,-1,-1,63,
                    52,53,54,55,56,57,58,59,60,61,-1,-1,-1,-1,-1,-1,
                    -1,0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,
                    15,16,17,18,19,20,21,22,23,24,25,-1,-1,-1,-1,-1,
                    -1,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,
                    41,42,43,44,45,46,47,48,49,50,51,-1,-1,-1,-1,-1,
                    -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
                    -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
                    -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
                    -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
                    -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
                    -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
                    -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
                    -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1];
            return decodeChars;
        }

        public static encode(data: egret.ByteArray): string {
            var bytedata: egret.ByteArray = new egret.ByteArray();
            var position: number = 0,dataLen: number = data.length;
            var mod: number = dataLen % 3,len: number = dataLen - mod;
            var bytes: number = 0;
            data.position = 0;
            while(position < len) {
                bytes = (data.readByte() & 0xFF) << 16 | (data.readByte() & 0xFF) << 8 | (data.readByte() & 0xFF);
                bytedata.writeByte(Base64.s_encodeChars[bytes >>> 18]);
                bytedata.writeByte(Base64.s_encodeChars[bytes >>> 12 & 0x3F]);
                bytedata.writeByte(Base64.s_encodeChars[bytes >>> 6 & 0x3F]);
                bytedata.writeByte(Base64.s_encodeChars[bytes & 0x3F]);
                position += 3;
            }
            if(mod == 1) {
                bytes = data.readByte() & 0xFF;
                bytedata.writeByte(Base64.s_encodeChars[bytes >>> 2]);
                bytedata.writeByte(Base64.s_encodeChars[bytes & 0x03]);
                bytedata.writeByte(61);
                bytedata.writeByte(61);
            }
            else if(mod == 2) {
                bytes = (data.readByte() & 0xFF) << 8 | data.readByte() & 0xFF;
                bytedata.writeByte(Base64.s_encodeChars[bytes >>> 10]);
                bytedata.writeByte(Base64.s_encodeChars[(bytes >>> 4) & 0x3F]);
                bytedata.writeByte(Base64.s_encodeChars[(bytes & 0x0F) << 2]);
                bytedata.writeByte(61);
            }
            position += mod;
            bytedata.position = 0;
            return bytedata.readUTFBytes(bytedata.length);
        }

        public static decode(str: string): egret.ByteArray {
            var bytedata: egret.ByteArray = new egret.ByteArray();
            var base64data: egret.ByteArray = new egret.ByteArray();
            base64data.writeUTFBytes(str);
            base64data.position = 0;
            var char1: number,char2: number,char3: number,char4: number;
            var i: number = 0,len: number = base64data.length;
            while(i < len) {
                char1 = Base64.s_decodeChars[base64data.readByte() & 0xFF];
                if(char1 == -1) {
                    break;
                }
                char2 = Base64.s_decodeChars[base64data.readByte() & 0xFF];
                if(char2 == -1) {
                    break;
                }
                bytedata.writeByte((char1 << 2) | (char2 & 0x30 >> 4));
                char3 = base64data.readByte() & 0xFF;
                if(char3 == 61) {
                    break;
                }
                char3 = Base64.s_decodeChars[char3];
                if(char3 == -1) {
                    break;
                }
                bytedata.writeByte((char2 & 0x0F << 4) | (char3 & 0x3C >> 2));
                char4 = base64data.readByte() & 0xFF;
                if(char4 == 61) {
                    break;
                }
                char4 = Base64.s_decodeChars[char4];
                if(char4 == -1) {
                    break;
                }
                bytedata.writeByte((char3 & 0x03 << 6) | char4);
                i += 4;
            }
            bytedata.position = 0;
            return bytedata;
        }

        public static encodeStr(str: string): string {
            if(str != null && str != "") {
                var bytes: egret.ByteArray = new egret.ByteArray();
                bytes.writeUTFBytes(str);
                return Base64.encode(bytes);
            }
            return "";
        }

        public static decodeStr(str: string): string {
            if(str != null && str != "") {
                var bytes: egret.ByteArray = Base64.decode(str);
                return bytes.readUTFBytes(bytes.length);
            }
            return "";
        }
    }
}
