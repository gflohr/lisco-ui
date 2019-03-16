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
	this.timer;
	this.started = undefined;

	this.updateTimeLeft = (noRestart) => {
		const now = performance.now();

		if (this.started !== undefined) {
			this.timeLeft -= (now - this.started);
		}

		this.started = now;

		if (noRestart) {
			this.timer = undefined;
		} else {
			let interval = this.timeLeft % 1000;
			if (interval < 0) {
				interval = 1000 + interval;
			}
			this.timer = setTimeout(this.updateTimeLeft, interval);
		}
	};

	this.start = function start() {
		this.updateTimeLeft(false);
	};

	this.stop = function stop() {
		this.updateTimeLeft(true);

		++this.moves;
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
