import username from 'username';
import fullname from 'fullname';

export default function (options) {
	this.color = 'w';
	this.name = options.name;

	if (options.color === 'b') {
		this.color = 'b';
	}

	this.init = (options) => {
		return new Promise((resolve) => {
			fullname().then((name) => {
				this.name = name;
				resolve();
			})
			.catch(() => {
				username.then((name) => {
					this.name = name;
					resolve();
				})
				.catch(() => {
					if (this.color === 'w') {
						this.name = 'White';
					} else {
						this.name = 'Black';
					}
					resolve();
				});
			});
		});
	};

	// No need.
	this.requestMove = () => {};
}
