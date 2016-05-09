var nodcord = require('nodcord');
var bot = new nodcord();

bot.on('message_create', (message) => console.log(message.author.username+': '+message.content));

bot.on('ready', () => {
	bot.setStats(
		{
			game: '',
			/*username: '',
			avatar: '',*/
		}
	);
	console.log(bot.user.id);
});

bot.login({
	token: '',
	/*email: '',
	password: '',*/
});