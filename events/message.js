const discord = require('discord.js');
module.exports = async (client, message) => {
	const meow2 = 'Meow';
	if (message.content.includes(meow2))
		return message.react('761705366769369090');
	const meow = 'meow';
	if (message.content.includes(meow))
		return message.react('761705366769369090');
	const everyone = '@everyone';
	if (message.content.includes(everyone))
		return message.react('761537426149081128');
	const here = '@here';
	if (message.content.includes(here))
		return message.react('761537426149081128');
	let embedfbi = new discord.MessageEmbed()
		.setColor('RANDOM')
		.setTitle('**FBI**')
		.setDescription('OPEN THE DOOR!');
	let fbi = 'loli';
	if (message.content.includes(fbi)) {
		await message.react('761583262673403937');
		await message.channel.send(embedfbi);
	}
	let fbi2 = 'Loli';
	if (message.content.includes(fbi2)) {
		await message.react('761583262673403937');
		await message.channel.send(embedfbi);
	}
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
};
