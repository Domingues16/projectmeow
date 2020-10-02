const db = require('quick.db');
const discord = require('discord.js');
module.exports = (client, member) => {
	let chx = db.get(`entrada_${member.guild.id}`);
	if (chx === null) return;
	let jointxt = db.get(`jointxt_${member.guild.id}`);
	if (jointxt === null)
		jointxt = 'Use o comando `jointxt` para alterar o que vai aparecer aqui.';
	let wembed = new discord.MessageEmbed()
		.setColor('RANDOM')
		.setTitle(
			`Bem-vindo(a) ${member.user.tag} ao ${
				member.guild.name
			}! Você é o membro ${member.guild.memberCount} nesse servidor.`
		)
		.setDescription(jointxt)
		.setFooter(`ID: ${member.id}.`);

	client.channels.cache.get(chx).send(`<@${member.id}>`, wembed);

	let role = db.get(`cargo_${member.guild.id}`);
	if (role === null) return;
	let cargo = member.guild.roles.cache.get(role);

	member.roles.add(cargo);
};
