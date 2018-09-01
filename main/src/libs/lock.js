export default class Lock {
	constructor() {
		this.acquired = false;
		this._callbacks = [];
	}

	// Acquire the lock
	async acquire() {
		// If the lock is not acquired, we can acquire it
		if(!this.acquired) {
			this.acquired = true;
			return;
		}

		// Otherwise, wait till it's released
		return await new Promise(resolve => {
			this._callbacks.push(resolve);
		});
	}

	// Release the lock
	release() {
		this._callbacks.forEach(callback => {
			setTimeout(callback, 0);
		});
		this._callbacks = [];
	}
}