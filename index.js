require('./handlers/server')();
const Discord = require('discord.js');
const client = new Discord.Client();
const config = require('./config.json');
client.config = config;
client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
client.event = new Discord.Collection();
['command'].forEach(handler => {
	require(`./handlers/${handler}`)(client);
});
const loadEvents = require('./handlers/event.js');
const load = async () => {
	await loadEvents.run(client);
};
client.on('message', async message => {
	require('./system')(client, message);
});
load();
const { GiveawaysManager } = require('discord-giveaways');
client.giveawaysManager = new GiveawaysManager(client, {
	storage: './database.json',
	default: {
		botsCanWin: false,
		embedColor: 'RANDOM',
		reaction: '761605475233431594'
	}
});
client.login(process.env.TOKEN);
