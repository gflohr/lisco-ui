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
		move(state, move) {
			const moveObject = state.chess.move(move);
			if (moveObject === undefined) return null;

			state.move = moveObject;
		},
		whitePlayer(state, player) {
			state.whitePlayer = player;
		},
		blackPlayer(state, player) {
			state.blackPlayer = player;
		},
		startWhiteClock(state) {
			state.whiteTimeControl.start();
		},
		startBlackClock(state) {
			state.blackTimeControl.start();
		},
		stopWhiteClock(state) {
			state.whiteTimeControl.stop();
		},
		stopBlackClock(state) {
			state.blackTimeControl.stop();
		},
	},
	actions: {
		async start({ commit }, options) {
			const whitePlayer = new EnginePlayer(options.white);
			const blackPlayer = new EnginePlayer(options.black);

			await Promise.all([
				whitePlayer.init(),
				blackPlayer.init(),
			]);

			commit('whitePlayer', whitePlayer);
			commit('blackPlayer', blackPlayer);
		},
		async move({ state, commit }) {
			let player;
			let color;

			if (state.chess.turn() === 'w') {
				player = state.whitePlayer;
				color = 'White';
			} else {
				player = state.blackPlayer;
				color = 'Black';
			}

			if (state.timed
				&& !(typeof state.move === 'undefined' && player.isHuman())) {
				commit(`start${color}Clock`);
			}

			const move = await player.getMove(state.chess.fen());

			if (state.timed
				&& !(typeof state.move === 'undefined' && player.isHuman())) {
				commit(`stop${color}Clock`);
			}

			commit('move', move);
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
