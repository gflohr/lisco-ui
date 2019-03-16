<template>
	<div v-bind:class="[positionClass, colorClass]"
		class="player-info">
		<div class="player-info-name">{{fullName}}</div>
		<div class="icon icon-clock"></div>
		<div class="player-info-time-left">{{ timeLeft }}</div>
	</div>
</template>

<script>
function ms2time(ms) {
	let seconds = Math.ceil(ms / 1000);
	let minutes = Math.floor(seconds / 60);
	seconds -= 60 * minutes;
	let hours = Math.floor(minutes / 60);
	minutes -= 60 * hours;
	return [hours.toString().padStart(2, '0'),
			minutes.toString().padStart(2, '0'),
			seconds.toString().padStart(2, '0')].join(':');
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
