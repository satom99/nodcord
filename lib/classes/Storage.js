/*!
* Copyright(c) 2016 Santi 'AdamJames' T. <santitm99@github>
* MIT Licensed
*/
'use strict';

class Storage {
	constructor () {
		this.__data = [];
	}
	add (object) {
		if (this.__data.indexOf(object) == -1)
			this.__data.push(object)
	}
	get (key, value) {
		for (let object of this.__data)
			if (object[key] == value) // ===
				return object
	}
	update (current, fresh) {
		let index = this.__data.indexOf(object);
		if (index > -1)
			this.__data[index] = fresh;
	}
}

module.exports = Storage;