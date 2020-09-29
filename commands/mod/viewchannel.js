const discord = require('discord.js')

module.exports = {
  name:"viewchannel",
  category:"adm",
  aliases: ['viewChannel','mostrarCanal','mostrarcanal'],
  run: async (client, message, args) => {
    let amor = message.guild.roles.cache.find(callback => callback.name === '@everyone')
     if(!message.member.hasPermission("MANAGE_CHANNELS")) {
       message.channel.send('Você não tem permissions o suficiente falta `MANAGE_CHANNELS`')
     }
    
    message.channel.updateOverwrite(amor, {
  VIEW_CHANNEL: true
})
    
    return message.channel.send('Canal visivel com sucesso!!' + `\n` + 'Use s!Esconderchat para deixar invisivel')
    
  }
}