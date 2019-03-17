/* eslint no-param-reassign: ["error", { "props": false }] */

import Chess from 'chess.js';

import TimeControl from '../../time-control';
import HumanPlayer from '../../players/human-player';
import EnginePlayer from '../../players/engine-player';

export default {
	namespaced: true,
	state: {
		chess: new Chess(),
		timed: true,
		history: [],
		whitePlayer: new HumanPlayer({ color: 'w' }),
		blackPlayer: new HumanPlayer({ color: 'b' }),
		whiteTimeControl: new TimeControl(40, 5 * 60 * 1000, 0),
		blackTimeControl: new TimeControl(40, 5 * 60 * 1000, 0),
	},
	mutations: {
		move(state, options) {
			const move = state.chess.move(options);
			if (move === undefined) return null;

			const whiteOnMove = state.chess.turn() === 'w';

			if (state.timed) {
				if (whiteOnMove) {
					state.blackTimeControl.stop();
					state.whiteTimeControl.start();
				} else {
					state.whiteTimeControl.stop();
					state.blackTimeControl.start();
				}
			}

			if (whiteOnMove) {
				state.whitePlayer.getMove(this.state.chess.fen());
			} else {
				state.whitePlayer.getMove(this.state.chess.fen());
			}

			return move;
		},
	},
	actions: {
		async start({ state }, options) {
			state.whitePlayer = new EnginePlayer(options.white);
			state.blackPlayer = new EnginePlayer(options.black);

			state.started = true;

			await Promise.all([
				state.whitePlayer.init(),
				state.blackPlayer.init(),
			]);

			if (!state.whitePlayer.isHuman()) {
				state.whiteTimeControl.start();
			}

			await state.whitePlayer.getMove(state.chess.fen());
		},
	},
	getters: {
		whiteTimeLeft: state => state.whiteTC[1] * 3600000,
		blackTimeLeft: state => state.blackTC[1] * 3600000,
		whiteTimeElapsed: (state) => {
			let elapsed = state.whiteElapsed;

			if (state.started && state.chess.turn() === 'w') {
				elapsed += performance.now() - state.startedThinking;
			}

			return elapsed;
		},
		blackTimeElapsed: (state) => {
			let elapsed = state.blackElapsed;

			if (state.started && state.chess.turn() === 'b') {
				elapsed += performance.now() - state.startedThinking;
			}

			return elapsed;
		},
	},
};
