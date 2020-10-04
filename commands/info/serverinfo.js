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
			.setAuthor(message.guild.name)
			.setDescription(
				`🆔️ | ID: (${
					message.guild.id
				}).\n🌐 | Região: ${location}.\n🗓 | Data de criação: ${created}.\n👑 | Dono: ${
					message.guild.owner.user.tag
				} (${
					message.guild.owner.user.id
				}).\n👥 | Membros no total: ${total}.\n🔵 | Online: ${online}.\n⚪ | Ausentes: ${idle}. \n🔴 | Não pertube: ${dnd}.\n⚫ | Invisível: ${offline}.\n🤖 | Chatbots: ${robot}.\n📺 | Canais no total: ${totalchan}.\n💬 | Canais de texto: ${text}.\n🎙 | Canais de voz: ${vc}.\n🗂 | Categorias: ${category}.`
			);

		message.channel.send(embed).then(msg => {
			msg.delete({ timeout: 10000 });
		});
	}
};
