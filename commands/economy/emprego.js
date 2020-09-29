const Discord = require('discord.js');
const db = require('quick.db');

module.exports = {
	name: 'emprego',
	aliases: ['empregos', 'trabalho', 'trabalhos'],
	run: async (client, message, args) => {
		let emprego = await db.get(`emprego_${message.author.id}`);
		if (emprego === 1)
			return message.reply(
				`Você já é \`🚓 policial\`, caso queria escolher outro emprego, peça demissão.`
			);
		if (emprego === 2)
			return message.reply(
				`Você já é \`🚑 paramédico\`, caso queria escolher outro emprego, peça demissão.`
			);
		if (emprego === 3)
			return message.reply(
				`Você já é \`️🚒 bombeiro\`, para trocar deve pedir demissão.`
			);

		let embed = new Discord.MessageEmbed()
			.setTitle('Empregos:')
			.setDescription(
				'🚓 | `Policial`.\n🚑 | `Paramédico`.\n🚒 | `Bombeiro`.'
			)
			.setColor('RANDOM');

		message.channel.send(embed).then(msg => {
			msg.react('🚓').then(r => {
				msg.react('🚑').then(r => {
					msg.react('🚒').then(r => {});
				});
			});

			const filter = (reaction, user) => {
				return (
					['🚓', '🚑', '🚒'].includes(reaction.emoji.name) &&
					user.id === message.author.id
				);
			};
			msg
				.awaitReactions(filter, { max: 1, time: 60000, errors: ['time'] })
				.then(collected => {
					const reaction = collected.first();

					if (reaction.emoji.name === '🚓') {
						message.reply('você agora é 🚓 policial.');
						db.set(`emprego_${message.author.id}`, 1);
					}

					if (reaction.emoji.name === '🚑') {
						message.reply('você agora é 🚑 paramédico.');
						db.set(`emprego_${message.author.id}`, 2);
					}

					if (reaction.emoji.name === '🚒') {
						message.reply('você agora é 🚒 bombeiro.');
						db.set(`emprego_${message.author.id}`, 3);
					}
				})
				.catch(collected => {
					message.reply(
						'Tempo limite de escolha atingido. Use o comando de emprego novamente.'
					);
				});
		});
	}
};
