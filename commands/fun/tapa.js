const Discord = require('discord.js');

module.exports = {
	name: 'tapa',
	aliases: ['slap'],
	run: async (client, message, args) => {

var list = [
  'https://www.intoxianime.com/wp-content/uploads/2017/04/tumblr_ooub8fIHkT1qz64n4o2_400.gif',
  'https://media.tenor.com/images/7dc139a74ac5bd75977def73287e078e/tenor.gif',
  'https://utinuti.files.wordpress.com/2012/03/tumblr_lv8r0lagid1qgcvsy.gif',
  'https://i.imgur.com/lL9GPNv.gif'
];

var rand = list[Math.floor(Math.random() * list.length)];
let user = message.mentions.users.first() || client.users.cache.get(args[0]);
if (!user) {
return message.reply('lembre-se de mencionar um usuário válido para bater!');
}
/*
message.channel.send(`${message.author.username} **acaba de bater** ${user.username}! :heart:`, {files: [rand]});
*/
let avatar = message.author.displayAvatarURL({format: 'png'});
  const embed = new Discord.MessageEmbed()
        .setTitle('Slap')
        .setColor('#000000')
        .setDescription(`${message.author} acaba de bater em ${user}`)
        .setImage(rand)
        .setTimestamp()
        .setThumbnail(avatar)
        .setFooter('Um tapa não doi')
        .setAuthor(message.author.tag, avatar);
  await message.channel.send(embed);
}}