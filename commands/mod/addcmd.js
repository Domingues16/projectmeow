const db = require('quick.db');

module.exports = {
	name: 'addcmd',
	usage: 'addcmd <cmd_name> <cmd_responce>',
	description: 'add guild custom commands',
	category: 'moderation',
	run: (client, message, args) => {
if (!message.member.hasPermission('MANAGE_MESSAGES'))
			return message.channel.send(
				':x: Você precisa da permissão de `MANAGE_MESSAGES` para usar esse comando.'
			);

		let cmdname = args[0];

		if (!cmdname)
			return message.channel.send(
				`:x: Forneça o nome e a resposta do comando personalizado, \`addcmd <nome_cmd> <resposta_cmd>\``
			);

		let cmdresponce = args.slice(1).join(' ');

		if (!cmdresponce)
			return message.channel.send(
				`:x: Forneça o nome e a resposta do comando personalizado, \`addcmd <nome_cmd> <resposta_cmd>\``
			);

		let database = db.get(`cmd_${message.guild.id}`);

		if (database && database.find(x => x.name === cmdname.toLowerCase()))
			return message.channel.send(
				':x: Este nome de comando já está adicionado aos comandos personalizados do servidor.'
			);

		let data = {
			name: cmdname.toLowerCase(),
			responce: cmdresponce
		};

		db.push(`cmd_${message.guild.id}`, data);

		return message.channel.send(
			'O comando personalizado **' +
				cmdname.toLowerCase() +
				'** foi adicionado neste servidor.'
		);
	}
};
