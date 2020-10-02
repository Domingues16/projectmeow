const ms = require('ms');

module.exports = {
	name: 'sorteio',
	run: async (client, message, args) => {
		// If the member doesn't have enough permissions
		if (
			!message.member.hasPermission('MANAGE_MESSAGES') &&
			!message.member.roles.cache.some(r => r.name === 'Giveaways')
		) {
			return message.channel.send(
				':x: Você precisa ter permissões de gerenciamento de mensagens para rolar novamente os brindes.'
			);
		}

		// If no message ID or giveaway name is specified
		if (!args[0]) {
			return message.channel.send(
				':x: Você tem que especificar um ID de mensagem válido!'
			);
		}

		// try to found the giveaway with prize then with ID
		let giveaway =
			// Search with giveaway prize
			(client.giveawaysManager &&
				client.giveawaysManager.giveaways.find(
					g => g.prize === args.join(' ')
				)) ||
			// Search with giveaway ID
			client.giveawaysManager && client.giveawaysManager.giveaways.find(g => g.messageID === args[0]);

		// If no giveaway was found
		if (!giveaway) {
			return message.channel.send(
				'Incapaz de encontrar uma oferta para `' + args.join(' ') + '`.'
			);
		}

		// Edit the giveaway
		client.giveawaysManager
			.edit(giveaway.messageID, {
				setEndTimestamp: Date.now()
			})
			// Success message
			.then(() => {
				// Success message
				message.channel.send(
					'A oferta terminará em menos de ' +
						client.giveawaysManager.options.updateCountdownEvery / 1000 +
						' segundos...'
				);
			})
			.catch(e => {
				if (
					e.startsWith(
						`Giveaway with message ID ${giveaway.messageID} já terminou.`
					)
				) {
					message.channel.send('Este sorteio já acabou!');
				} else {
					console.error(e);
					message.channel.send('Um erro ocorreu...');
				}
			});
	}
};
