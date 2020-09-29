const { MessageEmbed } = require('discord.js');
const sendError = require('../../util/error');

module.exports = {
	name: 'queue',
	description: 'To show the server songs queue',
	usage: '',
	aliases: ['q', 'list', 'songlist', 'song-list'],
	run: async (client, message, args) => {
		const serverQueue = client.queues.get(message.member.guild.id);
			
		if (!serverQueue)
			return sendError(
				'There is nothing playing in this server.',
				message.channel
			);

		let queue = new MessageEmbed()
			.setAuthor(
				'Server Songs Queue',
				'https://raw.githubusercontent.com/SudhanPlayz/Discord-MusicBot/master/assets/Music.gif'
			)
			.setColor('BLUE')
			.addField('Now Playing', serverQueue.songs[0].title, true)
			.addField('Text Channel', serverQueue.textChannel, true)
			.addField('Voice Channel', serverQueue.voiceChannel, true)
			.setDescription(
				serverQueue.songs
					.map(song => {
						if (song === serverQueue.songs[0]) return;
						return `**-** ${song.title}`;
					})
					.join('\n')
			)
			.setFooter('Currently Server Volume is ' + serverQueue.volume);
		if (serverQueue.songs.length === 1)
			queue.setDescription(
				`No songs to play next add songs by \`\`&play <song_name>\`\``
			);
		message.channel.send(queue);
	}
};
