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
	props: ['ready'],
	watch: {
		ready: function() {
			if (this.ready) {
				this.cg.set({
					movable: {
						color: this.turnColor(),
						dests: this.toDests(),
					}
				});
			}
		}
	},
	methods: {
		// Get the destination squares for a particular position.
		toDests() {
			const dests = {};
			const { chess } = this.$store.state;
			chess.SQUARES.forEach((s) => {
				const ms = chess.moves({ square: s, verbose: true });
				if (ms.length) dests[s] = ms.map(m => m.to);
			});
			return dests;
		},
		playOtherSide() {
			return (orig, dest) => {
				this.$store.commit('move', { from: orig, to: dest });
				// FIXME! That depends on the type of opponent!
				this.cg.set({
					turnColor: this.turnColor(),
					movable: {
						color: this.turnColor(),
						dests: this.toDests(),
					},
				});
			};
		},
		turnColor() {
			return this.$store.state.chess.turn() === 'w' ? 'white' : 'black';
		},
	},
	mounted() {
		this.cg = Chessground(this.$refs.board, {
			turnColor: this.turnColor(),
			movable: {
				color: this.turnColor(),
				free: false,
				color: undefined,
				dests: [],
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
