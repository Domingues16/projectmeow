const Discord = require('discord.js');
module.exports = (client, guilda) => {
	let canal = client.channels.cache.get('755782399006343238');
	let embedaddguilda = new Discord.MessageEmbed()
		.setColor('RANDOM')
		.setTitle(
			`Fui adicionada no servidor ${guilda.name} (${guilda.id}) do usuário ${
				guilda.owner.user.tag
			} (${guilda.owner.user.id}) com ${guilda && guilda.memberCount} membros.`
		);
	canal.send(embedaddguilda);
};
