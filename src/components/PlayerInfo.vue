<template>
	<div v-bind:class="[positionClass, colorClass]"
		class="player-info">
		<div class="player-info-name">{{fullName}}</div>
		<div class="icon icon-clock"></div>
		<div class="player-info-time-left">01:05:15</div>
		<div class="player-info-time-elapsed">01:03:12</div>
	</div>
</template>

<script>
export default {
	name: 'PlayerInfo',
	props: {
		componentPosition: String,
		pieceColor: String,
	},
	computed: {
		positionClass: function positionClass() {
			return `player-info-${this.$props.componentPosition}`;
		},
		colorClass: function colorClass() {
			return (this.$props.pieceColor === 'white'
				? 'player-info-white' : 'player-info-black');
		},
		fullName: function fullName() {
			return this.$props.pieceColor === 'white'
				? this.$store.state.whiteName : this.$store.state.blackName;
		}
	},
};
</script>
