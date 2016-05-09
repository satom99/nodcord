/*!
* Copyright(c) 2016 Santi 'AdamJames' T. <santitm99@github>
* MIT Licensed
*/
'use strict';

const constants = require('../constants/index');
const utils = require('../utils/index');
const classes = require('../classes/index');

const Socket = require('./Socket');

class Client extends classes.EventsBased {
	constructor(settings) {
		super();
		this.storage =
		{
			users: new classes.Storage(),
			servers: new classes.Storage(),
		};
		this.__initHandlers();
		this.settings = (settings ? utils.merge(settings, constants.defaultSettings) : constants.defaultSettings);
		this.socket = new Socket(this);
	}
	// Storage
	get user () {
		return this.storage.users.get('id', this.id);
	}
	get users () {
		return this.storage.users;
	}
	get servers () {
		return this.storage.servers;
	}
	// Core event handlers
	__initHandlers () {
		this.on(
			constants.events.READY,
			(data) => {
				this.id = data.user.id;
				this.users.add(data.user);
			}
		)
		delete this.__initHandlers;
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
	// Methods
	setStats (config) {
		if (typeof(config) != 'object') return;
		if (config.game)
			this.socket.send(
				{
					op: constants.OPcodes.STATUS_UPDATE,
					d: {
						idle_since: null,
						game: {
							name: config.game,
						},
					},
				}
			);
		if (config.username || config.avatar)
			api.request(
				{
					type: 'PATCH',
					path: 'users/@me',
					token: this.token,
					data: {
						username: (config.username || this.user.username),
						avatar: (config.avatar || this.user.avatar),
					}
				}
			)
	}
}

module.exports = Client;