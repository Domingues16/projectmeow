const { default_prefix } = require('./config.json');
const db = require('quick.db');
const discord = require('discord.js');
const { addexp } = require('./handlers/xp.js');
module.exports = (client, message) => {
	if (message.author.bot) return;
	if (!message.guild) return;
	if (message.channel.type == 'dm') return;
	let prefix = db.get(`prefix_${message.guild.id}`);
	if (prefix === null) prefix = default_prefix;
	let blacklist = db.fetch(`blacklist_${message.author.id}`);
	let opan = new discord.MessageEmbed()
		.setColor('RANDOM')
		.setTitle('Alguém me chamou?')
		.setDescription(
			`O meu prefixo nesse servidor é ${prefix} use ${prefix}help para ver os meus comandos.`
		);
	let mention = [`<@${client.user.id}>`, `<@!${client.user.id}>`];
	mention.find(mention => {
		if (message.content === mention) message.channel.send(opan);
	});

	if (!message.content.startsWith(prefix)) return;
	if (blacklist === 'Blacklisted')
		return message.reply('você está bloqueado no bot!');

	if (!message.member) message.member = message.guild.fetchMember(message);

	if (!message.content.startsWith(prefix)) return;

	if (!message.member) message.member = message.guild.fetchMember(message);

	const args = message.content
		.slice(prefix.length)
		.trim()
		.split(/ +/g);
	const cmd = args.shift().toLowerCase();

	if (cmd.length === 0) return;

	let cmdx = db.get(`cmd_${message.guild.id}`);

	if (cmdx) {
		let cmdy = cmdx.find(x => x.name === cmd);
		if (cmdy) message.channel.send(cmdy.responce);
	}
	let command = client.commands && client.commands.get(cmd);

	if (!command)
		command =
			client.commands &&
			client.commands.get(client.aliases && client.aliases.get(cmd));
	let cmdz = new discord.MessageEmbed()
		.setColor('RANDOM')
		.setTitle('Comando inexistente. Talvez foi a sua caligrafia.');
	if (!command) message.channel.send(cmdz);
	if (command) command.run(client, message, args);

	return addexp(message);

	if (!client.commands.has(command)) return;

	try {
		client.commands.get(command).execute(message, args);
	} catch (error) {
		console.error(error);
		message.reply('erro ao executar esse comando.');
	}
};
