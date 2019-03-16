import Vue from 'vue';
import Vuex from 'vuex';
import Chess from 'chess.js';
import TimeControl from './time-control';

Vue.use(Vuex);

export default new Vuex.Store({
	state: {
		chess: new Chess(),
		live: true,
		history: [],
		boardFlipped: false,
		whiteName: 'White',
		blackName: 'Black',
		whiteTimeControl: new TimeControl(40, 5 * 60 * 1000, 0),
		blackTimeControl: new TimeControl(40, 0.1 * 60 * 1000, 0),
	},
	mutations: {
		move(state, options) {
			const move = state.chess.move(options);
			if (move === undefined) return;

			const whiteOnMove = state.chess.turn() === 'w';
			if (whiteOnMove) {
				state.blackTimeControl.stop();
				state.whiteTimeControl.start();
			} else {
				state.whiteTimeControl.stop();
				state.blackTimeControl.start();
			}

			state.history.push(move);
		},
		start(state) {
			state.started = true;
		},
		whiteName(state, name) {
			state.whiteName = name;
		},
		blackName(state, name) {
			state.blackName = name;
		},
	},
	getters: {
		whiteTimeLeft: state => {
			return state.whiteTC[1] * 3600000;
		},
		blackTimeLeft: state => {
			return state.blackTC[1] * 3600000;
		},
		whiteTimeElapsed: state => {
			let elapsed = state.whiteElapsed;

			if (state.started && state.chess.turn() === 'w') {
				elapsed += performance.now() - state.startedThinking;
			}

			return elapsed;
		},
		blackTimeElapsed: state => {
			let elapsed = state.blackElapsed;

			if (state.started && state.chess.turn() === 'b') {
				elapsed += performance.now() - state.startedThinking;
			}

			return elapsed;
		},
	},
	actions: {

	},
});
