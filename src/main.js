import Vue from 'vue';
import App from './App.vue';
import store from './store';

import '../node_modules/photonkit/dist/css/photon.css';
import './assets/scss/lisco.scss';

Vue.config.productionTip = false;

function resizeBoard() {
	const body = document.getElementsByTagName('body')[0];
	const bodyWidth = body.offsetWidth;
	const bodyHeight = body.offsetHeight;
	const playerInfos = document.getElementsByClassName('player-infos')[0];
	const playerInfosWidth = playerInfos.offsetWidth;
	const moves = document.getElementsByClassName('moves')[0];
	const movesWidth = moves.offsetWidth;
	const header = document.getElementById('header');
	const headerHeight = header.offsetHeight;
	const footer = document.getElementById('footer');
	const footerHeight = footer.offsetHeight;

	const coordsRanks = document.getElementsByClassName('ranks')[0];
	const coordsFiles = document.getElementsByClassName('files')[0];

	const width = bodyWidth - playerInfosWidth - movesWidth
		- 2 * coordsRanks.offsetWidth;
	const height = bodyHeight - headerHeight - footerHeight
		- 2 * coordsFiles.offsetHeight;

	const size = Math.min(width, height);

	// FIXME! This is brittle.
	const chessground = document.getElementsByClassName('cg-board-wrap')[0];
	chessground.style.width = `${size}px`;
	chessground.style.height = `${size}px`;
	document.body.dispatchEvent(new Event('chessground.resize'));
}

new Vue({
	store,
	render: h => h(App),
	mounted() {
		// FIXME! That doesn't belong here!
		window.addEventListener('load', resizeBoard);
		window.addEventListener('resize', resizeBoard);
	},
}).$mount('#app');
