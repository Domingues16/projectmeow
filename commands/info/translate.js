const translate = require('@vitalets/google-translate-api');
const Discord = require('discord.js');

module.exports = {
  name:"translate",
  aliases:['traduzir'],
  run: async (client, message, args) => {

    let langs = {
  "auto": "Automatic",
  "ar": "Arabe",
  "nl": "Holandes",
  "eng": "Inglês",
  "en": "Inglês",
  "fr": "Frances",
  "de": "Alemão",
  "el": "Grego",
  "it": "Italiano",
  "ja": "Japones",
  "jw": "Javanes",
  "kn": "Kannada",
  "ko": "Coreano",
  "pt": "Portugues",
  "ro": "Romano",
  "ru": "Russo",
  "es": "Espanhol"
}

    
  if (!args[0]) {
    return message.channel.send(`Use dessa forma: [prefixo]traduzir <lingua> + <lingua> <mensagem>`)
  }

  let msg = args.slice(2).join(' ');
  translate(msg, { from: args[0], to: args[1] }).then(res => {
    let embed = new Discord.MessageEmbed()
      .setAuthor(`${message.author.username}`)
      .setTitle(`Google tradutor:`)
      .setColor('RANDOM')
      .setThumbnail('https://upload.wikimedia.org/wikipedia/commons/d/db/Google_Translate_Icon.png')
      .setDescription(`Texto traduzido de: ` + "`" + `${langs[args[0]]}` + "`" + " para " + "`" + `${langs[args[1]]}` + "`")
      .addField('Texto original:', msg)
      .addField(`Texto traduzido:`, res.text)
      .setTimestamp()

    message.channel.send(embed)


  }).catch(err => {
    message.channel.send(`hnn detectei um erro!! \n${err}`)
  })
}
}