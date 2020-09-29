const { MessageEmbed } = require('discord.js');

module.exports = {
	name: 'servers',
	run: async (client, message, args) => {
		if (
			![
				'743859105365622906',
				'719141659614642197',
				'663013214438817822'
			].includes(message.author.id)
		) {
			return message.channel.send('Apenas meu criador pode usar esse comando.');
		}
		let embed = new MessageEmbed()
			.setTitle('**Servidores onde eu estou:**')
			.setDescription(
				client.guilds.cache.map(r => r.name)
			)
			.setFooter('Servidores no total: ' + client.guilds.cache.size)
			.setColor('RANDOM');

		message.channel.send(embed);
	}
};
