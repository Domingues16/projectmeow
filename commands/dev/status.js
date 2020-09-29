const db = require('quick.db');
const discord = require('discord.js');

module.exports = {
	name: 'status',
	description: 'Change the bot status',
	usage: 'status <here>',
	category: 'owner',
	run: async (client, message, args) => {
		//OWNER ONLY COMMAND
		if (!message.author.id === '719141659614642197') {
			return message.channel.send('Apenas meu criador pode usar esse comando.');
		}
		//ARGUMENT
		if (!args.length) {
			return message.channel.send('Diga um status.');
		}

		db.set(`status`, args.join(' '));
		await message.channel.send('Status do bot atualizado.');
	}
};
