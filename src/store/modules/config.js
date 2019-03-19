/* eslint no-param-reassign: ["error", { "props": false }] */

export default {
	namespaced: true,
	state: {
		players: {},
	},
	mutations: {
		setPlayer(state, player) {
			players[player] = player;
		},
	},
};
