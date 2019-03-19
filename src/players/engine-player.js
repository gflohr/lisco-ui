import ChessTools from 'chess-tools';
import UCIEngine from '../protocols/uci';
import WorkerConnection from '../connections/worker-connection.js';

import AbstractPlayer from './abstract-player';

const { Connection } = ChessTools.Engines;

export default class EnginePlayer extends AbstractPlayer {
	constructor(options) {
		super(options);
		this.connectionType = options.connection;
		this.protocol = options.protocol;
		this.path = options.path;
	}

	async init() {
		return new Promise((resolve, reject) => {
			if ('local' === this.connectionType) {
				if (typeof this.path === 'undefined') {
					throw new Error("Local process connection requires 'path'");
				}
				this.connection = new Connection.LocalProcess(this.path);
			} else if ('worker' === this.connectionType) {
				if (typeof this.path === 'undefined') {
					throw new Error("Worker connection requires 'path'");
				}
				this.connection = new WorkerConnection(this.path);
			} else {
				reject(new Error(`Unknown connection type '${this.connectionType}'`));
			}

			if ('UCI' === this.protocol) {
				this.engine = new UCIEngine(this.connection, {
					ponder_timeout: 5000,
					name: this.name
				});
			} else {
				reject(new Error(`Unknown engine protocol '${this.protocol}'`));
			}

			this.engine.on('initialized', () => {
				resolve();
			});
		});
	}

	async getMove(chess, whiteTimeControl, blackTimeControl) {
		const options = {
			wtime: whiteTimeControl.timeLeft,
			btime: blackTimeControl.timeLeft,
		};

		if (whiteTimeControl.increment > 0) {
			options.winc = whiteTimeControl.increment;
		}
		if (blackTimeControl.increment > 0) {
			options.winc = blackTimeControl.increment;
		}
		
		const tc = chess.turn() === 'w' ? whiteTimeControl : blackTimeControl;
		if (tc.moves_per_tc > 0) {
			options.movestogo = (chess.history.length >> 1) % tc.moves_per_tc;
		}

		// FIXME! We should also allow a fixed time (then use ponderPosition)
		// or a maximum depth.
		const bestMove = await this.engine.go(chess.fen(), options);
		const parts = bestMove.match(/^([a-h][1-8])([a-h][1-8])([qrbn])?$/);

		if (parts === null) {
			throw new Error(`Engine ${this.name} (color: ${this.color})`
			                + `returned invalid move ${bestMove}`);
		}

		const moveObject = {
			from: parts[1],
			to: parts[2],
		};

		if (typeof parts[3] !== 'undefined') moveObject.promotion = parts[3];

		return moveObject;
	}
}
