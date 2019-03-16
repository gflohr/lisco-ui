import Vue from 'vue';
import Vuex from 'vuex';
import Chess from 'chess.js';

Vue.use(Vuex);

export default new Vuex.Store({
	state: {
		chess: new Chess(),
	},
	mutations: {
		move(state, options) {
			return state.chess.move(options);
		},
	},
	actions: {

	},
});
