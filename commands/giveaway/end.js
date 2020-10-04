const ms = require('ms');

module.exports = {
	name: 'end',
	run: async (client, message, args) => {
		message.react('761605475233431594');
		if (
			!message.member.hasPermission('MANAGE_MESSAGES') &&
			!message.member.roles.cache.some(r => r.name === 'Giveaways')
		) {
			return message.channel
				.send(
					':x: Você precisa ter permissões de gerenciamento de mensagens para rolar novamente os brindes.'
				)
				.then(msg => {
					msg.delete({ timeout: 5000 });
				});
		}
		if (!args[0]) {
			return message.channel
				.send(':x: Você tem que especificar um ID de mensagem válido!')
				.then(msg => {
					msg.delete({ timeout: 5000 });
				});
		}
		let giveaway =
			(client.giveawaysManager &&
				client.giveawaysManager.giveaways.find(
					g => g.prize === args.join(' ')
				)) ||
			(client.giveawaysManager &&
				client.giveawaysManager.giveaways.find(g => g.messageID === args[0]));
		if (!giveaway) {
			return message.channel
				.send('Incapaz de encontrar uma oferta para `' + args.join(' ') + '`.')
				.then(msg => {
					msg.delete({ timeout: 5000 });
				});
		}
		client.giveawaysManager
			.edit(giveaway.messageID, {
				setEndTimestamp: Date.now()
			})
			.then(() => {
				message.channel
					.send(
						'A oferta terminará em menos de ' +
							client.giveawaysManager.options.updateCountdownEvery / 1000 +
							' segundos...'
					)
					.then(msg => {
						msg.delete({ timeout: 5000 });
					});
			})
			.catch(e => {
				if (
					e
						.startsWith(
							`Giveaway with message ID ${giveaway.messageID} já terminou.`
						)
						.then(msg => {
							msg.delete({ timeout: 5000 });
						})
				) {
					message.channel.send('Este sorteio já acabou!').then(msg => {
						msg.delete({ timeout: 5000 });
					});
				} else {
					console.error(e);
					message.channel.send('Um erro ocorreu...').then(msg => {
						msg.delete({ timeout: 5000 });
					});
				}
			});
	}
};
