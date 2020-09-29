module.exports = {
	name: 'pergunta',
	run: async (client, message, args) => {
		const member = message.author;
		var list = [
			'sim',
			'não',
			'claramente sim',
			'claramente não',
			'concerteza',
			'claro',
			'óbvio',
			'num sei',
			'aham',
			'acho melhor não dizer',
			'negativo',
			'positivo',
			'yep',
			'acho que não',
			'nop',
			'talvez',
			'é melhor não dizer isso agora',
			'também queria saber',
			'yes',
			'acho que sim',
			'uhum',
			'naum',
			'minhas informações dizem que não',
			'talvez sim',
			'minhas informações dizem qur sim',
			'talvez não',
			'certamente sim',
			'certamente não',
			'provavelmente sim',
			'provavelmente não',
			'claro que sim',
			'claro que não',
			'ser ou não ser, eis a questão'
		];

		var rand = list[Math.floor(Math.random() * list.length)];

		const a = args.join(' ');
    let onchannel = client.channels.cache.get('757561120448970803');
    onchannel.send(a)
		if (!a) {
			return message.channel.send('Faça uma pergunta.');
		}
		return message.reply(`${rand}.`);
	}
};
