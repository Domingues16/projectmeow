const Discord = require('discord.js');
const db = require('quick.db');
const { default_prefix } = require('../../config.json');
module.exports = {
	name: 'shop',
	category: 'fun',
	aliases: ['loja'],
	run: async (bot, message, args) => {
		let money = db.get(`money_${message.author.id}`);

		let prefix = db.get(`prefix_${message.guild.id}`);
		if (prefix === null) prefix = default_prefix;

		if (!args[0]) {
			return message.channel.send(
				`${
					message.author
				}, Pets a vendas\n**Panda** **Preço: 2500**\n**Phoenix** **Preço: 4500**\n**dragão** **Preço: 8500**\n**Flamingo:** **Preço: 500**\n**Blaze** **Preço:50000**\n**Loli** **Preço: 15000**\n**Egirl** **Preço: 25000**\n**Digte ${prefix}shop e o nome do pet que deseja compra**\n`
			);
		} else if (args[0].toLowerCase() == 'panda') {
			if (money < 2500) {
				return message.channel.send('Você não tem 2500 Reais para a compra!!');
			}
			db.set(`animalest_${message.author.id}`, 909090);
			db.subtract(`money_${message.author.id}`, 2500);
			return message.channel.send(`Você acaba de comprar um pet por 2500R$`);
		} else if (args[0].toLowerCase() == 'phoenix') {
			if (money < 4500) {
				return message.channel.send('Você não tem 4500 Reais para a compra!!');
			}
			db.set(`animalest_${message.author.id}`, 303030);
			db.subtract(`money_${message.author.id}`, 4500);
			return message.channel.send(`Você acaba de comprar um pet por 4500R$`);
		} else if (args[0].toLowerCase() == 'dragão') {
			if (money < 8500) {
				return message.channel.send('Você não tem 8500 Reais para a compra!!');
			}
			db.set(`animalest_${message.author.id}`, 403929);
			db.subtract(`money_${message.author.id}`, 8500);
			return message.channel.send(`Você acaba de comprar um pet por 8500R$`);
		} else if (args[0].toLowerCase() == 'flamingo') {
			if (money < 500) {
				return message.channel.send('Você não tem 500 Reais para a compra!!');
			}
			db.set(`animalest_${message.author.id}`, 759203);
			db.subtract(`money_${message.author.id}`, 50000);
			return message.channel.send(`Você acaba de comprar um pet por 500R$`);
		} else if (args[0].toLowerCase() == 'blaze') {
			if (money < 50000) {
				return message.channel.send('Você não tem 50000 Reais para a compra!!');
			}
			db.set(`animalest_${message.author.id}`, 182306);
			db.subtract(`money_${message.author.id}`, 500);
			return message.channel.send(`Você acaba de comprar um pet por 50000R$`);
		} else if (args[0].toLowerCase() == 'loli') {
			if (money < 15000) {
				return message.channel.send('Você não tem 15000 Reais para a compra!!');
			}
			db.set(`animalest_${message.author.id}`, 999999);
			db.subtract(`money_${message.author.id}`, 15000);
			return message.channel.send(`Você acaba de comprar um pet por 15000R$`);
		} else if (args[0].toLowerCase() == 'egirl') {
			if (money < 25000) {
				return message.channel.send('Você não tem 25000 Reais para a compra!!');
			}
			db.set(`animalest_${message.author.id}`, 100004);
			db.subtract(`money_${message.author.id}`, 25000);
			return message.channel.send(`Você acaba de comprar um pet por 25000R$`);
		}
	}
};
