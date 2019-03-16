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
		}
	},
	actions: {

	},
});
