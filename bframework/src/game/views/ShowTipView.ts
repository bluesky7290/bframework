namespace ttaby {
	export class ShowTipView extends BaseView {
		public m_tip: eui.Image;
		public m_content: eui.Label;

		public constructor(owerCtrl: BaseController) {
			super(owerCtrl);
			this.skinName = "resource/skins/ShowTipPanelSkin.exml";
		}

		protected childrenCreated() {
			super.childrenCreated();
		}

		public show(content: string, time?: number): void {
			this.m_content.text = content;
			this.m_tip.width = this.m_content.width + 120;
			this.m_tip.horizontalCenter = 0;
			this.m_tip.verticalCenter = 0;
			this.m_content.horizontalCenter = 0;
			this.m_content.verticalCenter = 0;
			let duration: number = time || 2000;
			core.TimerManager.instance.addTick(duration, 1, this.hide, this);
		}

		public hide(): void {
			let ctrl = this.owerCtrl as ShowtipController;
			ctrl.reset();
		}

		public release(): void {

		}
	}
}