module core {
    /**
     * EUIComponent为EUI容器组件，所有EUI组件及窗口都应该继承本类
     */
    export abstract class EUIComponent extends eui.Component implements IComponent {
        constructor() {
            super();
            this.touchEnabled = false;
            this.touchChildren = false;
        }
        /**
         * 过滤点击逻辑
         */
        public $hitTest(stageX: number, stageY: number): egret.DisplayObject {
            if (!this.touchEnabled && !this.touchChildren) {
                return null;
            } else {
                return super.$hitTest(stageX, stageY);
            }
        }
        /**
		 * 从父容器移除
		 */
        public removeFromParent(): void {
            if (this.parent) {
                this.parent.removeChild(this);
            }
        }
        /**
		 * 所有子类都必需实现此方法并在此方法释放资源
		 */
        public abstract release(): void;
    }
}