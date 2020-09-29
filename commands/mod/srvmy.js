const Discord = require("discord.js");
const db = require('quick.db')
 
module.exports = {
	name: 'srvmy',
	run: async (client, message, args) => {
 

 
var servers =client.guilds.cache.size
        var num = 0;
        var pagina = 1;
        var totalPages = parseInt(client.guilds.cache.size/10+1);
 
        var embed = new Discord.MessageEmbed()
 
        .setDescription(`${servers.cache.map(se=> `Nome: \`${se.name}\` - ID: \`${se.id}\``).slice(0,10).join('\n')}`)
        .setFooter(`Página ${pagina} de ${totalPages} (${bot.guilds.cache.size} servidores encontrados.)`, message.author.displayAvatarURL())
        .setAuthor('Todas as guilds em que estou:', bot.user.displayAvatarURL())
        .setColor('#f0a819')
        .setThumbnail(bot.user.displayAvatarURL())
        message.channel.send(embed).then(async ser => {
 
            if(servers.cache.size > 10) {
 
                await ser.react("⬅");
                await ser.react("➡");
 
                const voltar = ser.createReactionCollector((r, u) => r.emoji.name === "⬅" && u.id === message.author.id, { time: 100000 });
                const proximo = ser.createReactionCollector((r, u) => r.emoji.name === "➡" && u.id === message.author.id, { time: 100000 });
 
                            voltar.on("collect", async r => {
                                if(pagina !== 1) {
                                    num = num-10
                                    num = num.toString().length > 1 ? num-parseInt(num.toString().slice(num.toString().length-1)) : 0
                                    pagina -= 1
                                    var embed = new Discord.MessageEmbed()
 
                                .addField(`Servidores:`, `${servers.cache.map(se=> `Nome: \`${se.name}\` - ID: \`${se.id}\``).slice(pagina*10-10,pagina*10).join('\n')}`)
                                .setFooter(`Página ${pagina} de ${totalPages} (${bot.guilds.cache.size} servidores encontrados.)`, message.author.displayAvatarURL())
                                .setColor('#f0a819')
                                .setAuthor('Todas as guilds em que estou:', bot.user.displayAvatarURL())
                                .setThumbnail(bot.user.displayAvatarURL())
                                ser.edit(embed)
                                r.users.remove(message.author)
                                } else {
                                    pagina = totalPages
                                    num = totalPages*10-20
 
                                    var embedb = new Discord.MessageEmbed()
 
                                    .setDescription(`${servers.cache.map(se=> `Nome: \`${se.name}\` - ID: \`${se.id}\``).slice(totalPages*10-10,pagina*10).join('\n')}`)
                                    .setFooter(`Página ${pagina} de ${totalPages} (${bot.guilds.cache.size} servidores encontrados.)`, message.author.displayAvatarURL())
                                    .setThumbnail(bot.user.displayAvatarURL())
                                    .setAuthor('Todas as guilds em que estou:', bot.user.displayAvatarURL())
                                    .setColor('#f0a819')
                                ser.edit(embedb)
 
                                r.users.remove(message.author)
                                }
                            })
 
                            proximo.on("collect", async r => {
                                if(pagina !== totalPages) {
                                    num = num.toString().length > 1 ? num-parseInt(num.toString().slice(num.toString().length-1)) : 0
                                    num = num+10
                                    pagina += 1
 
                                    var embedc = new Discord.MessageEmbed()
 
                                    .setDescription(`${servers.cache.map(se=> `Nome: \`${se.name}\` - ID: \`${se.id}\``).slice(pagina*10-10,pagina*10).join('\n')}`)
                                    .setFooter(`Página ${pagina} de ${totalPages} (${bot.guilds.cache.size} servidores encontrados.)`, message.author.displayAvatarURL())
                                    .setThumbnail(bot.user.displayAvatarURL())
                                    .setAuthor('Todas as guilds em que estou:', bot.user.displayAvatarURL())
                                    .setColor('#f0a819')
                                ser.edit(embedc)
 
                                r.users.remove(message.author)
                                } else {
                                    pagina = 1
                                    num = 0
 
                                    var embedd = new Discord.MessageEmbed()
 
                                    .setDescription(`${servers.cache.map(se=> `Nome: \`${se.name}\` - ID: \`${se.id}\``).slice(0,pagina*10).join('\n')}`)
                                    .setFooter(`Página ${pagina} de ${totalPages} (${bot.guilds.cache.size} servidores encontrados.)`, message.author.displayAvatarURL())
                                    .setThumbnail(bot.user.displayAvatarURL())
                                    .setAuthor('Todas as guilds em que estou:', bot.user.displayAvatarURL())
                                    .setColor('#f0a819')
                                    ser.edit(embedd)
 
                                    r.users.remove(message.author)
                    }
                })
            }
        })
    }
}