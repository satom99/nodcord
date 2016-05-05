/*!
* Copyright(c) 2016 Santi 'AdamJames' T. <santitm99@github>
* MIT Licensed
*/
'use strict';

class EventsBased {
	constructor() {
		this.__eventHandlers = []
	}
	once(name, callback) {
		this.on(name, callback, true)
	}
	on(name, callback, once) {
		this.__eventHandlers.push(
			{
				once: once,
				name: name,
				callback: callback,
			}
		)
	}
	dispatchEvent(name, data) {
		for (let handler of this.__eventHandlers)
			if (handler.name == name) {
				if (handler.once) this.__eventHandlers.splice(this.__eventHandlers.indexOf(handler), 1)
				handler.callback(data)
			}
	}
}

module.exports = EventsBased;