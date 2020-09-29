const db = require('quick.db');

module.exports = {
	name: 'divorcio',
	run: async (client, message, args) => {
		const member = message.mentions.users.first();

		db.delete(`marry_${message.author.id}`, member.id);
		db.delete(`marry_${member.id}`, message.author.id);
	}
};
