module.exports = {
	name: 'off',
	run: async (client, message, args) => {
		if (message.author.id !== '719141659614642197') return;
		await message.channel.send('Desligando...');
		process.exit();
	}
};
