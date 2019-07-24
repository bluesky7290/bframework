namespace ttaby {
    export class ButtonEx extends eui.Button {
        public constructor() {
            super();
            this.skinName = "resource/eui_skins/ButtonSkin.exml";
        }

		protected childrenCreated() {
			super.childrenCreated();
			let a = 10;
		}

        public invalidateState(): void {
            super.invalidateState();

            let state = this.getCurrentState();

            if (state === "up") {
                this.filters = null;
            } else if (state === "down") {
                this.filters = [ButtonFliter.GetDownFliter()];
            } else if (state === "disabled") {
                this.filters = [ButtonFliter.GetDisabledFliter()];
            }
        }
    }
}

window['ButtonEx'] = ttaby.ButtonEx;