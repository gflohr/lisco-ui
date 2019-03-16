export default function(moves, base, increment) {
	if (base <= 0) {
		throw "Base time must be a positive integer";
	}

	this.moves_per_tc = moves;
	this.base = base;
	this.increment = increment;
	this.moves = 0;
	this.timeLeft = base;
	this.started = undefined;

	this.currentTimeLeft = function currentTimeLeft() {
		let timeLeft = this.timeLeft;

		if (this.started !== undefined) {
			timeLeft -= (performance.now() - this.started);
		}

		return timeLeft;
	};

	this.start = function start() {
		this.started = performance.now();
	};

	this.stop = function stop() {
		const now = performance.now();

		++this.moves;
		if (this.started !== undefined) {
			this.timeLeft -= (now - this.started);
		}

		this.started = undefined;

		if (this.move_per_tc > 0) {
			if (0 === (this.moves % this.moves_per_tc))
				this.timeLeft += this.base;
		}

		if (this.increment > 0) {
			this.timeLeft += increment;
		}
	}

};
