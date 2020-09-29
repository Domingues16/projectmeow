const discord = require("discord.js");
const figlet = require("figlet"); // MAKE SURE TO INSTALL FIGLET PACKAGE OR CODE WONT WORK
module.exports = {
  name: "ascii",
  aliases: [],
  category: "fun",
  usage: "ascii <text>",
  description: "Returns provided text in ascii format.",
  run: async (client, message, args) => {
    let text = args.join(" ");
    if (!text) {
      return message.channel.send(`Por favor o que devo escrever?!`);
    }
    let maxlen = 20;
    if (text.length > 20) {
      return message.channel.send(
        "desculpe acime de 20 caracteres o comando não funciona!"
      );
    } // AGAIN, MAKE SURE TO INSTALL FIGLET PACKAGE!
    figlet(text, function(err, data) {
      message.channel.send(data, {
        code: "AsciiArt"
      });
    });
  }
};