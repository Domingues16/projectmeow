const discord = require('discord.js');

module.exports = {
	name: 'kick',
	aliases: 'expulsar',
	run: async (client, message, args) => {
	  if (!message.member.hasPermission('KICK_MEMBERS')) {
			return message.channel.send('Você não tem permissão suficiente.');
		}
		const user = message.mentions.users.first();
		const member = message.guild.member(user);
		let msg1 = new discord.MessageEmbed()
			.setColor('RANDOM')
			.setTitle('Motivo opcional que será exibido nos registros de auditoria');

		let msg3 = new discord.MessageEmbed()
			.setColor('RANDOM')
			.setTitle('Não consegui expulsar o membro.');
		let msg4 = new discord.MessageEmbed()
			.setColor('RANDOM')
			.setTitle('Esse usuário não está neste servidor.');
		let msg5 = new discord.MessageEmbed()
			.setColor('RANDOM')
			.setTitle('Você não mencionou o usuário para expulsar.');
		if (user) {
			if (member) {
				member
					.kick(msg1)
					.then(() => {
						let msg2 = new discord.MessageEmbed()
							.setColor('RANDOM')
							.setTitle(`${user.tag} foi expulso com sucesso.`);
						message.reply(msg2);
					})
					.catch(err => {
						message.reply(msg3);
						console.error(err);
					});
			} else {
				message.reply(msg4);
			}
		} else {
			message.reply(msg5);
		}
	}
};
