const exec = require('child_process').exec;

module.exports = {
	name: 'files',
	run: async (client, message, args) => {
		try {
			const execute = command => {
				message.channel.send('The files have been sent to your DMs!');
				exec(command, (err, stdout, stderr) => {
					message.author.send('**' + stdout + '**');
					if (err || stderr) {
						if (err) {
							message.author.send('```' + err + '```');
						}

						if (stderr) {
							message.author.send('```' + stderr + '```');
						}

						message.channel.send('Shell Error.');
					}
				});
			};

			execute('ls -a');
		} catch (err) {
			message.channel.send('There was an error!\n' + err).catch();
		}
	}
};
