import AbstractPlayer from './abstract-player';

export default class HumanPlayer extends AbstractPlayer {
	init() {
		return new Promise((resolve) => {
			fullname().then((name) => {
				this.name = name;
				resolve();
			})
			.catch(() => {
				username.then((name) => {
					this.name = name;
					resolve();
				})
				.catch(() => {
					if (this.color === 'w') {
						this.name = 'White';
					} else {
						this.name = 'Black';
					}
					resolve();
				});
			});
		});
	}

	// FIXME! Wait for signal!
	async requestMove() {
		return 'e4';
	}
}
