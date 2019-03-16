import Vue from 'vue';
import Vuex from 'vuex';
import Chess from 'chess.js';

Vue.use(Vuex);

export default new Vuex.Store({
	state: {
		chess: new Chess(),
		history: [],
		boardFlipped: false,
		whiteName: 'White',
		blackName: 'Black',
		whiteTimeControl: [40, 5, 0],
		blackTimeControl: [40, 5, 0],
	},
	mutations: {
		move(state, options) {
			const move = state.chess.move(options);
			if (move) {
				state.history.push(move);
			}
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
			console.log(state);
			return state.whiteTimeControl[1] * 3600000;
		},
		blackTimeLeft: state => {
			console.log(state);
			return state.blackTimeControl[1] * 3600000;
		},
	},
	actions: {

	},
});
