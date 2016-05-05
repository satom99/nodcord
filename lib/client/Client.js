/*!
* Copyright(c) 2016 Santi 'AdamJames' T. <santitm99@github>
* MIT Licensed
*/
'use strict';

const constants = require('../constants/index');
const utils = require('../utils/index');
const EventsBased = require('../classes/EventsBased');

const Socket = require('./Socket');

class Client extends EventsBased {
	constructor(settings) {
		super();
		this.settings = (settings ? utils.merge(settings, constants.defaultSettings) : constants.defaultSettings);
		this.socket = new Socket(this);
	}
	// Auth
	login(config) {
		if (!config || (!config.token && !(config.email && config.password))) return;
		this.socket.token = config.token;
		if (!this.socket.token)
			api.request(
				{
					type: 'GET',
					path: constants.api.endPoints.LOGIN,
					data: {
						email: config.email,
						password: config.password,
					}
				},
				(error, response) => {
					if (error) return;
					this.socket.token = response.body.token;
					this.socket.connect();
				}
			);
		else this.socket.connect();
	}
}

module.exports = Client;