const Discord = require('discord.js');

module.exports = {
	name: 'carinho',
	aliases: ['pat'],
	run: async (client, message, args) => {

var list = [
  'https://media.tenor.com/images/c5acf899741117647a56c80ad6f459ca/tenor.gif',
  'https://pa1.narvii.com/6723/a62c58fa264cb92a3ba5b2f50446a0541307e528_hq.gif',
  'https://pa1.narvii.com/6200/33889bd8c5e3b9dde6b4c43de225fea521ce511a_hq.gif',
  'https://media.tenor.com/images/c7192cc8ffa738690156fbb9334a8937/tenor.gif'
];

var rand = list[Math.floor(Math.random() * list.length)];
let user = message.mentions.users.first() || client.users.cache.get(args[0]);
if (!user) {
return message.reply('lembre-se de mencionar um usuário válido para fazer cafune!');
}
/*
message.channel.send(`${message.author.username} **acaba de fazer cafune** ${user.username}! :heart:`, {files: [rand]});
*/
let avatar = message.author.displayAvatarURL({format: 'png'});
  const embed = new Discord.MessageEmbed()
        .setTitle('Cafune')
        .setColor('#000000')
        .setDescription(`${message.author} acaba de fazer calinho gotoso em ${user}`)
        .setImage(rand)
        .setTimestamp()
        .setThumbnail(avatar)
        .setFooter('Calinho gotoso')
        .setAuthor(message.author.tag, avatar);
  await message.channel.send(embed);
}}