const Discord = require('discord.js');

module.exports = {
	name: 'abraço',
	aliases: ['hug', 'abraçar'],
	run: async (client, message, args) => {
		var list = [
			'https://gifman.net/wp-content/uploads/2019/06/casal-apaixonado-07.gif',
			'https://media.tenor.com/images/d6eaf24231ac3c162785385a58e5a332/tenor.gif',
			'https://64.media.tumblr.com/tumblr_lm0x4ueA0X1qju5kuo1_500.gif',
			'https://i.pinimg.com/originals/ea/e4/26/eae4262b6ece42b6a2b0637bf1e90202.gif',
			'https://media.discordapp.net/attachments/733751317041905745/736632457578676254/hug.gif?width=426&height=395',
			'https://media.discordapp.net/attachments/733751317041905745/736632470820225064/hug4.gif?width=198&height=134',
			'https://media.discordapp.net/attachments/733751317041905745/736632483575103498/hug5.gif?width=198&height=175',
			'https://media.discordapp.net/attachments/733751317041905745/736632488025129000/hug7.gif?width=198&height=124',
			'https://media.discordapp.net/attachments/733751317041905745/736632515544219722/hug2.gif?width=379&height=395',
			'https://media.discordapp.net/attachments/733751317041905745/736632518727696464/hug8.gif?width=450&height=251',
			'https://media.discordapp.net/attachments/733751317041905745/736632544526860388/hug6.gif?width=450&height=227',
			'https://media.discordapp.net/attachments/733751317041905745/736632554005856286/hug3.gif?width=448&height=250',
			'https://media.discordapp.net/attachments/733751317041905745/736632565309505596/hug1.gif?width=448&height=250'
		];

		var rand = list[Math.floor(Math.random() * list.length)];
		let user =
			message.mentions.users.first() || client.users.cache.get(args[0]);
		if (!user) {
			return message.reply(
				'lembre-se de mencionar um usuário válido para abraçar!'
			);
		}
		/*
message.channel.send(`${message.author.username} **acabou de abraçar** ${user.username}! :heart:`, {files: [rand]});
*/
		let avatar = message.author.displayAvatarURL({ format: 'png' });
		const embed = new Discord.MessageEmbed()
			.setTitle('Abraço gotoso')
			.setColor('#000000')
			.setDescription(`${message.author} acaba de abraçar a(o) ${user}`)
			.setImage(rand)
			.setTimestamp()
			.setThumbnail(avatar)
			.setFooter('abraço gotoso')
			.setAuthor(message.author.tag, avatar);
		await message.channel.send(embed);
	}
};
