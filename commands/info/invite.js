const { MessageEmbed } = require('discord.js');

module.exports = {
	name: 'invite',
	run: async (client, message, args) => {
		let embed = new MessageEmbed()
			.setColor('RANDOM')
			.setTitle('💠 | INVITE')
			.setDescription(
				`[Me adicione no seu servidor.](https://discord.com/api/oauth2/authorize?client_id=${
					client.user.id
				}&permissions=8&scope=bot)\n[Meu servidor de suporte.](https://discord.gg/M5M3gvV)`
			);

		message.channel.send(embed).then(msg => {
			msg.delete({ timeout: 10000 });
		});
	}
};
