export default class AbstractPlayer {
	constructor(options) {
		if (!('color' in options)) {
			throw new Error("the option 'color' is mandatory");
		}

		this.color = options.color;

		if ('name' in options) {
			this.name = options.name;
		} else if ('w' === this.color) {
			this.name = 'White';
		} else {
			this.name = 'Black';
		}
	}

	isHuman() {
		return false;
	}

	async getMove() {
	}
}
