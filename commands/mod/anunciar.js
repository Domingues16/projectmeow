const Discord = require('discord.js');
const db = require('quick.db');
const { default_prefix } = require('../../config.json');
module.exports = {
	name: 'anunciar',
	run: async (client, message, args) => {
		let prefix = db.get(`prefix_${message.guild.id}`);
		if (prefix === null) prefix = default_prefix;
		if (!message.member.hasPermission('ADMINISTRATOR'))
			return message.reply('Você não pode usar esse comando.');
		message.delete().catch();

		let splitarg = args.join(' ').split(' // ');
		let titulo = splitarg[0];
		let descricao = splitarg[1];

		if (!titulo) {
			message.reply(`use o formato ${prefix}anunciar <titulo> // <descricao>`);
			return;
		}

		if (!descricao) {
			message.channel.id(
				`use o formato ${prefix}anunciar <titulo> // <descricao>`
			);
			return;
		}

		let anuncio = new Discord.MessageEmbed()
			.setColor('RANDOM')
			.setTitle(titulo)
			.setDescription(descricao)
			.setFooter(`Anuncio feito por ${message.author.tag}`)
			.setTimestamp();

		message.channel.send(anuncio);
	}
};
