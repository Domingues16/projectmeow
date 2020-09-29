const Discord = require('discord.js');

module.exports = {
	name: 'listban',
	run: async (client, message, args) => {
		let banperm = new Discord.MessageEmbed()
			.setColor('RANDOM')
			.setAuthor('Você não tem permissão de "banir membros" para poder ver a lista de banimentos.');
		let baninfo = new Discord.MessageEmbed()
			.setColor('RANDOM')
			.setAuthor(
				'Você quer receber a lista de bans? Reaja com ✅ para confirmar o envio.'
			);
		let bansend = new Discord.MessageEmbed()
			.setColor('RANDOM')
			.setAuthor(
				'Eu enviei a lista de banimentos no seu privado. (Caso não receba nenhuma mensagem no privado significa que não tem ninguém banido, ou então seu privado está bloqueado.)'
			);
		let bancancel = new Discord.MessageEmbed()
			.setColor('RANDOM')
			.setAuthor('O envio foi cancelado.');
		if (!message.member.hasPermission('BAN_MEMBERS'))
			return message.channel.send(banperm);
		try {
			let output = '';
			let i = 0;

			message.channel.send(baninfo).then(async msg => {
				await msg.react('✅');
				await msg.react('⏹');
				const filtro = (reaction, user) =>
					['✅', '⏹'].includes(reaction.emoji.name) &&
					user.id === message.author.id;
				const coletor = msg.createReactionCollector(filtro);

				coletor.on('collect', r => {
					switch (r.emoji.name) {
						case '✅':
							msg.reactions.removeAll;
							message.guild.fetchBans().then(async bans => {
								message.channel.send(bansend);
								bans.forEach(async ban => {
									i++;
									let bandm = new Discord.MessageEmbed()
										.setColor('RANDOM')
										.setAuthor(
											`Nome: ${ban.user.username}\nID: ${ban.user.id}\nBot: ${
												ban.user.bot
											}`
										);
									await message.author.send(bandm);
								});
							});
							break;
						case '⏹':
							msg.reactions.removeAll;
							msg.delete().then(message.channel.send(bancancel));
							break;
					}
				});
			});
		} catch (err) {
			message.channel.send('Um erro aconteceu! \n' + err).catch();
		}
	}
};
