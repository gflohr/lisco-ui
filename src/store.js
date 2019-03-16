import Vue from 'vue';
import Vuex from 'vuex';
import Chess from 'chess.js';

Vue.use(Vuex);

export default new Vuex.Store({
	state: {
		chess: new Chess(),
		history: [],
	},
	mutations: {
		move(state, options) {
			const move = state.chess.move(options);
			if (move) {
				state.history.push(move);
			}
		},
	},
	actions: {

	},
});
