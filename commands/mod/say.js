module.exports = {
	name: 'say',
	aliases: ['say', 'falar', 'repetir'],
	run: async (client, message, args) => {
		if (!message.member.permissions.has('MANAGE_MESSAGES'))
			return message.channel.send('Você não tem permissão de gerenciar mensagens.');

		const a = args.join(' ');
    if (!a) {
			return message.channel.send('Mande alguma mensagem junto com o comando.');
		}
		message.delete().catch(O_o => {});
		message.channel.send(a);
	}
};