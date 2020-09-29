const discord = require('discord.js');
const db = require('quick.db');
const ms = require('parse-ms');

module.exports = {
	name: 'daily',
	aliases: ['diario'],
	run: async (client, message, args) => {
		let amount = Math.floor(Math.random() * 1500 + 500);
		let timeout = 86400000;

		let daily = db.fetch(`daily_${message.author.id}`);
		if (daily !== null && timeout - (Date.now() - daily) > 0) {
			let time = ms(timeout - (Date.now() - daily));

			let esperar = new discord.MessageEmbed()
				.setColor('RANDOM')
				.setTitle(
					':alarm_clock: | ' +
						`Você já coletou o seu daily hoje tente novamente em ${
							time.hours
						}h ${time.minutes}m ${time.seconds}s`
				);
			message.channel.send(esperar);
		} else {
			let receber = new discord.MessageEmbed()
				.setColor('RANDOM')
				.setTitle(
					':date: | ' + `No daily de hoje você ganhou ${amount} moedas.`
				);
			message.channel.send(receber);
			db.add(`money_${message.author.id}`, amount);
			db.set(`daily_${message.author.id}`, Date.now());
		}
	}
};
