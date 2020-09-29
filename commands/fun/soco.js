const Discord = require('discord.js');

module.exports = {
	name: 'soco',
	aliases: ['punch', 'bater'],
	run: async (client, message, args) => {

var list = [
  'https://thumbs.gfycat.com/AromaticVengefulAnglerfish-size_restricted.gif',
  'https://media1.giphy.com/media/l2QE4xqSbkt8Tz8Ck/giphy.gif',
  'https://media1.tenor.com/images/1fe8502ce53c5c144c915c7d6e8d0868/tenor.gif?itemid=12833124',
  'https://media2.giphy.com/media/l1J3G5lf06vi58EIE/giphy.gif'
];

var rand = list[Math.floor(Math.random() * list.length)];
let user = message.mentions.users.first() || client.users.cache.get(args[0]);
if (!user) {
return message.reply('lembre-se de mencionar um usuário válido para da um soco!');
}
/*
message.channel.send(`${message.author.username} **acaba de bater** ${user.username}! :heart:`, {files: [rand]});
*/
let avatar = message.author.displayAvatarURL({format: 'png'});
  const embed = new Discord.MessageEmbed()
        .setTitle('Soco')
        .setColor('#000000')
        .setDescription(`${message.author} acaba de dar um socou em ${user}`)
        .setImage(rand)
        .setTimestamp()
        .setThumbnail(avatar)
        .setFooter('Socao')
        .setAuthor(message.author.tag, avatar);
  await message.channel.send(embed);
}}