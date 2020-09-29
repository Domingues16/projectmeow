const discord = require('discord.js');
const client = new discord.Client();
const { Canvas } = require('canvas-constructor');
const fetch = require('node-fetch');
module.exports = {
	name: 'canvastest',
	aliases: ['aaaahelp'],
	category: 'owner',
	usage: 'blacklist <@user>',
	description: 'Blacklist somebody from the bot!',
	run: async (client, message, args) => {
		const avatar = await fetch(message.author.avatarURL({ format: 'jpg' }));

		let mage = new Canvas(500, 250)
			.setColor('#ffffff')
			.addRect(0, 0, 500, 250) //we gonna replace it with image
			.setColor('#ff2050')
			.addRect(0, 0, 500, 80)
			.setColor('#ffffff')
			.setTextFont('bold 40px Impact') //you can make it bold
			.addText('PROFILE CARD', 110, 55)
			.setColor('#ff2050')
			.setTextFont('bold 20px Impact')
			.addText(`ID - ${message.author.id}`, 30, 140)
			.addText(`TAG - ${message.author.tag}`, 30, 170)
			.addText(`GUILD NAME - ${message.guild.name}`, 30, 200)
			.setColor('#ffffff')
			.addCircle(60, 40, 33)
			.addCircularImage(await avatar.buffer(), 60, 40, 30)
			.toBuffer();

		message.channel.send({ files: [mage] }); //lol i forget again
	} //THESE CODE WILL BE PUBLISHED ON GITHUB
};
