const discord = require('discord.js');

module.exports = {
	name: 'mute',
	run: async (client, message, args) => {
		if (!message.member.hasPermission('MANAGE_ROLES')) {
			return message.channel.send('Você não tem permissão suficiente.');
		}

		if (!message.guild.me.hasPermission('MANAGE_ROLES')) {
			return message.channel.send(
				'Eu não tenho permissão para mutar esse cargo.'
			);
		}

		const user = message.mentions.members.first();

		if (!user) {
			return message.channel.send('Por favor, mencione um membro para mutar.');
		}

		if (user.id === message.author.id) {
			return message.channel.send('Eu não posso mutar você.');
		}

		let muterole = message.guild.roles.cache.find(x => x.name === 'Silenciado');

		if (!muterole) {
			return message.channel.send('Esse servidor não possui o cargo: `Silenciado`.');
		}

		if (user.roles.cache.has(muterole)) {
			return message.channel.send('Diga o usuário a ser mutado.');
		}

		user.roles.add(muterole);

		await message.channel.send(
			`Você mutou **${
				message.mentions.users.first().username
			}**.`
		);

		user.send(
			`Você foi mutado pelo **${message.guild.name}**.`
		);
	}
};
