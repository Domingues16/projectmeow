const Discord = require('discord.js');
const db = require('quick.db');
const { default_prefix } = require('../../config.json');

module.exports = {
	name: 'prefix',
	aliases: ['prefixo'],
	run: async (client, message, args) => {
		let prefixperm = new Discord.MessageEmbed()
			.setColor('RANDOM')
			.setAuthor('Você não tem permissão para alterar o prefixo.');
		let prefixdual = new Discord.MessageEmbed()
			.setColor('RANDOM')
			.setAuthor('Você não pode definir o prefixo com um argumento duplo.');
		let prefix3 = new Discord.MessageEmbed()
			.setColor('RANDOM')
			.setAuthor('Fale um prefixo com até 3 caracteres.');
		let prefixold = new Discord.MessageEmbed()
			.setColor('RANDOM')
			.setAuthor('Meu prefixo voltou a ser o padrão.');
		let prefixnew = new Discord.MessageEmbed()
			.setColor('RANDOM')
			.setAuthor(`Prefixo bot setado para: ${args[0]}`);
		let prefixmax3 = new Discord.MessageEmbed()
			.setColor('RANDOM')
			.setAuthor('Apenas 3 caracteres.');
		if (!message.member.hasPermission('ADMINISTRATOR')) {
			return message.channel.send(prefixperm);
		}

		if (!args[0]) {
			return message.channel.send(prefix3);
		}

		if (args[1]) {
			return message.channel.send(prefixdual);
		}

		if (args[0].length > 3) {
			return message.channel.send(prefixmax3);
		}

		if (args.join('') === default_prefix) {
			db.delete(`prefix_${message.guild.id}`);
			return await message.channel.send(prefixold);
		}

		db.set(`prefix_${message.guild.id}`, args[0]);
		await message.channel.send(prefixnew);
	}
};
