<template>
	<div class="toolbar-actions">
		<input id="fen" type="text" disabled="disabled"
				size="120"
				value="rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1" />
		<button class="btn btn-default">
			Copy
		</button>
	</div>
</template>

<script>
export default {
	name: 'PositionDisplay',
	computed: {
		FEN: function FEN() {
			return 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1';
		},
	},
};
</script>
