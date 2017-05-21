const request = require('request-promise');


const isObject = ref => {
	if (!(typeof ref === 'object')) {
		return false
	}
	if (Array.isArray(ref)) {
		return false;
	}
	return true;
};

const clear = a => {
	for (var i = 0; i < 100; i++) {
		console.log('\n');
	}
};

const report = (results, interval) => {
	clear();
	console.log('Failed:', results.failed);
	console.log('Total:', results.total);
};

const stress = opt => {
	if (!isObject(opt)) {
		throw new Error('TypeError: Argument must be an object')
	}
	let timeout = opt.timeout || 10000;
	let volume = opt.requests || 1;
	let time = opt.time || 50;
	let between = Math.floor(time / volume);
	let url = opt.url;
	let sent = 0;
	let results = {};

	results.total = 0;
	results.failed = 0;
	
	interval = setInterval(arg => {
		request({
			url: url,
			timeout: timeout
		}).then(res => {
			results.total++;
			report(results);
		}).catch(err => {
			results.failed++;
			results.total++;
			report(results);
		});

		sent++;
		if (sent >= volume) {
			clearInterval(interval);
		}
	}, between);

	report(results);
};

module.exports = stress;




