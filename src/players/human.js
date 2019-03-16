import username from 'username';
import fullname from 'fullname';

export default function(options) {
	if (options === undefined) options = {};

	this.color = 'w';
	this.name = 'White';

	if (options.color === 'b') {
		this.color = 'b';
		this.name = 'Black';
	}

	fullname().then(name => this.name = name)
			  .catch(username.sync.then(name => this.name = name));

	// No need.
	this.startPlaying() = () => {};

	// No need.
	this.requestMove() = () => {};
};
