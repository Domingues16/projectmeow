const discord = require('discord.js');
const db = require('quick.db');

module.exports = {
	name: 'addmoney',
	category: 'economia',

	run: async (client, message, args) => {
		if (!['719141659614642197'].includes(message.author.id)) {
			return message.channel.send(
				`Apenas meu criador pode usar esse comando!!`
			);
		}

		const discord = require('discord.js');
		const db = require('quick.db');

		const member = message.mentions.members.first();
		let money = db.fetch(`money_${message.author.id}`);

		if (!member) return message.channel.send('Você precisa mencionar alguém!!');
		if (!args[1]) return message.channel.send('Quanto você vai doar??');

		return message.channel
			.send(`Você quer realmente adicionar ${args[1]} won's para ${member}??`)
			.then(msg => {
				msg.react('👍');

				let filtro = (reaction, usuario) =>
					reaction.emoji.name === '👍' && usuario.id === message.author.id;
				let coletor = msg.createReactionCollector(filtro, { max: 1 });

				coletor.on('collect', cp => {
					msg.delete();
					cp.remove(message.author.id);
					message.channel.send('Pagamento efetuado com sucesso!!');

					db.add(`money_${member.id}`, args[1]);
				});
			});
	}
};
