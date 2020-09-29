const discord = require('discord.js');

module.exports = {
	name: 'teste',
	run: async (client, message, args) => {
		request(
			{
				method: 'GET',
				url: URL_OF_AVATAR,
				encoding: null
			},
			(err, res, image) => {
				if (err)
					return msg.client.sendMessage(
						msg.channel,
						'Failed to get a valid image.'
					);

				msg.client.setAvatar(image, err => {
					if (err)
						return msg.client.sendMessage(
							msg.channel,
							'Failed setting avatar.'
						);
					return msg.client.sendMessage(msg.channel, 'Changed avatar.');
				});
			}
		);
	}
};
