const stressTest = require('./scripts/stressTest.js');
const fs = require('fs');

fs.readFile('./config.json', 'utf8', (err, config) => {
	config = JSON.parse(config);
	stressTest(config);
});







