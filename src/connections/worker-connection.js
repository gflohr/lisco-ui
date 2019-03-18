import EventEmitter from 'events';

export default class WorkerConnection extends EventEmitter {
	constructor(path) {
		super();
		this.worker = new Worker(path);
		this.worker.addEventListener('message', (ev) => {
			console.log("received message: " + ev.data);
			this.onmessage(ev.data);
		});
	}
		
	postMessage(message) {
		console.log("posting message " + message);
		this.worker.postMessage(message);
	}

	quit() {
		this.worker.terminate();
	}
}
