/*!
* Copyright(c) 2016 Santi 'AdamJames' T. <santitm99@github>
* MIT Licensed
*/
'use strict';

const zlib = require('zlib');
const WebSocket = require('ws');
const api = require('./api/api')

const constants = require('../constants/index')

class Socket {
	constructor(client) {
		this.client = client;
		this.settings = client.settings.socket;
		this.status = constants.status.IDLE;
		//
		client.on(
			constants.events.READY,
			(data) => this.timer = setInterval(
				() => this.socket.send(
					JSON.stringify(
						{
							'op': constants.OPcodes.HEARTBEAT,
							'd': this.sequence,
						}
					)
				),
				data.heartbeat_interval
			)
		);
	}
	//
	reconnect() {
		this.status = constants.status.RECONNECTING;
		this.connect();
	}
	connect() {
		if (!this.gateway)
			return api.request(
				{
					type: 'GET',
					path: 'gateway',
				},
				(response) => {
					if (response) {
						this.gateway = response.url;
						this.connect();
					}
				}
			);
		//
		let socket = this.socket = new WebSocket(this.gateway);
		socket.once(
			'open',
			() => {
				this.status = constants.status.CONNECTED;
				socket
					.once('close', (message) => {
						if (this.timer) clearInterval(this.timer);
						this.status = constants.status.IDLE;
						if (this.settings.autoReconnect) this.reconnect();
					})
					.once('error', (error) => console.log('socket error: '+error))
					// Incoming data handling
					.on('message', (data) => {
						data = ((data instanceof Buffer) ? zlib.inflateSync(data).toString() : data);
						if (!data) return;
						data = JSON.parse(data);
						if (!data) return;
						if (data.op == constants.OPcodes.DISPATCH) {
							this.sequence = data.s;
							this.client.dispatchEvent(data.t, data.d);
						}
					})
					// Auth
					.send(
						JSON.stringify(
							{
								op: constants.OPcodes.IDENTIFY,
								d: {
									token: this.token,
									properties: {
										'$os': constants.package.name,
										'$device': constants.package.name,
										'$browser': '',
										'$referrer': '',
										'$referring_domain': constants.package.repository.url,
									},
									compress: this.settings.compress,
									large_threshold: this.settings.large_threshold,
								}
							}
						)
					)
				;
			}
		)
	}
	// Out
	send (data) {
		if (this.status == constants.status.CONNECTED)
			this.socket.send(JSON.stringify(data));
	}
}

module.exports = Socket;