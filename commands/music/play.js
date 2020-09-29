const search = require('yt-search');
const ytdl = require('ytdl-core-discord');
module.exports = {
	name: 'play',
	run: async (client, message, args) => {
		const s = args.join(' ');
		try {
			search(s, (err, result) => {
				if (err) {
					throw err;
				} else if (result && result.videos.length > 0) {
					const song = result.videos[0];
					const queue = client.queues.get(message.guild.id);
					if (queue) {
						queue.songs.push(song);
						client.queues.set(message.guild.id, queue);
					} else playSong(client, message, song);
				} else {
					return message.reply('desculpe, não encontrei o que você desejava!');
				}
			});
		} catch (e) {
			console.error(e);
		}

		const playSong = async (client, message, song) => {
			let queue = client.queues.get(message.member.guild.id);
			if (!song) {
				if (queue) {
					queue.connection.disconnect();
					return client.queues.delete(message.member.guild.id);
				}
			}
			if (!message.member.voice.channel) {
				return message.reply(
					'você precisa estar em um canal de voz para reproduzir uma música!'
				);
			}
			if (!queue) {
				const conn = await message.member.voice.channel.join();
				queue = {
					volume: 10,
					connection: conn,
					dispatcher: null,
					songs: [song]
				};
			}
			queue.dispatcher = await queue.connection.play(
				await ytdl(song.url, { highWaterMark: 1 << 25, filter: 'audioonly' }),
				{
					type: 'opus'
				}
			);
			queue.dispatcher.on('finish', () => {
				queue.songs.shift();
				playSong(client, message, queue.songs[0]);
			});
			client.queues.set(message.member.guild.id, queue);
		};
	}
};
