const Discord = require("discord.js");
const db = require("quick.db");
module.exports = {
	name: 'txtgame',
	run: async (client, message, args) => {
  let perm = new Discord.MessageEmbed()
    .setColor("RANDOM")
    .setTitle("Desculpe lhe falta permissões.");
  if (!message.member.hasPermission("MANAGE_CHANNELS"))
    return message.channel.send(perm);

  let join = new Discord.MessageEmbed()
    .setColor("RANDOM")
    .setTitle(`Mensagem de boas-vindas configurada.`);
  let c = new Discord.MessageEmbed()
    .setColor("RANDOM")
    .setTitle("Qual vai ser a mensagem de boas-vindas?");
  const a = args.join(" ");
  db.set(`txtgame`, `${a}`);
  const b = a;
  if (!b) {
    return message.channel.send(c);
  }
  return message.channel.send(join);
}}