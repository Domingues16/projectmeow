const discord = require('discord.js');

module.exports = {
	name: 'unmute',
	run: async (client, message, args) => {
		if (!message.member.hasPermission('MANAGE_ROLES')) {
			return message.channel.send('Você não tem permissão suficiente.');
		}

		if (!message.guild.me.hasPermission('MANAGE_ROLES')) {
			return message.channel.send(
				'Eu não tenho permissão para desmutar esse cargo.'
			);
		}

		const user = message.mentions.members.first();

		if (!user) {
			return message.channel.send('Por favor, mencione um membro para desmutar.');
		}

		if (user.id === message.author.id) {
			return message.channel.send('Eu não posso desmutar você.');
		}

		let muterole = message.guild.roles.cache.find(x => x.name === 'Silenciado');

		if (!muterole) {
			return message.channel.send('Esse servidor não possui o cargo: `Silenciado`.');
		}

		if (user.roles.cache.has(muterole)) {
			return message.channel.send('Diga o usuário a ser desmutado.');
		}

		user.roles.remove(muterole);

		await message.channel.send(`Você desmutou **${
				message.mentions.users.first().username
			}**.`
		);

		user.send(
			`Você foi desmutado pelo **${message.guild.name}**.`
		);
	}
};
