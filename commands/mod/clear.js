const discord = require('discord.js');
const db = require('quick.db');
const { default_prefix } = require('../../config.json');
module.exports = {
	name: 'clear',
	aliases: ['limpar'],
	run: async (client, message, args) => {
		let prefix = db.get(`prefix_${message.guild.id}`);
		if (prefix === null) prefix = default_prefix;
		let error = new discord.MessageEmbed()
			.setColor('#2E3135')
			.setTitle('__Central de ajuda do comando: clear.__')
			.setDescription(
				`:tools: Uso:\n> ${prefix}clear (número de 1 a 99)\n:green_book: Exemplo:\n> ${prefix}clear 85\n:bookmark: Permissão:\n> Gerenciar mensagens.`
			);

		if (!message.member.hasPermission('MANAGE_MESSAGES'))
			return message.channel.send(error);

		const deleteCount = parseInt(args[0], 10);
		if (!deleteCount || deleteCount < 1 || deleteCount > 99)
			return message.channel.send(error);
		if (isNaN(args[0])) return message.channel.send('Especifique o número.');
		const fetched = await message.channel.messages.fetch({
			limit: deleteCount + 1
		});
		let del = new discord.MessageEmbed()
			.setColor('RANDOM')
			.setTitle(`${args[0]} mensagens foram apagadas.`);
		message.channel.bulkDelete(fetched);
		message.channel
			.send(del)
			.then(msg => msg.delete({ timeout: 2000 }))
			.catch(error =>
				console.log(`Não foi possivel deletar as menssagens, Motivo: ${error}.`)
			);
	}
};
