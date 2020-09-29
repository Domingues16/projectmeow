const Discord = require('discord.js'); // puxando a livraria 'discord.js'
const config = require('../../config.json')

module.exports = {
  name: "ahelp",
  aliases: ["aahelp"],
  category: "owner",
  usage: "blacklist <@user>",
  description: "Blacklist somebody from the bot!",
  run: async (client, message, args) => {

    message.reply('verifique suas mensagens privadas.')


     const embed = new Discord.MessageEmbed()
        .setTitle(`Space Ajuda!`)
        .setColor("GOLD")
        .setDescription('Seja muito bem vindo a minha central de ajuda. \n\n\n🔨 `Moderação` \n🔧 `Uteis` \n💳 `Entretenimento`\n🤖 `Bots`')
    message.author.send({embed}).then(msg => { // evento para reagir a mensagem
            msg.react('🤖').then(r => { // bot
            msg.react('🔨').then(r => { // mod
            msg.react('🔧').then(r => { // uteis
            msg.react('💳').then(r => { // entretenimento
            msg.react('🔙').then(r => { // inicio
            })
        })
      })
    })
 })
        // filtros de cada reação, para configurar a informação do autor
        const BotFilter = (reaction, user) => reaction.emoji.name === '🤖' && user.id === message.author.id;
        const UtilidadesFilter = (reaction, user) => reaction.emoji.name === '🔧' && user.id === message.author.id;
        const ModeraçãoFilter = (reaction, user) => reaction.emoji.name === '🔨' && user.id === message.author.id;
        const EntretenimentoFilter = (reaction, user) => reaction.emoji.name === '💳' && user.id === message.author.id;
        const BackFilter = (reaction, user) => reaction.emoji.name === '🔙' && user.id === message.author.id;
        // coletores de cada reação, para ver confirmar tal membro 
        const Bots = msg.createReactionCollector(BotFilter);
        const Utilidades = msg.createReactionCollector(UtilidadesFilter);
        const Moderação = msg.createReactionCollector(ModeraçãoFilter);
        const Entretenimento = msg.createReactionCollector(EntretenimentoFilter);
        const Back = msg.createReactionCollector(BackFilter);

        Bots.on('collect', r2 => {
         const embed = new Discord.MessageEmbed()
          .setTitle('🤖 BOTS')
          .addField(`\`${config.prefix}análise\``, `Faça a análise de um bot`)
          .addField(`\`${config.prefix}addbot\``, `Adicione o seu bot ao DiscordLab`)

          msg.edit(embed)
        }) 

        Utilidades.on('collect', r2 => { // criando um evento, caso o membro clique nessa reação, e todos são iguais!
            const embed = new Discord.MessageEmbed()
                .setTitle("🔧 ÚTEIS")
                .addField(`\`${config.prefix}addemoji\``, `Adicione um emoji no servidor`)
                .addField(`\`${config.prefix}botinfo\``, `Saiba mais sobre mim`)
                .addField(`\`${config.prefix}cmd\``, `Verifique alguns códigos`)
                .addField(`\`${config.prefix}clima\``, `Veja o clima de alguma cidade`)
                .addField(`\`${config.prefix}docs\``, `Pesquise algo dentro do Discord.js`)
                .addField(`\`${config.prefix}emojis\``, `Veja os emojis do servidor`)
                .addField(`\`${config.prefix}lembrete\``, `Peça ajuda ao bot para lembrar você de algo`)
                .addField(`\`${config.prefix}ontime\``, `Veja a quanto tempo o bot se encontra online`)
                .addField(`\`${config.prefix}userinfo\``, `Confira algumas informações de um membro`)
                .setColor("GOLD")

            msg.edit(embed);
        })

        Moderação.on('collect', r2 => {
            const embed = new Discord.MessageEmbed()
                .setTitle("👮 MODERAÇÃO")
                .addField(`\`${config.prefix}ban\``, `Aplique um banimento em um membro`)
                .addField(`\`${config.prefix}clear\``, `Limpe indesejadas mensagens em um canal`)
                .addField(`\`${config.prefix}dm\``, `Envie uma mensagem na DM de um membro`)
                .addField(`\`${config.prefix}kick\``, `Expulse membros fora da lei`)
                .addField(`\`${config.prefix}say\``, `Escreva alguma mensagem através do bot`)
                .addField(`\`${config.prefix}warn\``, `Avise um membro que não se comporta`)
                .setColor("GOLD")
            msg.edit(embed);
        })

        Entretenimento.on('collect', r2 => {
            const embed = new Discord.MessageEmbed()
                .setTitle("💳 ENTRETENIMENTO")
                .addField(`\`${config.prefix}ascii\``, `Crie um texto em ASCII`)
                .addField(`\`${config.prefix}avatar\``, `Amplie a foto de algum membro`)
                .addField(`\`${config.prefix}bigtext\``, `Crie um texto grande de letras!`)
                .addField(`\`${config.prefix}conquista\``, `Faça sua consquista no Minecraft`)
                .addField(`\`${config.prefix}dado\``, `Veja em qual número o dado vai cair`)
                .addField(`\`${config.prefix}pergunta\``, `Pergunte algo ao sabio bot`)
                .addField(`\`${config.prefix}roleta\``, `Brinque de roleta-russa`)
                .addField(`\`${config.prefix}laranjo\``, `Crie seu próprio meme do Laranjo`)
                .addField(`\`${config.prefix}servericon\``, `Amplie a foto do servidor`)
                .addField(`\`${config.prefix}tweet\``, `Crie um falso tweet`)
                .setColor("GOLD")

            msg.edit(embed);
        })

        Back.on('collect', r2 => {
            const embed = new Discord.MessageEmbed()
        .setTitle(`Space Ajuda!`)
        .setColor("GOLD")
        .setDescription('Seja muito bem vindo a minha central de ajuda. \n\n\n🔨 `Moderação` \n🔧 `Uteis` \n💳 `Entretenimento`\n🤖 `Bots`')

           msg.edit(embed);  
        });
    });
}}