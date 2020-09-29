const discord = require('discord.js');
const db = require('quick.db');

module.exports = {
	name: 'jointxt',
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
			.setTitle('Qual será a descrição da mensagem de bem-vindo?');
		const txt = args.join(' ');
		if (!txt) {
			return message.channel.send(embedcargo);
		}
		let embedok = new discord.MessageEmbed()
			.setColor('RANDOM')
			.setTitle('Descricão da mensagem de bem-vindo configurada:')
			.setDescription(txt);
		let role = db.set(`jointxt_${message.guild.id}`, txt);
		return message.channel.send(embedok);
	}
};
