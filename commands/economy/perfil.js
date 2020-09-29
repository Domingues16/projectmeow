const discord = require('discord.js');
const db = require('quick.db');
const { default_prefix } = require(`../../config.json`);
const { getInfo } = require('../../handlers/xp.js');

module.exports = {
	name: 'perfil',
	category: 'fun',
	aliases: ['perfil', 'profile'],
	run: async (client, message, args) => {
		let prefix = db.get(`prefix_${message.guild.id}`);
		if (prefix === null) prefix = default_prefix;

		let user = message.mentions.users.first() || message.author;

		const member = message.guild.member(user);

		let money = await db.fetch(`money_${member.id}`);
		if (money === null) money = '0';

		let emprego = await db.fetch(`emprego_${member.id}`);
		if (emprego === null)
			emprego = `Desempregado. Escolha um emprego usando \`${prefix}empregos\``;
		if (emprego === 1) emprego = `🚓 policial`;
		if (emprego === 2) emprego = `🚑 paramédico`;
		if (emprego === 3) emprego = `️🚒 bombeiro`;

		let marry = await db.get(`marry_${member.id}`);
		let pata = client.users.cache.get(marry);
		if (marry === null) {
			pata = 'ninguém';
		} else {
			pata = `${pata}`;
		}

		let aaa = await db.fetch(`aaa_${member.id}`);
		if (aaa === null)
			aaa = `Mude o que vai aparecer aqui usando \`${prefix}aboutme\``;

		let xp = db.get(`xp_${user.id}_${message.guild.id}`) || 0;
		const { level, remxp, levelxp } = getInfo(xp);
		if (xp === null || xp === 0) xp = '0';

		let embed = new discord.MessageEmbed()
			.setColor('RANDOM')
			.setThumbnail(
				user.displayAvatarURL({ dynamic: 'gif', format: 'png', size: 1024 })
			)
			.setDescription(
				`🔠 | Nome: ${user.username}\n🆔️ | ID: ${
					user.id
				}\n💼 | Emprego: ${emprego}\n💍 | Casado(a) com: ${pata}\n💵 | Moedas: ${money}\n💬 | Sobre mim: ${aaa}`
			);

		message.channel.send(embed);
	}
};
