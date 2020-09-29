const discord = require('discord.js');

module.exports = {
  name: 'ban',
  aliases: 'banir',
  run: async (client, message, args) => {
    if (!message.member.hasPermission('BAN_MEMBERS')) {
      return message.channel.send('você não tem permissão suficiente.');
    } const user = message.mentions.users.first();
    if (user) {
      const member = message.guild.member(user);
      if (member) {
        let msg1 = new discord.MessageEmbed()
          .setColor('RANDOM')
          .setTitle('Eles eram ruins!')
            let msg3 = new discord.MessageEmbed()
              .setColor('RANDOM')
              .setTitle('Não consegui banir o membro.');
              let msg4 = new discord.MessageEmbed()
                .setColor('RANDOM')
                .setTitle("Esse usuário não está nesta guilda!");

        member
          .ban({
            reason: msg1,
          })
          .then(() => {
            let msg2 = new discord.MessageEmbed()
            .setColor('RANDOM')
            .setTitle(`${user.tag} banido com sucesso.`);
            message.reply(msg2);
          })
          .catch(err => {
            message.reply(msg3);
            console.error(err);
          });
      } else {
        message.reply(msg4);
      }
    } else {
      let msg5 = new discord.MessageEmbed()
                  .setColor('RANDOM')
                  .setTitle("Você não mencionou o usuário para banir!");
      message.reply(msg5);
    }
  }
};
