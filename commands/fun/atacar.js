const { MessageAttachment } = require('discord.js');

module.exports = {
	name: 'atacar',
	aliases: 'attack',
	run: async (client, message, args) => {
		var list = [
			'',
			'',
			'',
			''
		];
		var rand = list[Math.floor(Math.random() * list.length)];
		let user =
			message.mentions.users.first() || client.users.cache.get(args[0]);
		if (!user) {
			return message.reply('mencione alguém.');
		}
		const attachment = new MessageAttachment(rand);
		message.channel.send(`${message.author} atacou ${user}.`, attachment);
	}
};
