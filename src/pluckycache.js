const {Task} = require('plucky-pipeliner');

class SetCache extends Task {
	constructor(args) {
		super();
		this.cache = args.cache;
	}

	handler(state, next) {
		this.cache = Object.assign(this.cache, state.params);
		next(0, {cache: this.cache})
	}
}

class GetCache extends Task {
	constructor(args) {
		super();
		this.cache = args.cache;
	}
	

	handler(state, next) {
		const list = state.params.cacheKeys;
		const result = {};
		list.forEach((key) => {
			result[key] = this.cache[key];
		});
		next(0, {cache: result });
	}
}

class PluckyCache {
	constructor() {
		let cache = {};
		this.set = new SetCache({cache});
		this.get = new GetCache({cache});
	}
}

module.exports = PluckyCache;