const discord = require('discord.js');
const db = require('quick.db');

module.exports = {
	name: 'flipcoinbet',
	category: 'economia',
	aliases: ['apostar', 'flip'],
	run: async (client, message, args) => {
		const member = message.mentions.users.first();
		if (!member)
			return message.channel.send('Com quem você quer fazer a aposta?!');
		if (member.id === client.user.id)
			return message.channel.send('eu não faço apostas.');
		if (message.content.includes('-')) return message.channel.send('Não abusu.');
		if (member.id === message.author.id)
			return message.channel.send(
				'Como você vai fazer uma aposta com sigo mesmo isso, no final das contas você venceria não é?!'
			);
		if (!args[1]) return message.channel.send('Qual a quantia da aposta?');
		if (isNaN(args[1])) return message.channel.send('Número.');

		let aaa = db.get(`money_${message.author.id}`);
		if (aaa < args[1])
			return message.channel.send(
				'Você não possui a quantia suficiente para fazer a aposta.'
			);

		let bbb = db.get(`money_${member.id}`);
		if (bbb < args[1])
			return message.channel.send(
				`${member} não tem essa quantia para a aposta.`
			);

		message.channel
			.send(
				`${member} , ${message.author} quer fazer uma aposta de ${
					args[1]
				} moedas com você. Aceita a aposta?`
			)
			.then(msg => {
				msg.react('👍');

				let filtro = (reaction, usuario) =>
					reaction.emoji.name === '👍' && usuario.id === member.id;
				let coletor = msg.createReactionCollector(filtro, { max: 1 });

				coletor.on('collect', cp => {
					msg.delete();
					let ccc = Math.floor(Math.random() * (2 - 1) + 1);
					if (ccc === 5) {
						message.channel.send(
							`${message.author} ganhou ${
								args[1]
							} Won's financiados por ${member}`
						);
						db.add(`money_${message.author.id}`, args[1]);
						db.subtract(`money_${member.id}`, args[1]);
					} else {
						message.channel.send(
							`${member} ganhou ${args[1]} Won's financiados por ${
								message.author
							}`
						);
						db.add(`money_${member.id}`, args[1]);
						db.subtract(`money_${message.author.id}`, args[1]);
					}
				});
			});
	}
};
