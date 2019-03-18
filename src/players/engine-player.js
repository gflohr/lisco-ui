import ChessTools from 'chess-tools';
import UCIEngine from '../engines/uci-engine';

import AbstractPlayer from './abstract-player';

const { Connection } = ChessTools.Engines;

export default class EnginePlayer extends AbstractPlayer {
	constructor(options) {
		super(options);
		this.connectionType = options.connection;
		this.managerType = options.manager;
		this.path = options.path;
	}

	async init() {
		return new Promise((resolve, reject) => {
			if ('local' === this.connectionType) {
				if (typeof this.path === 'undefined') {
					throw new Error("Local process connection requires 'path'");
				}
				this.connection = new Connection.LocalProcess(this.path);
			} else {
				reject(new Error(`Unknown connection type '${this.connectionType}'`));
			}

			if ('UCI' === this.managerType) {
				this.manager = new UCIEngine(this.connection, { ponder_timeout: 5000, name: this.name });
			} else {
				reject(new Error(`Unknown engine type '${this.managerType}'`));
			}

			this.manager.on('initialized', () => {
				resolve();
			});
		});
	}

	async getMove(fen) {
		const bestMove = await this.manager.ponderPosition(fen, {});
		const parts = bestMove.match(/^([a-h][1-8])([a-h][1-8])([qrbn])?$/);

		if (parts === null) {
			throw new Error(`Engine ${this.name} (color: ${this.color})`
			                + `returned invalid move ${bestMove}`);
		}

		const moveObject = {
			from: parts[1],
			to: parts[2],
		};

		if (typeof parts[2] !== 'undefined') moveObject.promotion = parts[2];

		return moveObject;
	}
}
