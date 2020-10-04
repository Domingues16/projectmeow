const discord = require('discord.js');
const db = require('quick.db');
const { default_prefix } = require('../../config.json');
module.exports = {
	name: 'help',
	aliases: ['ajuda', 'comandos'],
	run: async (client, message, args) => {
		message.react('751850184471871609');
		let botprefix = db.get(`prefix_${message.guild.id}`);
		if (botprefix === null) prefix = default_prefix;
		let ajuda = new discord.MessageEmbed()
			.setColor('#2E3135')
			.setTitle('Lista de comandos:')
			.setDescription('\n💡 `- Informação.`\n🛠 `- Moderação.`\n🧩 `- Diversão.`')
			.setThumbnail(
				'https://cdn.discordapp.com/attachments/745230104753471561/746696751553183794/images_36.jpeg'
			);
		message.channel.send(ajuda).then(msg => {
			msg.react('💡').then(r => {
				msg.react('🛠').then(r => {
					msg.react('🧩').then(r => {
						msg.react('🔄').then(r => {});
					});
				});
			});
			const infosFilter = (reaction, user) =>
				reaction.emoji.name === '💡' && user.id === message.author.id;
			const admFilter = (reaction, user) =>
				reaction.emoji.name === '🛠' && user.id === message.author.id;
			const funFilter = (reaction, user) =>
				reaction.emoji.name === '🧩' && user.id === message.author.id;
			const backFilter = (reaction, user) =>
				reaction.emoji.name === '🔄' && user.id === message.author.id;

			const infos = msg.createReactionCollector(infosFilter);
			const adm = msg.createReactionCollector(admFilter);
			const fun = msg.createReactionCollector(funFilter);
			const back = msg.createReactionCollector(backFilter);
			infos.on('collect', r2 => {
				ajuda
					.setTitle('Comandos de informação: ')
					.setDescription(
						'```help, bank, rank, profile, aboutme, anime, avatar, botinfo, imdb, invite, pokemon, ping, servericon, serverinfo, translate, uptime, userinfo, weather.```'
					);
				msg.edit(ajuda);
			});

			adm.on('collect', r2 => {
				ajuda
					.setTitle('Comandos de moderação:')
					.setDescription(
						'```addcmd, delcmd, anunciar, autorole, setwelcome, setbye, setwelcometext, setbyetext, setwelcomeimage, setbyeimage, ban, clear, giveaway, hidechannel, kick, listban, lock, mute, nickname, prefix, warn, warnings, resetwarns, say, snipe, suggest, unban, unlock, viewchannel.```'
					);
				msg.edit(ajuda);
			});

			fun.on('collect', r2 => {
				ajuda
					.setTitle('Comandos de diversão:')
					.setDescription(
						'```daily, casamento, apostar, pay, abraço, ascii, beijar, carinho, coinflip, hmm, meme, pergunta, roll, ship, soco, tapa, shop.```'
					);
				msg.edit(ajuda);

				back.on('collect', r2 => {
					ajuda
						.setTitle('Lista de comandos:')
						.setDescription(
							'\n💡 `- Informação.`\n🛠 `- Moderação.`\n🧩 `- Diversão.`'
						);
					msg.edit(ajuda);
				});
			});
			msg.delete({ timeout: 60000 });
		});
	}
};
