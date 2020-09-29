const { MessageAttachment } = require('discord.js');

module.exports = {
	name: 'avatar',
	run: async (client, message, args) => {
		const member = message.mentions.users.first() || message.author;
		const attachment = new MessageAttachment(member.displayAvatarURL({ dynamic: 'gif', format: 'png', size: 1024 })
		);
message.channel.startTyping(1);
message.channel.stopTyping(true);
		message.channel.send(`Avatar de ${member.tag}:`, attachment);
	}
};