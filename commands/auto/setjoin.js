const discord = require('discord.js');
const db = require('quick.db');

module.exports = {
	name: 'setjoin',
	run: async (client, message, args) => {
		let embedperm = new discord.MessageEmbed()
			.setColor('RANDOM')
			.setTitle(
				'É necessário a permissão de gerenciar cargos para usar esse comando.'
			);
		if (!message.member.hasPermission('MANAGE_ROLES')) {
			return message.channel.send(embedperm);
		}
		let embedchannel = new discord.MessageEmbed()
			.setColor('RANDOM')
			.setTitle('Qual será o canal para mensagens de bem-vindo?');
		let channel = message.mentions.channels.first()
		if (!channel) {
			return message.channel.send(embedchannel);
		}
		let embedok = new discord.MessageEmbed()
			.setColor('RANDOM')
			.setTitle('Canal configurado para mensagens de bem-vindo:')
			.setDescription(channel);
		let canal = db.set(`entrada_${message.guild.id}`, channel.id);
		return message.channel.send(embedok);
	}
};
