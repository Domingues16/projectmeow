const discord = require('discord.js');
module.exports = async (client, message) => {
	let activities = [
			`meu pai é o Deto. :3`,
			`estou em ${client.guilds.cache.size} servidores com ${
				client.users.cache.size
			} usuários ;)`,
			`meu prefixo padrão é: "&" use "&help" para saber quais são meus comandos :D`,
			`tornando o seu servidor mais feliz e ativo >.<`,
			`Ixtron, best Brazilian DJ.`,
			`Meow's House: https://discord.gg/SekU3B2 ^^`,
			`O Reino: https://discord.gg/PnFrMay :>`
		],
		i = 0;
	setInterval(
		() =>
			client.user.setActivity(`${activities[i++ % activities.length]}`, {
				type: 'STREAMING'
			}),
		7000
	);
	let onchannel = client.channels.cache.get('755782399006343238');
	let embed = new discord.MessageEmbed()
		.setColor('RANDOM')
		.setTitle(
			`Estou on-line com ${client.guilds.cache.size} servidores e ${
				client.users.cache.size
			} usuários.`
		);
	onchannel
		.send(embed)
		.then(msg => {
			msg.react('761705366769369090');
			msg.delete({ timeout: 20000 });
		})
		.catch(console.error);
	client.users.cache
		.get('719141659614642197')
		.send(embed)
		.then(msg => {
			msg.react('761705366769369090');
			msg.delete({ timeout: 20000 });
		})
		.catch(console.error);
};
