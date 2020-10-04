const { MessageAttachment } = require('discord.js');

module.exports = {
	name: 'servericon',
	run: async (client, message, args) => {
		const attachment = new MessageAttachment(
			message.guild.iconURL({ dynamic: 'gif', format: 'png', size: 1024 })
		);

		message.channel
			.send(`Ícone do servidor ${message.guild}:`, attachment)
			.then(msg => {
				msg.delete({ timeout: 20000 });
			});
	}
};
