const discord = require('discord.js');
const db = require('quick.db');
module.exports = {
	name: 'demissão',
	run: async (client, message, args) => {
		let saldo = await db.get(`money_${message.author.id}`);

		if (saldo < 2000)
			return message.reply(
				'para pedir demissão, você necessita de 2000 moedas.'
			);
		let emprego = await db.get(`emprego_${message.author.id}`);
		if (emprego === null) {
			message.channel.send('Você não possui um emprego para demissão...');
		}
		if (emprego === 1) {
			message.channel
				.send(
					`Olá ${
						message.author.username
					}, você realmente quer se demitir do emprego de policial? Serão retirados 2000 moedas da sua conta após a demissão.`
				)
				.then(msg => {
					msg.react('✅').then(() => msg.react('❌'));

					const filter = (reaction, user) => {
						return (
							['✅', '❌'].includes(reaction.emoji.name) &&
							user.id === message.author.id
						);
					};

					msg.awaitReactions(filter, { max: 1 }).then(collected => {
						const reaction = collected.first();

						if (reaction.emoji.name === '✅') {
							message.reply('você foi demitido.');

							db.delete(`emprego_${message.author.id}`, 1);

							db.subtract(`money_${message.author.id}`, 2000);
						} else {
							message.reply('cancelado com sucesso.');
						}
					});
				});
		}
		if (emprego === 2) {
			message.channel
				.send(
					`Olá ${
						message.author.username
					}, você quer se demitir do emprego de paramédico? Serão retirados 2000 moedas da sua conta após a demissão.`
				)
				.then(msg => {
					msg.react('✅').then(() => msg.react('❌'));

					const filter = (reaction, user) => {
						return (
							['✅', '❌'].includes(reaction.emoji.name) &&
							user.id === message.author.id
						);
					};

					msg.awaitReactions(filter, { max: 1 }).then(collected => {
						const reaction = collected.first();

						if (reaction.emoji.name === '✅') {
							message.reply('você foi demitido.');
							db.delete(`emprego_${message.author.id}`, 2);
							db.subtract(`dinheiro_${message.author.id}`, 2000);
						} else {
							message.reply('cancelado com sucesso.');
						}
					});
				});
		}
		if (emprego === 3) {
			message.channel
				.send(
					`Olá ${
						message.author.username
					}, você quer se demitir do emprego de bombeiro? Serão retirados 2000 moedas da sua conta após a demissão.`
				)
				.then(msg => {
					msg.react('✅').then(() => msg.react('❌'));

					const filter = (reaction, user) => {
						return (
							['✅', '❌'].includes(reaction.emoji.name) &&
							user.id === message.author.id
						);
					};

					msg.awaitReactions(filter, { max: 1 }).then(collected => {
						const reaction = collected.first();

						if (reaction.emoji.name === '✅') {
							message.reply('você foi demitido');
							db.delete(`emprego_${message.author.id}`, 3);
							db.subtract(`dinheiro_${message.author.id}`, 2000);
						} else {
							message.reply('cancelado com sucesso.');
						}
					});
				});
		}
	}
};
