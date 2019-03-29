<template>
	<div class="toolbar-actions">
		<input id="fen" v-model="FEN" type="text" disabled="disabled"
				size="100"/>
		<button class="btn btn-default"
		        v-clipboard:copy="FEN">
			Copy
		</button>
	</div>
</template>

<script>
export default {
	name: 'PositionDisplay',
	computed: {
		FEN: function FEN() {
			return this.$store.state.game.fen;
		},
	},
};
</script>
