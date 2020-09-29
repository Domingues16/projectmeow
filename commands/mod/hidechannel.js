const discord = require('discord.js')

module.exports = {
  name:"hidechannel",
  category:"adm",
  aliases: ['esconderchat','esconderCanal','escondercanal'],
  run: async (client, message, args) => {
    let amor = message.guild.roles.cache.find(callback => callback.name === '@everyone')
     if(!message.member.hasPermission("MANAGE_CHANNELS")) {
       message.channel.send('Você não tem permissions o suficiente falta `MANAGE_CHANNELS`')
     }
    
    message.channel.updateOverwrite(amor, {
  VIEW_CHANNEL: false
})
    
    return message.channel.send('Canal invisivel com sucesso!!' + `\n` + 'Use s!mostraochat para deixar visivel')
    
  }
}