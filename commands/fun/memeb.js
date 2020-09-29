const { MessageAttachment } = require('discord.js');
const db = require('quick.db');
module.exports = {
	name: 'memeb',
	run: (client, message, args) => {
		let a = db.get(`memefile`);
		const b = new MessageAttachment(a);
		message.channel.send('Meme:', b);
	}
};