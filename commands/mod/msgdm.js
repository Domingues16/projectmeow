module.exports = {
	name: 'msgdm',
	run: async (client, message, args) => {
		const user = message.mentions.members.first();
		if (!user) {
			return message.channel.send('Mencione o usuário para mandar a mensagem.');
		}
		let msg = args.slice(1).join(' ');
		if (!msg) {
			return message.channel.send(
				'Que mensagem você vai mandar para o usuário?'
			);
		}
		user.send(msg);
		message.channel.send('Mensagem enviada.');
	}
};
