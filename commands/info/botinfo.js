const discord = require('discord.js');
const { version } = require('discord.js');
const moment = require('moment');
module.exports = {
	name: 'botinfo',
	aliases: ['bot', 'bi', 'info', 'stats'],
	run: async (client, message, args) => {
		let totalSeconds = client.uptime / 1000;
		let days = Math.floor(totalSeconds / 86400);
		let hours = Math.floor(totalSeconds / 3600);
		totalSeconds %= 3600;
		let minutes = Math.floor(totalSeconds / 60);
		let seconds = totalSeconds % 60;
		let uptime = `${days.toFixed()}d, ${hours.toFixed()}h, ${minutes.toFixed()}m, ${seconds.toFixed()}s`;
		let vpsping = new Date() - message.createdAt + 'ms.';
		let apiping = Math.floor(client.ws.ping) + 'ms.';
		let createdAt = moment(client.user.createdAt).format('DD/MM/YYYY');
		const embed = new discord.MessageEmbed()

			.setColor('RANDOM')

			.setTitle('__Minhas informações:__')
			.setDescription(
				`🔠 | Meu nome: ${client.user.username}.\n🆔️ | Meu ID: ${
					client.user.id
				}.\n🔧 | Meu Criador: Deto.#6249.\n⚙ | Discord.js: v${version}.\n🔩 | Node.js: ${
					process.version
				}.\n🗓 | Data de criação: ${createdAt}.\n📊 | Uso da memória RAM: ${(
					process.memoryUsage().heapUsed /
					1024 /
					1024
				).toFixed(2)}MB.\n🧰 | Uso da CPU: ${(
					process.cpuUsage().system /
					1024 /
					1024
				).toFixed(2)}%.\n💻 | Plataforma: ${process.platform} ${
					process.arch
				}.\n🛡 | Número de servidores: ${
					client.guilds.cache.size
				}.\n👥 | Número de usuários: ${
					client.users.cache.size
				}.\n📀 | Número de comandos: ${
					client.commands.size
				}.\n📺 | Número de canais: ${
					client.channels.cache.size
				}.\n⏱ | Tempo ativo: ${uptime}. \n🛰 | Latência da VPS: ${vpsping}\n📡 | Latência da API: ${apiping}`
			);
		message.channel.send(embed);
	}
};
