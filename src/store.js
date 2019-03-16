import Vue from 'vue';
import Vuex from 'vuex';
import Chess from 'chess.js';

Vue.use(Vuex);

export default new Vuex.Store({
	state: {
		chess: new Chess(),
		live: true,
		started: false,
		history: [],
		boardFlipped: false,
		whiteName: 'White',
		blackName: 'Black',
		whiteTimeControl: [40, 5, 0],
		blackTimeControl: [40, 5, 0],
		whiteElapsed: 0,
		blackElapsed: 0,
		startedThinking: undefined,
	},
	mutations: {
		move(state, options) {
			const move = state.chess.move(options);
			if (move === undefined) return;

			state.history.push(move);
			if (!state.live) return;

			state.started = true;
			state.startedThinking = performance.now();
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
			return state.whiteTimeControl[1] * 3600000;
		},
		blackTimeLeft: state => {
			return state.blackTimeControl[1] * 3600000;
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
