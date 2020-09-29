const { MessageEmbed } = require('discord.js');
const math = require('mathjs');

module.exports = {
	name: 'math',
	aliases: 'calculadora',
	category: 'fun',
	run: async (client, message, args) => {
		try {
			if (!args[0]) return message.channel.send('Me diga a equação.');

			const embed = new MessageEmbed()
				.setColor('RANDOM')
				.setTitle(`Resultado:`)
				.setDescription(math.evaluate(args.join(' ')))
				.setTimestamp();

			message.channel.send(embed);
		} catch (error) {
			message.channel
				.send(`Por favor, faça um equação válida. Tente novamente.`)
				.then(() => console.log(error));
		}
	}
};
