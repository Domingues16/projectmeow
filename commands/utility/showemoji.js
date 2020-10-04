const { MessageAttachment } = require('discord.js');
const { parse } = require('twemoji-parser');
const Discord = require('discord.js');
module.exports = {
	name: 'showemoji',
	aliases: ['bigemoji'],
	run: async (client, message, args) => {
		const emoji = args[0];
		if (!emoji)
			return message.channel.send(`Por favor, dê-me um emoji!`).then(msg => {
				msg.delete({ timeout: 5000 });
			});
		let customemoji = Discord.Util.parseEmoji(emoji);
		if (customemoji.id) {
			const Link = `https://cdn.discordapp.com/emojis/${customemoji.id}.${
				customemoji.animated ? 'gif' : 'png'
			}`;
			const a = new MessageAttachment(Link);
			return message.channel.send('Emoji:', a).then(msg => {
				msg.delete({ timeout: 20000 });
			});
		} else {
			let CheckEmoji = parse(emoji, { assetType: 'png' });
			if (!CheckEmoji[0])
				return message.channel.send(`Mande um emoji válido!`).then(msg => {
					msg.delete({ timeout: 5000 });
				});
			message.channel
				.send(`Você pode usar o emoji normal sem adicionar no servidor!`)
				.then(msg => {
					msg.delete({ timeout: 5000 });
				});
		}
	}
};
