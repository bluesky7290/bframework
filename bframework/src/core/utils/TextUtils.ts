module core {
	/**
     * 文字处理工具类
     */
    export class TextUtils {

        private static s_textFlowParser: egret.HtmlTextParser = new egret.HtmlTextParser();

        public constructor() {
        }

        /**
         *  创建文本
         * @param size      字号
         * @param color     字体颜色
         * @param vAlign    纵向对齐方式 默认：egret.VerticalAlign.MIDDLE
         * @param hAlign    横向对齐方式 默认：egret.HorizontalAlign.CENTER
         * @param family    字体 默认:Verdana
         */
        public static createTextfield(size: number,
            color: number = 0xFFFFFF,
            vAlign: string = egret.VerticalAlign.MIDDLE,
            hAlign: string = egret.HorizontalAlign.CENTER,
            family: string = "Verdana"): egret.TextField {
            var textfield: egret.TextField = new egret.TextField();
            textfield.size = size;
            textfield.textColor = color;
            textfield.textAlign = hAlign;
            textfield.verticalAlign = vAlign;
            textfield.fontFamily = family;
            textfield.cacheAsBitmap = true;
            return textfield;
        }

        /**
         *  字符参数替换  数组索引与括号内索引一一对应
         * @param str       "参数替换{0}和{1}..."
         * @param args      [x,y]    
         */
        public static formatString(str: string, args: string[]): string {
            if (str) {
                let reg: RegExp = /\{[0-9]+?\}/;
                while (str.match(reg)) {
                    let arr: RegExpMatchArray = str.match(reg);
                    let arg: RegExpMatchArray = arr[0].match(/[0-9]+?/);
                    str = str.replace(reg, args[parseInt(arg[0])]);
                }
                return str;
            }
            return "";
        }
        /**
         *  解析富文本
         * @param htmltext
         */
        public static parseHtmlText(htmltext: string): egret.ITextElement[] {
            return TextUtils.s_textFlowParser.parse(htmltext);
        }
        /**
         *  显示文字提示
         * @param tip
         */
        public static showTextTip(tip: string, color: number = 0xFFFFFF): void {
            var max_W: number = core.LayerCenter.stageWidth;
            var max_H: number = core.LayerCenter.stageHeight;
            var textfield: egret.TextField = core.TextUtils.createTextfield(30);
            textfield.text = tip;
            textfield.textColor = color;
            textfield.width = textfield.textWidth;
            textfield.height = textfield.textHeight;
            textfield.x = (max_W - textfield.width) * 0.5;
            textfield.y = (max_H - textfield.height) * 0.5;
            core.LayerCenter.getInstance().stage.addChild(textfield);
            egret.Tween.get(textfield).to({ y: max_H * 0.4, alpha: 0 }, 1000, egret.Ease.circIn).call(function (target: egret.TextField): void {
                target.parent.removeChild(target);
            }, this, [textfield]);
        }

        /**
         * 如果str的长度超过len，就取前len个字符在加上后缀suffix
         * @param str : 字符串
         * @param len : 限制长度
         * @param suffix ：添加后缀
         */
        public static StringFormat(str: string, len?: number, suffix?: string): string {
            len = len || 6;
            suffix = suffix || "...";

            let ret = str;
            if (str.length > len) {
                ret = str.substr(0, len) + suffix;
            }
            return ret;
        }
    }
}
