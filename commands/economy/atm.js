const Discord = require('discord.js');
const db = require('quick.db');

module.exports = {
	name: 'atm',
	aliases: ['bal', 'bank', 'balance', 'banco', 'carteira'],
	run: async (client, message, args) => {
		const member = message.mentions.users.first() || message.author;

		let money = db.get(`money_${member.id}`);
		if (money === null) money = '0';

		const embed = new Discord.MessageEmbed()
			.setColor('RANDOM')
			.setTitle(`Conta bancaria de ${member.username}:`)
			.setDescription(`${money} moedas.`)
			.setThumbnail(
				member.displayAvatarURL({ dynamic: 'gif', format: 'png', size: 1024 })
			);

		message.channel.send(embed);
	}
};
