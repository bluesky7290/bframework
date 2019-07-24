namespace ttaby {
	export class ShowtipController extends BaseController {
		public m_showTipPanel: ShowTipView;
		public constructor() {
			super(ControllerEnum.SHOWTIP);
			this.Init();
		}
		/**
		 * 初始化
		 */
		private Init(): void {
			Event.AddListener(InternalEvt.CMD_SHOW_TIP, this.Show, this);
		}
		/**
		* 获取loading
		*/
		protected getLoading(): core.ILoadingUI {
			return null;
		}
		/**
		 * 预加载资源组
		 */
		protected getLoadGroup(data?: core.ControllerEventData): string[] {
			return ['common'];
		}
		/**
		 * 显示
		 */
		protected show(data?: any): void {
			Log.error(`外部传递参数：${data}`);
			if (!this.m_showTipPanel) {
				this.m_showTipPanel = new ShowTipView(this);
				LayoutManager.fullScreen(this.m_showTipPanel);
			}
			this.addChildTop(this.m_showTipPanel);
			this.m_showTipPanel.show(data);
		}

		private Show(params: Array<any>): boolean {
			let content = params[0];
			let time = params[1];

			if (!this.m_showTipPanel) {
				this.m_showTipPanel = new ShowTipView(this);
				LayoutManager.fullScreen(this.m_showTipPanel);
			}

			this.addChildTop(this.m_showTipPanel);

			this.m_showTipPanel.show(content, time);
			return false;
		}
		/**
         * 更新
         */
		protected update(data?: any): void {

		}

		public reset(): void {
			this.hide();
		}
		/**
		 * 隐藏
		 */
		protected hide(): void {
			this.removeChildPopup(this.m_showTipPanel);
			this.m_showTipPanel.release();
			this.m_showTipPanel = null;
		}

		protected release(): void {
			super.release();
		}
	}
}