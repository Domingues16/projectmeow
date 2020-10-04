const discord = require('discord.js')

module.exports = {
  name:"lock",
  category:"adm",
  run: async (client, message, args) => {
    let amor = message.guild.roles.cache.find(callback => callback.name === '@everyone')
     if(!message.member.hasPermission("MANAGE_CHANNELS")) {
       message.channel.send('Você não tem permissions o suficiente falta `MANAGE_CHANNELS`')
     }
    
    message.channel.updateOverwrite(amor, {
  SEND_MESSAGES: false
})
    
    return message.channel.send('Canal bloqueado com sucesso.')
    
  }
}