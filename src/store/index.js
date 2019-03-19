/* eslint no-param-reassign: ["error", { "props": false }] */

import Vue from 'vue';
import Vuex from 'vuex';

import game from './modules/game';
import config from './modules/config';

Vue.use(Vuex);

export default new Vuex.Store({
	modules: {
		game,
		config,
	},
	state: {
		boardFlipped: false,
	},
});
