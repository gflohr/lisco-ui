export function toColor(game) {
	return game.turn() === 'w' ? 'white' : 'black';
}

export function toDests(chess) {
	const dests = {};
	chess.SQUARES.forEach((s) => {
		const ms = chess.moves({ square: s, verbose: true });
		if (ms.length) dests[s] = ms.map(m => m.to);
	});
	return dests;
}

export function timestamp() {
	return window.performance.now();
}

export function playOtherSide(cg, chess) {
	return (orig, dest) => {
		chess.move({from: orig, to: dest});
		cg.set({
			turnColor: toColor(chess),
			movable: {
				color: toColor(chess),
				dests: toDests(chess)
			},
	  });
	};
}
