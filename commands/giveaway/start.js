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
				':x: Você precisa ter permissão para gerenciar mensagens para iniciar brindes.'
			);
		}
		let giveawayChannel = message.mentions.channels.first();
		// If no channel is mentionned
		if (!giveawayChannel) {
			return message.channel.send(
				':x: Você tem que mencionar um canal válido!'
			);
		}

		// Giveaway duration
		let giveawayDuration = args[1];
		// If the duration isn't valid
		if (!giveawayDuration || isNaN(ms(giveawayDuration))) {
			return message.channel.send(
				':x: Você tem que especificar uma duração válida!'
			);
		}

		// Number of winners
		let giveawayNumberWinners = args[2];
		// If the specified number of winners is not a number
		if (isNaN(giveawayNumberWinners) || parseInt(giveawayNumberWinners) <= 0) {
			return message.channel.send(
				':x: Você deve especificar um número válido de vencedores!'
			);
		}

		// Giveaway prize
		let giveawayPrize = args.slice(3).join(' ');
		// If no prize is specified
		if (!giveawayPrize) {
			return message.channel.send(
				':x: Você tem que especificar um prêmio válido!'
			);
		}

		// Start the giveaway
		client.giveawaysManager.start(giveawayChannel, {
			// The giveaway duration
			time: ms(giveawayDuration),
			// The giveaway prize
			prize: giveawayPrize,
			// The giveaway winner count
			winnerCount: giveawayNumberWinners,
			// Who hosts this giveaway
			hostedBy: client.config.hostedBy ? message.author : null,
			// Messages
			messages: {
				giveaway:
					(client.config.everyoneMention ? '@everyone\n\n' : '') +
					'🎉🎉 **GIVEAWAY** 🎉🎉',
				giveawayEnded:
					(client.config.everyoneMention ? '@everyone\n\n' : '') +
					'🎉🎉 **GIVEAWAY ENDED** 🎉🎉',
				timeRemaining: 'Tempo restante: **{duration}**!',
				inviteToParticipate:
					'Reaja com <a:sorteio:761605475233431594> para participar!',
				winMessage: 'Parabéns, {winners}! Você ganhou **{prize}**!',
				embedFooter: 'Giveaways',
				noWinner: 'Giveaway cancelado, sem participações válidas.',
				hostedBy: 'Hospedado por: {user}',
				winners: 'Ganhador(es)',
				endedAt: 'Termina em',
				units: {
					seconds: 'segundos',
					minutes: 'minutos',
					hours: 'horas',
					days: 'dias',
					pluralS: false // Not needed, because units end with a S so it will automatically removed if the unit value is lower than 2
				}
			}
		});

		message.channel.send(`Giveaway iniciado em ${giveawayChannel}!`);
	}
};
