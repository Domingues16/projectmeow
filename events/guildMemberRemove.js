const db = require('quick.db');
const discord = require('discord.js');
module.exports = (client, member) => {
	let chx = db.get(`saida_${member.guild.id}`);

	if (chx === null) {
		return;
	}

	let embed1 = new discord.MessageEmbed()
		.setAuthor(member.user.username, member.user.avatarURL({ dynamic: true }))
		.setColor('RANDOM')
		.setTitle('Até mais!!')
		.addField(
			'Despedida',
			`Não sou muito boa de despedidas mas, até mais ${
				member.user.username
			} espero que volte um dia ` + ':cry:'
		)
		.addField(
			'Informações do usuário',
			`${member.user.tag} \n\`${member.id}\``
		);

	client.channels.cache.get(chx).send(embed1);
};
