const { MessageEmbed } = require('discord.js');

module.exports = {
	name: 'invite',
	run: async (client, message, args) => {
	  let embed = new MessageEmbed()
			.setColor('#2E3135')
			.setTitle('💠 | Quer me adicionar no seu servidor?')
			.setDescription(`Me adicione no seu servidor clicando [aqui](https://discord.com/api/oauth2/authorize?client_id=${client.user.id}&permissions=8&scope=bot).\nClique [aqui](https://discord.gg/SekU3B2) para entrar no meu servidor de suporte.`);

		message.channel.send(embed);
	}
};
