var nodcord = require('nodcord');
var bot = new nodcord();

bot.on('message', (message) => console.log(message.author.username+': '+message.content));

bot.login({
	token: '',
	/*email: '',
	password: '',*/
});