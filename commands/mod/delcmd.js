const db = require('quick.db');

module.exports = {
	name: 'delcmd',
	usage: 'delcmd <cmd_name>',
	description: 'Delete the custom commannd',
	category: 'moderation',
	run: (client, message, args) => {
		if (!message.member.hasPermission('MANAGE_MESSAGES'))
			return message.channel.send(
				':x: Você precisa da permissão de `MANAGE_MESSAGES` para usar esse comando.'
			);
		let cmdname = args[0];

		if (!cmdname)
			return message.channel.send(
				':x: Forneça o nome do comando personalizado, `delcmd <cmd_name>`'
			);

		let database = db.get(`cmd_${message.guild.id}`);

		if (database) {
			let data = database.find(x => x.name === cmdname.toLowerCase());

			if (!data)
				return message.channel.send(
					':x: Incapaz de encontrar este comando personalizado.'
				);

			let value = database.indexOf(data);
			delete database[value];

			var filter = database.filter(x => {
				return x != null && x != '';
			});

			db.set(`cmd_${message.guild.id}`, filter);
			return message.channel.send(
				`O camando personalizado **${cmdname}** foi apagado neste servidor.`
			);
		} else {
			return message.channel.send(
				':x: Desculpe, mas não consigo encontrar esse comando.'
			);
		}
	}
};
