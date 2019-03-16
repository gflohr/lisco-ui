<template>
	<div v-bind:class="[positionClass, colorClass]"
		class="player-info">
		<div class="player-info-name">{{fullName}}</div>
		<div v-bind:class="{'flagged': flagged}"
		     class="icon icon-clock"></div>
		<div v-bind:class="{'flagged': flagged}"
		     class="player-info-time-left">{{ timeLeft }}</div>
	</div>
</template>

<script>
function ms2time(ms) {
	const old = ms;
	let prefix = '';
	let seconds = Math.ceil(ms / 1000);
	if (seconds < 0) {
		seconds = -seconds;
		prefix = '-';
	}

	return prefix + new Date(seconds * 1000).toISOString().substr(11, 8);
}

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
		flagged: function flagged() {
			let tc;
			if (this.$props.pieceColor === 'white')
				tc = this.$store.state.whiteTimeControl;
			else
				tc = this.$store.state.blackTimeControl;

			return tc.timeLeft <= 0;
		},
		fullName: function fullName() {
			return this.$props.pieceColor === 'white'
				? this.$store.state.whiteName : this.$store.state.blackName;
		},
		timeLeft: function timeLeft() {
			let tc;
			if (this.$props.pieceColor === 'white')
				tc = this.$store.state.whiteTimeControl;
			else
				tc = this.$store.state.blackTimeControl;

			return ms2time(tc.timeLeft);
		},
	},
	created() {
	},
};
</script>
