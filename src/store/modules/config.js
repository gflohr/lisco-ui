/* eslint no-param-reassign: ["error", { "props": false }] */

export default {
	namespaced: true,
	state: {
		engines: {},
		players: {},
	},
	mutations: {
		setEngine(state, engine) {
			engines[engine] = engine;
		},
		setPlayer(state, player) {
			players[player] = player;
		},
	},
};
