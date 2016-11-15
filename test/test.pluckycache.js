const Code = require('code');
const Lab = require('lab');
const lab = exports.lab = Lab.script();

const describe = lab.describe;
const it = lab.it;
const before = lab.before;
const after = lab.after;
const expect = Code.expect;

const PluckyCache = require('../src/pluckycache');

const noop = ()=>{};

describe('PluckyCache', ()=>{
	it('set the cache object and get the cache object', (done) => {
		const pluckyCache = new PluckyCache();
		pluckyCache.set.handler({params: {'foo': 'bar'}}, (code, value) => {
			pluckyCache.get.handler({params: {cacheKeys: ['foo']}}, (code, value) => {
				expect(value.cache.foo).to.be.equal('bar');
				expect(code).to.be.equal(0);
				done();
			});
		});
		
	});

	it('get the cache should return undefined', (done) => {
		const pluckyCache = new PluckyCache();
		pluckyCache.get.handler({params: {cacheKeys: ['foo']}}, (code, value) => {
			expect(value.cache.foo).to.be.equal(undefined);
			expect(code).to.be.equal(0);
			done();
		});
		
	});

});
