/*!
* Copyright(c) 2016 Santi 'AdamJames' T. <santitm99@github>
* MIT Licensed
*/
'use strict';

const constants = require('../../constants/index');

const superagent = require('superagent');

const api =
{
	request: function(config, callback) {
		if (!config || !config.path) return;
		callback = callback || (() => {});
		//
		let type = (config.type || 'GET').toLowerCase();
		superagent[type](constants.api.base+'/'+config.path)
			.set('User-Agent', constants.package.name)
			.set('authorization', (config.token || null))
			[((type == 'get') ? 'query' : 'send')](config.data)
			.end((error, response) => callback(response.body)) // error handling!
		;
	}
}

module.exports = api;