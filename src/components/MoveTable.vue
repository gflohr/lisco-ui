<template>
	<table class="table-striped">
		<thead>
			<tr>
				<th class="toolbar"></th>
				<th class="toolbar"><h1 class="title">White</h1></th>
				<th class="toolbar"><h1 class="title">Black</h1></th>
			</tr>
		</thead>
		<tbody>
			<tr v-for="(row, index) in doubleMoves" :key="row.id">
				<th>{{ index + 1 }}</th>
				<td>{{ row.white }}</td>
				<td>{{ row.black }}</td>
			</tr>
		</tbody>
	</table>
</template>

<script>
function pieceMapping() {
	return {
		w: {
			p: '',
			n: '♘',
			b: '♗',
			r: '♖',
			q: '♕',
			k: '♔',
		},
		b: {
			p: '',
			n: '♞',
			b: '♝',
			r: '♜',
			q: '♛',
			k: '♚',
		},
	};
}

function formatMove(move, long) {
	if (!long || 'O' === move.san.charAt(0)) return move.san;

	const mapping = pieceMapping()[move.color];

	let retval = '';
	if (move.piece !== 'p') retval += mapping[move.piece];
	retval += move.from;
	if (move.captured === undefined) {
		retval += '-';
	} else {
		retval += 'x';
	}
	retval += move.to;

	if (move.promotion) {
		retval += mapping[move.promotion];
	}

	// Steal all other signs from the SAN variant.
	const info = move.san.replace(/.*[1-8](?:=[QRBN])?/, '');

	retval += info;

	return retval;
}

export default {
	name: 'MoveTable',
	props: {
	},
	computed: {
		doubleMoves: function doubleMoves() {
			const { history } = this.$store.state.game;
			const rows = [];
			const longFormat = true;

			for (let i = 0; i < history.length; i += 2) {
				const row = {
					id: i,
					white: formatMove(history[i], longFormat),
					black: '',
				};

				if (i + 1 < history.length) {
					row.black = formatMove(history[i + 1], longFormat);
				}

				rows.push(row);
			}

			return rows;
		},
	},
};
</script>
