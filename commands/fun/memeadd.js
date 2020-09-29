const db = require('quick.db');

module.exports = {
	name: 'addmeme',
	run: (client, message, args) => {
		if (!message.member.hasPermission('MANAGE_MESSAGES'))
			return message.channel.send(
				':x: Você precisa da permissão de `MANAGE_MESSAGES` para usar esse comando.'
			);

		let meme = args[0];

		if (!meme) return message.channel.send('Manda o meme.');

		db.set('memefile', meme);

		return message.channel.send('Meme adicionado.');
	}
};
