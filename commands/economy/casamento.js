const discord = require('discord.js');
const db = require('quick.db');

module.exports = {
	name: 'casamento',
	aliases: ['casar', 'marry'],
	run: async (client, message, args) => {
		const member = message.mentions.users.first();
		let mencao = new discord.MessageEmbed()
			.setColor('RANDOM')
			.setTitle('Por favor mencione alguém para se casar.');
		if (!member) return message.channel.send(mencao);
		let bot = new discord.MessageEmbed()
			.setColor('RANDOM')
			.setTitle(
				'É... Não sei se meu pai me deixaria casar contigo. Acho melhor a gente só ser amigos. :)'
			);
		if (member.id === client.user.id) return message.channel.send(bot);
		let mesmo = new discord.MessageEmbed()
			.setColor('RANDOM')
			.setTitle('Você não pode se casar com você mesmo.');
		if (member.id === message.author.id) return message.channel.send(mesmo);

		let marry = await db.fetch(`marry_${message.author.id}`);
		let marry2 = await db.fetch(`marry_${member.id}`);

		if (marry === null) {
			let money = db.get(`money_${message.author.id}`);
			let money2 = db.get(`money_${member.id}`);
			let coin = new discord.MessageEmbed()
				.setColor('RANDOM')
				.setTitle(
					'Para se casar cada um precisa de 1000 moedas. Então juntem o valor necessário antes.'
				);
			if (money < 10) return message.channel.send(coin);
			if (money2 < 10) return message.channel.send(coin);
			let casar = new discord.MessageEmbed()
				.setColor('RANDOM')
				.setTitle('Ding, dong. Os sinos do casamento estão tocando!')
				.setDescription(`${member}, aceita se casar com ${message.author}?`)
				.setFooter('Clique na reação 💍 para se casar.');
			message.channel.send(casar).then(msg => {
				msg.react('💍');

				let reactions = (reaction, user) =>
					reaction.emoji.name === '💍' && user.id === member.id;

				let coletor = msg.createReactionCollector(reactions);

				coletor.on('collect', cp => {
					let casados = new discord.MessageEmbed()
						.setColor('RANDOM')
						.setTitle(
							'Olha que belo casal que se formou aqui. Espero que eles se mantenham assim.'
						);
					message.channel.send(casados);
					db.add(`marry_${message.author.id}`, member.id);
					db.add(`marry_${member.id}`, message.author.id);
					db.subtract(`money_${message.author.id}`, 10);
					db.subtract(`money_${member.id}`, 10);
				});
			});
		} else {
			return message.channel.send(
				'Hnn parece que você ja está casado não pode se casar'
			);
		}
		let unidos = new discord.MessageEmbed()
			.setColor('RANDOM')
			.setTitle('Parece que este usuário já está casado.');
		if (marry2 === null) {
			return;
		} else {
			message.channel.send(unidos);
		}
	}
};
