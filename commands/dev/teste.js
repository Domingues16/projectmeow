const discord = require('discord.js');

module.exports = {
	name: 'teste',
	run: async (client, message, args) => {
const user = message.mentions.users.first() || message.author;
		const Corrida = '<@' + message.author.id + '>';
		const corrida2 = ' <@' + user.id + '>';
		var falas = [
			' fez **200** metros 🏎️ .....',
			' fez **500** metros 🏎️ ...........',
			' fez **800** metros 🏎️ ..............',
			' fez **1000** metros 🏎️ .................',
			' fez **1500** metros 🏎️ ............................',
			'Explodiu 🔥 ',
			'Bateu e pegou fogo 🔥'
		];
		message.channel.send({
			embed: {
				title: '🏎️ Corrida',
				description:
					' O ' +
					Corrida +
					' e' +
					corrida2 +
					' **estao disputando uma corrida**',
				color: '65535',

				fields: [
					{
						name: 'Sobre a corrida:',
						value:
							'O ' +
							Corrida +
							'\n' +
							falas[Math.round(Math.random() * falas.length)] +
							'\n' +
							'O ' +
							corrida2 +
							'\n' +
							falas[Math.round(Math.random() * falas.length)],
						inline: false
					}
				]
			}
		});
	}
};
