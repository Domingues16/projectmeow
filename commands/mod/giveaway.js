const { MessageEmbed } = require('discord.js');
const ms = require('ms');
module.exports = {
	name: 'giveaway',
	aliases: ['sorteio', 'sortear'],
	usage: '<time> <channel> <prize>',
	run: async (bot, message, args) => {
		if (!message.member.permissions.has('ADMINISTRATOR'))
			return message.channel.send(
				'Você não tem permissão para usar esse comando.'
			);
		if (!args[0])
			return message.channel.send(`
Você não especificou seu tempo!`);
		if (
			!args[0].endsWith('d') &&
			!args[0].endsWith('h') &&
			!args[0].endsWith('m')
		)
			return message.channel.send(
				`Você não usou a formatação correta para a hora!\nFormatações de tempo: d (dias), h (horas) e m (minutos).`
			);
		if (isNaN(args[0][0])) return message.channel.send(`Escolha um número!`);
		let channel = message.mentions.channels.first();
		if (!channel) return message.channel.send(`Você não selecionou o canal!`);
		let prize = args.slice(2).join(' ');
		if (!prize)
			return message.channel.send(`
Nenhum sorteio especificado.`);
		message.channel.send(`*Sorteio criado no canal ${channel}*.`);
		let Embed = new MessageEmbed()
			.setTitle(`Novo sorteio!`)
			.setDescription(
				`O usuário ${message.author} criou o sorteio **${prize}**.`
			)
			.setTimestamp(Date.now() + ms(args[0]))
			.setColor(`BLUE`);
		let m = await channel.send(Embed);
		m.react('🎉');
		setTimeout(() => {
			if (m.reactions.cache.get('🎉').count <= 1) {
				message.channel.send(`Reação: ${m.reactions.cache.get('🎉').count}`);
				return message.channel.send(
					`Nenhum usuário marcou a reação. Sendo assim, sorteio cancelado.`
				);
			}

			let winner = m.reactions.cache
				.get('🎉')
				.users.cache.filter(u => !u.bot)
				.random();
			channel.send(`O ganhador do sorteio **${prize}** é... ${winner}.`);
		}, ms(args[0]));
	}
};
