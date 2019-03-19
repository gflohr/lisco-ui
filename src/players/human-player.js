import username from 'username';
import fullname from 'fullname';

import AbstractPlayer from './abstract-player';
import { ipcRenderer } from 'electron';

export default class HumanPlayer extends AbstractPlayer {
	constructor(options, chessground, chess) {
		super(options);
		this.chessground = chessground;
		this.chess = chess;
	}

	isHuman() {
		return true;
	}

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

	async getMove() {
		const chessground = this.chessground;
		const chess = this.chess;
		const color = chess.turn() === 'w' ? 'white' : 'black';
		const otherColor = chess.turn() === 'w' ? 'black' : 'white';

		return new Promise((resolve, reject) => {
			const dests = {};
			chess.SQUARES.forEach((s) => {
				const ms = chess.moves({ square: s, verbose: true });
				if (ms.length) dests[s] = ms.map(m => m.to);
			});
	
			const onMove = (from, to) => {
				let promotion = false;
				chessground.set({
					turnColor: otherColor,
					movable: {
						color: otherColor,
						dests: [],
						free: false,
					}
				});

				if (to.match(/[18]$/)) {
					const piece = chess.get(from);
					if (piece.type === 'p') {
						promotion = true;
					}
				}

				if (promotion) {
					ipcRenderer.send('promotion-dialog');
					ipcRenderer.once('promotion-piece', (event, button) => {
						let piece;
						switch(button) {
							case 0:
								piece = 'n';
								break;
							case 1:
								piece = 'b';
								break;
							case 2:
								piece = 'r';
								break;
							default:
								piece = 'q';
								break;
						}
						resolve({ from: from, to: to, promotion: piece });
					});
				} else {
					resolve({ from: from, to: to });
				}
			};

			chessground.set({
				turnColor: color,
				movable: {
					color: color,
					dests: dests,
					moveDests: false,
					free: false,
					events: {
						after: onMove,
					}
				}
			});
		});
	}
}
