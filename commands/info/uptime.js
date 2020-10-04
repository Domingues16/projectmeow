const Discord = require('discord.js');

module.exports = {
	name: 'uptime',
	run: async (client, message, args) => {
		let totalSeconds = client.uptime / 1000;
		let days = Math.floor(totalSeconds / 86400);
		let hours = Math.floor(totalSeconds / 3600);
		totalSeconds %= 3600;
		let minutes = Math.floor(totalSeconds / 60);
		let seconds = totalSeconds % 60;

		let uptime = `${days.toFixed()}d, ${hours.toFixed()}h, ${minutes.toFixed()}m, ${seconds.toFixed()}s.`;

		const embed = new Discord.MessageEmbed()
			.setColor('#2E3135')
			.setAuthor(`⏱ | Tempo de atividade:\n⏱ | ${uptime}`);

		message.channel.send(embed).then(msg => {
			msg.delete({ timeout: 5000 });
		});
	}
};
