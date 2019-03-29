/* eslint no-param-reassign: ["error", { "props": false }] */

export default {
	namespaced: true,
	state: {
		engines: {},
		players: {},
	},
	mutations: {
		setEngine(state, engine) {
			state.engines[engine] = engine;
		},
		setPlayer(state, player) {
			state.players[player] = player;
		},
	},
};
