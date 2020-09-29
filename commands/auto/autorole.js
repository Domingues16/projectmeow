const discord = require('discord.js');
const db = require('quick.db');

module.exports = {
	name: 'autorole',
	run: async (client, message, args) => {
		let embedperm = new discord.MessageEmbed()
			.setColor('RANDOM')
			.setTitle(
				'É necessário a permissão de gerenciar cargos para usar esse comando.'
			);
		if (!message.member.hasPermission('MANAGE_ROLES')) {
			return message.channel.send(embedperm);
		}
		let embedcargo = new discord.MessageEmbed()
			.setColor('RANDOM')
			.setTitle('Qual será o cargo?');
		const cargo = message.mentions.roles.first();
		if (!cargo) {
			return message.channel.send(embedcargo);
		}
		let embedok = new discord.MessageEmbed()
			.setColor('RANDOM')
			.setTitle('Cargo configurado para novos membros:')
			.setDescription(cargo);
		let role = db.set(`cargo_${message.guild.id}`, cargo.id);
		return message.channel.send(embedok);
	}
};
