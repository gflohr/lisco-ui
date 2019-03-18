<template>
	<div ref="board" class="cg-board-wrap" id="chessground"></div>
</template>

<script>
import { Chessground } from 'chessground';

import '../../public/chessground/chessground.css';
import '../../public/chessground/theme.css';

// FIXME! Remove the chessground component from here and put it into the global
// state so that it is easier to manipulate.

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
	const chessground = document.getElementById('chessground');
	chessground.style.width = `${size}px`;
	chessground.style.height = `${size}px`;
	document.body.dispatchEvent(new Event('chessground.resize'));
}

export default {
	name: 'ChessBoard',
	mounted() {
		this.cg = Chessground(this.$refs.board, {});
		window.onresize = resizeBoard;
		this.$store.commit('game/chessground', this.cg);
		resizeBoard();
	},
};
</script>
