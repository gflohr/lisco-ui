import Chess from 'chess.js';

export default function () {
	this.started = false;
	this.chess = new Chess();

	// Get the destination squares for a particular position.
	this.toDests = () => {
		const dests = {};
		this.chess.SQUARES.forEach((s) => {
			const ms = this.chess.moves({ square: s, verbose: true });
			if (ms.length) dests[s] = ms.map(m => m.to);
		});
		return dests;
	};

	// Make a move.
	this.move = options => this.chess.move(options);

	// Who is on turn? 'w' or 'b'?
	this.turnColor = () => this.chess.turnColor();

	// w => white, b => black.
	this.longColor = color => (color === 'w' ? 'white' : 'black');
}
