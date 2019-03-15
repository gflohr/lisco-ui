export function toColor(game) {
	return game.turn() === 'w' ? 'white' : 'black';
}

export function timestamp() {
	return window.performance.now();
}

export function playOtherSide(cg, chess) {
	return (orig, dest) => {
		const move = chess.move({from: orig, to: dest});
		cg.set({
			turnColor: toColor(chess),
			movable: {
				color: toColor(chess),
				dests: toDests(chess)
			},
	  });
	};
}
