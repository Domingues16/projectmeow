module.exports = {
	name: 'test',
	run: async (client, message, args) => {
		await message.react('👌');
		client.emit('guildMemberAdd', message.member);
		client.emit('guildMemberRemove', message.member);
	}
};
