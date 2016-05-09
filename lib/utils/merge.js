/*!
* Copyright(c) 2016 Santi 'AdamJames' T. <santitm99@github>
* MIT Licensed
*/
'use strict';

module.exports = function(one, two) { // newValues, defaultValues
	if (typeof(one) != typeof(two)) return;
	if (typeof(one) == 'array') {
		let main = ((one.length > two.length) ? one : two);
		let second = ((one.length < two.length) ? one : two);
		for (let value of second)
			main.push(value);
		return main;
	} else if (typeof(one) == 'object') {
		for (let key in one)
			two[key] = one[key]
		return two;
	}
}