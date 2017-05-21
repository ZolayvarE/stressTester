const rp = require('request-promise');

module.exports = function (url) {
  return rp({
  	timeout: 10000,
  	url: url
  })
};
