const cp = require('child_process');
module.exports = {
	name: 'restart',
	run: async (client, message, args) => {
		if (message.author.id !== '719141659614642197') return;
		await message.channel.send('Reiniciando...');
		const child = cp.spawn('node', ['index.js'], { detached: true });
		child.unref();
		process.exit();
	}
};
