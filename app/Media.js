export class Media {
	constructor() {
		this.allowedSound = true;
		this._swapSound = null;
	}

	playSwapSound() {
		if (!this.allowedSound) {
			return;
		}

		this._swapSound.play();
	}

	set swapSound(sound) {
		this._swapSound = sound;
	}

	get swapSound() {
		return Boolean(this._swapSound);
	}
}