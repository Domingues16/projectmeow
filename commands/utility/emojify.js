const discord = require('discord.js');
module.exports = {
	name: 'emojify',
	aliases: ['emojificar', 'emojitext', 'emojitxt', 'bigtext', 'bigtxt'],
	run: async (client, message, args) => {
		const mapping = {
			' ': '  ',
			'0': ':zero:',
			'1': ':one:',
			'2': ':two:',
			'3': ':three:',
			'4': ':four:',
			'5': ':five:',
			'6': ':six:',
			'7': ':seven:',
			'8': ':eight:',
			'9': ':nine:',
			'!': ':grey_exclamation:',
			'?': ':grey_question:',
			'#': ':hash:',
			'*': ':asterisk:'
		};
		'abcdefghijklmnopqrstuvwxyz'.split('').forEach(c => {
			mapping[c] = mapping[c.toUpperCase()] = `:regional_indicator_${c}:`;
		});
		if (args.length < 1) {
			message.channel.send('Você deve fornecer algum texto para emojificar!');
		}
		await message.delete();
		message.channel.send(
			args
				.join(' ')
				.split('')
				.map(c => mapping[c] || c)
				.join('')
		);
	}
};
