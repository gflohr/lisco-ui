import EventEmitter from 'events';

export default class WorkerConnection extends EventEmitter {
	constructor(path) {
		super();
		this.worker = new Worker(path);
		this.worker.addEventListener('message', (ev) => {
			this.onmessage(ev.data);
		});
	}
		
	postMessage(message) {
		this.worker.postMessage(message);
	}

	quit() {
		this.worker.terminate();
	}
}
