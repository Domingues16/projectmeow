const Discord = require(`discord.js`)
const db = require('quick.db')

module.exports = {
  name:"leaderboard",
  category:"economia",
  aliases:['rank'],
  run:async (client, message, args) => {
    
  let money = db.all().filter(data => data.ID.startsWith(`money`)).sort((a, b) => b.data - a.data)
    money.length = 20;
    var finalLb = "";
    for (var i in money) {
      finalLb += `**${money.indexOf(money[i])+1}. ${client.users.cache.get(money[i].ID.split('_')[1]) ? client.users.cache.get(money[i].ID.split('_')[1]).tag : "Unknown User#0000"}** - ${money[i].data}:dollar:\n`;
    
    }
    const embed = new Discord.MessageEmbed() /*MessageEmbed*/
    .setAuthor(`Leaderboard Won's!`, message.guild.iconURL)
    .setColor(message.member.displayHexColor)
    .setDescription(finalLb)
    .setFooter(client.user.tag, client.user.displayAvatarURL())
    .setTimestamp()
    message.channel.send(embed);
    
    
  }
}