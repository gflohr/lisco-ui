<template>
	<div ref="board" class="cg-board-wrap"></div>
</template>

<script>
import { Chessground } from 'chessground';
import '../../public/chessground/chessground.css';
import '../../public/chessground/theme.css';

export default {
	name: 'ChessBoard',
	mounted() {
		this.board = Chessground(this.$refs.board, {});
	}
};
</script>
