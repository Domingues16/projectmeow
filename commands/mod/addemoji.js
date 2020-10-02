const Discord = require('discord.js');
const { parse } = require('twemoji-parser');

module.exports = {
	name: 'addemoji',
	run: async (client, message, args) => {
		if (!message.member.hasPermission(`MANAGE_EMOJIS`)) {
			return message.channel.send(
				`Você não tem permissão para usar este comando! Gerenciar Emojis`
			);
		}

		const emoji = args[0];
		if (!emoji) return message.channel.send(`Por favor, dê-me um emoji!`);

		let customemoji = Discord.Util.parseEmoji(emoji);

		if (customemoji.id) {
			const Link = `https://cdn.discordapp.com/emojis/${customemoji.id}.${
				customemoji.animated ? 'gif' : 'png'
			}`;
			const name = args.slice(1).join(' ');
			message.guild.emojis.create(
				`${Link}`,
				`${name || `${customemoji.name}`}`
			);
			const Added = new Discord.MessageEmbed()
				.setTitle(`Emoji adicionado.`)
				.setColor('RANDOM')
				.setDescription(
					`Emoji adicionado! | Nome: ${name ||
						`${customemoji.name}`} | Visualização: [Clique aqui](${Link}).`
				);
			return message.channel.send(Added);
		} else {
			let CheckEmoji = parse(emoji, { assetType: 'png' });
			if (!CheckEmoji[0]) return message.channel.send(`Dê-me um Emoji válido!`);
			message.channel.send(
				`Você pode usar o emoji normal sem adicionar no servidor!`
			);
		}
	}
};
