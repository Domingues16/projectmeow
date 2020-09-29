//exportações
const { default_prefix } = require('./config.json');
const { config } = require('dotenv');
const db = require('quick.db');
const discord = require('discord.js');
const { addexp } = require('./handlers/xp.js');
const Discord = require('discord.js');
const client = new Discord.Client();
const express = require('express');
const app = express();
const { readdirSync } = require('fs');
const Enmap = require('enmap');

client.commands = new discord.Collection();
client.aliases = new discord.Collection();
client.queues = new Map();
client.commands = new Enmap();
client.startTime = Date.now();
['command'].forEach(handler => {
	require(`./handlers/${handler}`)(client);
});
//prêmio
const { GiveawaysManager } = require('discord-giveaways');
client.giveawaysManager = new GiveawaysManager(client, {
	storage: './database.json',
	updateCountdownEvery: 3000,
	default: {
		botsCanWin: false,
		embedColor: 'RANDOM',
		reaction: '🎉'
	}
});
//evendo do comando snipe
client.snipes = new Map();
client.on('messageDelete', function(message, channel) {
	client.snipes.set(message.channel.id, {
		content: message.content,
		author: message.author.tag,
		image: message.attachments.first()
			? message.attachments.first().proxyURL
			: null
	});
});
//status
client.on('ready', () => {
	let activities = [
			`meu pai é o Deto. :3`,
			`estou em ${client.guilds.cache.size} servidores com ${
				client.users.cache.size
			} usuários ;)`,
			`meu prefixo padrão é: "&" use "&help" para saber quais são meus comandos :D`,
			`tornando o seu servidor mais feliz e ativo >.<`,
			`Ixtron, best Brazilian DJ.`,
			`Meow's House: https://discord.gg/SekU3B2 ^^`,
			`O Reino: https://discord.gg/PnFrMay :>`
		],
		i = 0;
	setInterval(
		() =>
			client.user.setActivity(`${activities[i++ % activities.length]}`, {
				type: 'STREAMING'
			}),
		7000
	);
	let onchannel = client.channels.cache.get(
		'755782399006343238',
		'757896857522536490'
	);
	let onchannelembed = new discord.MessageEmbed()
		.setColor('RANDOM')
		.setTitle(
			`Estou on-line com ${client.guilds.cache.size} servidores e ${
				client.users.cache.size
			} usuários.`
		);
	onchannel.send(onchannelembed);
});
//bloqueadores, blacklist, menção, prefixo, comandos e xp
client.on('message', async message => {
	if (message.author.bot) return;
	if (!message.guild) return;
	if (message.channel.type == 'dm') return;
	let prefix = db.get(`prefix_${message.guild.id}`);
	if (prefix === null) prefix = default_prefix;
	let blacklist = await db.fetch(`blacklist_${message.author.id}`);
	let opan = new discord.MessageEmbed()
		.setColor('RANDOM')
		.setTitle('Alguém me chamou?')
		.setDescription(
			`O meu prefixo nesse servidor é ${prefix} use ${prefix}help para ver os meus comandos.`
		);
	let mention = [`<@${client.user.id}>`, `<@!${client.user.id}>`];
	mention.find(mention => {
		if (message.content === mention) {
			message.channel.send(opan);
		}
	});

	if (!message.content.startsWith(prefix)) return;
	if (blacklist === 'Blacklisted')
		return message.reply('You are blacklisted from the bot!');

	if (!message.member)
		message.member = await message.guild.fetchMember(message);

	if (!message.content.startsWith(prefix)) return;

	if (!message.member)
		message.member = await message.guild.fetchMember(message);

	const args = message.content
		.slice(prefix.length)
		.trim()
		.split(/ +/g);
	const cmd = args.shift().toLowerCase();

	if (cmd.length === 0) return;

	let command = client.commands.get(cmd);

	if (!command) command = client.commands.get(client.aliases.get(cmd));
	let cmdz = new discord.MessageEmbed()
		.setColor('RANDOM')
		.setTitle('Comando inexistente. Talvez foi a sua caligrafia.');
	if (!command) message.channel.send(cmdz);
	if (command) command.run(client, message, args);

	return addexp(message);

	let cmdx = db.get(`cmd_${message.guild.id}`);

	if (cmdx) {
		let cmdy = cmdx.find(x => x.name === cmd);
		if (cmdy) message.channel.send(cmdy.responce);
	}

	if (!client.commands.has(command)) return;

	try {
		client.commands.get(command).execute(message, args);
	} catch (error) {
		console.error(error);
		message.reply('erro ao executar esse comando.');
	}
});
//fakejoin
client.on('message', message => {
	if (message.content === '!test') {
		client.emit('guildMemberAdd', message.member);
		client.emit('guildMemberRemove', message.member);
	}
});
//welcome, bye e autorole
client.on('guildMemberAdd', member => {
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

	client.channels.cache.get(chx).send(wembed);
});

client.on('guildMemberRemove', member => {
	let chx = db.get(`saida_${member.guild.id}`);

	if (chx === null) {
		return;
	}

	let embed1 = new discord.MessageEmbed()
		.setAuthor(member.user.username, member.user.avatarURL({ dynamic: true }))
		.setColor('RANDOM')
		.setTitle('Até mais!!')
		.addField(
			'Despedida',
			`Não sou muito boa de despedidas mas, até mais ${
				member.user.username
			} espero que volte um dia ` + ':cry:'
		)
		.addField(
			'Informações do usuário',
			`${member.user.tag} \n\`${member.id}\``
		);

	client.channels.cache.get(chx).send(embed1);
});
client.on('guildMemberAdd', member => {
	let role = db.get(`cargo_${member.guild.id}`);
	if (role === null) return;
	let cargo = member.guild.roles.cache.get(role);

	member.roles.add(cargo);
});
client.on('guildDelete', async guilda => {
	let canal = client.channels.cache.get('755782399006343238');
	let embedaddguilda = new discord.MessageEmbed()
		.setColor('RANDOM')
		.setTitle(
			`Fui removida do servidor ${guilda.name} (${
				guilda.id
			}) do usuário ${guilda.owner.user.tag} (${guilda.owner.user.id}) com ${guilda && guilda.memberCount} membros.`
		);
	canal.send(embedaddguilda);
});
client.on('guildCreate', async guilda => {
	let canal = client.channels.cache.get('755782399006343238');
	let embedaddguilda = new discord.MessageEmbed()
		.setColor('RANDOM')
		.setTitle(
			`Fui adicionada no servidor ${guilda.name} (${
				guilda.id
			}) do usuário ${guilda.owner.user.tag} (${guilda.owner.user.id}) com ${guilda && guilda.memberCount} membros.`
		);
	canal.send(embedaddguilda);
});
//logs
client.on('messageDelete', async message => {
	if (!message.guild) return;
	const fetchedLogs = await message.guild.fetchAuditLogs({
		limit: 1,
		type: 'MESSAGE_DELETE'
	});
	const deletionLog = fetchedLogs.entries.first();

	if (!deletionLog)
		return console.log(
			`A message by ${
				message.author.tag
			} was deleted, but no relevant audit logs were found.`
		);

	const { executor, target } = deletionLog;

	if (target.id === message.author.id) {
		console.log(
			`A message by ${message.author.tag} was deleted by ${executor.tag}.`
		);
	} else {
		console.log(
			`A message by ${
				message.author.tag
			} was deleted, but we don't know by who.`
		);
	}
});

client.on('guildMemberRemove', async member => {
	const fetchedLogs = await member.guild.fetchAuditLogs({
		limit: 1,
		type: 'MEMBER_KICK'
	});
	const kickLog = fetchedLogs.entries.first();

	if (!kickLog)
		return console.log(
			`${member.user.tag} left the guild, most likely of their own will.`
		);

	const { executor, target } = kickLog;
	if (target.id === member.id) {
		console.log(
			`${member.user.tag} left the guild; kicked by ${executor.tag}?`
		);
	} else {
		console.log(
			`${member.user.tag} left the guild, audit log fetch was inconclusive.`
		);
	}
});

client.on('guildBanAdd', async (guild, user) => {
	const fetchedLogs = await guild.fetchAuditLogs({
		limit: 1,
		type: 'MEMBER_BAN_ADD'
	});
	const banLog = fetchedLogs.entries.first();

	if (!banLog)
		return console.log(
			`${user.tag} was banned from ${
				guild.name
			} but no audit log could be found.`
		);

	const { executor, target } = banLog;

	if (target.id === user.id) {
		console.log(
			`${user.tag} got hit with the swift hammer of justice in the guild ${
				guild.name
			}, wielded by the mighty ${executor.tag}`
		);
	} else {
		console.log(
			`${user.tag} got hit with the swift hammer of justice in the guild ${
				guild.name
			}, audit log fetch was inconclusive.`
		);
	}
});

app.get('/', (req, res) => {
	res.send('Servidor ligado.');
});

app.listen(3000, () => {
	console.log();
});
//interação
client.on('message', async message => {
	if (message.content === `Bom dia`) return message.channel.send('Bom dia.');
	if (message.content === `bom dia`) return message.channel.send('Bom dia.');
	if (message.content === `boa tarde`)
		return message.channel.send('Boa tarde.');
	if (message.content === `Boa tarde`)
		return message.channel.send('Boa tarde.');
	if (message.content === `Boa manhã`)
		return message.channel.send('Boa manhã.');
	if (message.content === `boa manhã`)
		return message.channel.send('Boa manhã.');
	if (message.content === `Boa madrugada`)
		return message.channel.send('Boa madrugada.');
	if (message.content === `boa madrugada`)
		return message.channel.send('Boa madrugada.');
	if (message.content === `Boa noite`)
		return message.channel.send('Boa noite.');
	if (message.content === `boa noite`)
		return message.channel.send('Boa noite.');
	if (message.content === `Tchau`) return message.channel.send('Tchau.');
	if (message.content === `tchau`) return message.channel.send('Tchau.');
	if (message.content === `Flw`) return message.channel.send('Flw.');
	if (message.content === `flw`) return message.channel.send('Flw.');
	if (message.content === `Oi`) return message.channel.send('Oi.');
	if (message.content === `oi`) return message.channel.send('Oi.');
	if (message.content === `Olá`) return message.channel.send('Olá.');
	if (message.content === `olá`) return message.channel.send('Olá.');
});
//conexão do bot com o discord
client.login(process.env.TOKEN);
