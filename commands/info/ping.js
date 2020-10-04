const { MessageEmbed } = require('discord.js');

module.exports = {
	name: 'ping',
	aliases: ['latencia'],
	run: async (client, message, args) => {
		let vpsping = new Date() - message.createdAt + 'ms.';
		let apiping = Math.floor(client.ws.ping) + 'ms.';
		const embed = new MessageEmbed()
			.setColor('#2E3135')
			.setAuthor(`🏓 | Pong!\n📀 | VPS: ${vpsping}\n⚙ | API: ${apiping}`);

		message.channel.send(embed).then(msg => {
			msg.delete({ timeout: 5000 });
		});
	}
};
