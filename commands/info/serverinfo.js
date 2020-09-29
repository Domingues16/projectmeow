const Discord = require('discord.js');
const dateformat = require('dateformat');

module.exports = {
	name: 'serverinfo',
	aliases: ['server'],
	run: async (client, message, args) => {
		let icon = message.guild.iconURL({ size: 2048 });

		let region = {
			brazil: 'Brasil',
			'eu-central': 'Europa Central',
			singapore: 'Singapura',
			london: 'Londres',
			russia: 'Russia',
			japan: 'Japão',
			hongkong: 'Hongkong',
			sydney: 'Sydney',
			'us-central': 'U.S. Central',
			'us-east': 'U.S. East',
			'us-south': 'U.S. South',
			'us-west': 'U.S. West',
			'eu-west': 'Western Europe'
		};

		let member = message.guild.members;
		let offline = member.cache.filter(m => m.user.presence.status === 'offline')
				.size,
			online = member.cache.filter(m => m.user.presence.status === 'online')
				.size,
			idle = member.cache.filter(m => m.user.presence.status === 'idle').size,
			dnd = member.cache.filter(m => m.user.presence.status === 'dnd').size,
			robot = member.cache.filter(m => m.user.bot).size,
			total = message.guild.memberCount;

		let channels = message.guild.channels;
		let text = channels.cache.filter(r => r.type === 'text').size,
			vc = channels.cache.filter(r => r.type === 'voice').size,
			category = channels.cache.filter(r => r.type === 'category').size,
			totalchan = channels.cache.size;

		let location = region[message.guild.region];

		let x = Date.now() - message.guild.createdAt;
		let h = Math.floor(x / 86400000);
		let created = dateformat(message.guild.createdAt);

		const embed = new Discord.MessageEmbed()
			.setColor('RANDOM')
			.setTimestamp(new Date())
			.setThumbnail(icon)
			.setAuthor(message.guild.name).setDescription(`🆔️ | ID: \n${
			message.guild.id
		}\n🌐 | Região: \n${location}.\n🗓 | Data de criação: \n${created}.\n👑 | Dono: \n${
			message.guild.owner.user.tag
		}.\n${
			message.guild.owner.user.id
		}.\n👥 | Membros no total: \n${total}.\n🔵 | Online: \n${online}.\n⚪ | Ausentes: \n${idle}. \n🔴 | Não pertube: \n${dnd}.\n⚫ | Invisível: \n${offline}.\n🤖 | Chatbots: \n${robot}.\n📺 | Canais no total: \n${totalchan}.\n💬 | Canais de texto: \n${text}.\n🎙 | Canais de voz: \n${vc}.\n🗂 | Categorias: \n${category}.`);

		message.channel.send(embed);
	}
};
