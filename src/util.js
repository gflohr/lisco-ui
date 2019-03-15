export function toColor(game) {
	return game.turn() === 'w' ? 'white' : 'black';
}

export function timestamp() {
	return window.performance.now();
}

