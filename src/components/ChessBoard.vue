<template>
	<div ref="board" class="cg-board-wrap" id="chessground"></div>
</template>

<script>
import { Chessground } from 'chessground';

import '../../public/chessground/chessground.css';
import '../../public/chessground/theme.css';

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
	props: {
		'chess-game': Object,
	},
	methods: {
		toDests() {
			const dests = {};
			this.chessGame.SQUARES.forEach((s) => {
				const ms = this.chessGame.moves({ square: s, verbose: true });
				if (ms.length) dests[s] = ms.map(m => m.to);
			});
			return dests;
		},
		playOtherSide() {
			return (orig, dest) => {
				const move = this.chessGame.move({ from: orig, to: dest });
				console.log(move);
				this.cg.set({
					turnColor: this.turnColor(),
					movable: {
						color: this.turnColor(),
						dests: this.toDests(this.chessGame),
					},
				});
			};
		},
		turnColor() {
			return this.chessGame.turn() === 'w' ? 'white' : 'black';
		},
	},
	mounted() {
		this.cg = Chessground(this.$refs.board, {
			turnColor: this.turnColor(),
			movable: {
				color: this.turnColor(),
				free: false,
				dests: this.toDests(),
			},
		});
		this.cg.set({
			movable: {
				events: {
					after: this.playOtherSide(),
				},
			},
		});
		window.onresize = resizeBoard;
		resizeBoard();
	},
};
</script>
