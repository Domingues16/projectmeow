const discord = require('discord.js')
const db = require('quick.db')
const { default_prefix } = require('../../config.json')

module.exports = {
  name:"aboutme",
  category:"social",
  aliases:['sobremim','sobreMim','aboutMe','sobre-mim','sobre-Mim','about-me','about-Me'],
  run: async (client, message, args) => {
    let aaa = args.join(" ")
    if(!aaa) return message.channel.send('O que deve aparecer no seu perfil?!')
    
    let prefix = db.get(`prefix_${message.guild.id}`)
    if(prefix === null) prefix = default_prefix
    
    message.channel.send(`Agora no seu perfil ira mostrar \`${aaa}\`. \nUse ${prefix}profile para ver as alterações!!`)
    db.set(`aaa_${message.author.id}`, aaa)
  }
}