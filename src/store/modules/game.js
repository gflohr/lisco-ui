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
		move: undefined,
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
		whitePlayer(state, player) {
			state.whitePlayer = player;
		},
		blackPlayer(state, player) {
			state.blackPlayer = player;
		},
	},
	actions: {
		async start({ state, commit }, options) {
			const whitePlayer = new EnginePlayer(options.white);
			const blackPlayer = new EnginePlayer(options.black);

			await Promise.all([
				whitePlayer.init(),
				blackPlayer.init(),
			]);

			commit('whitePlayer', whitePlayer);
			commit('blackPlayer', blackPlayer);
		},
		async move({ state }) {
			let player;
			let tc;

			if (state.chess.turn() === 'w') {
				player = state.whitePlayer;
				tc = state.whiteTimeControl;
			} else {
				player = state.blackPlayer;
				tc = state.blackTimeControl;
			}

			if (typeof state.move === 'undefined' || !player.isHuman()) {
				tc.start();
			}

			state.move = await player.getMove(state.chess.fen());
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
