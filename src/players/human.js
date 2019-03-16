import username from 'username';
import fullname from 'fullname';

export default function (options) {
	this.color = 'w';
	this.name = 'White';

	if (options.color === 'b') {
		this.color = 'b';
		this.name = 'Black';
	}

	fullname().then((name) => {
		this.name = name;
	})
		.catch(() => {
			username.then((name) => {
				this.name = name;
			});
		});

	// No need.
	this.requestMove = () => {};
}
