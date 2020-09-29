const weather = require('weather-js');
const discord = require('discord.js');

module.exports = {
	name: 'weather',
	description: 'Get the weather of anywhere',
	category: 'info',
	usage: 'weathet <>',
	run: (client, message, args) => {
		if (!args.length) {
			return message.channel.send('Diga o local.');
		}

		weather.find({ search: args.join(' '), degreeType: 'C' }, function(
			err,
			result
		) {
			try {
				let embed = new discord.MessageEmbed()
					.setTitle(`Clima - ${result[0].location.name}`)
					.setColor('RANDOM')
					.setDescription(
						'As unidades de temperatura podem ser diferentes em algum momento.'
					)
					.addField(
						'Temperatura:',
						`${result[0].current.temperature} Celcius`,
						true
					)
					.addField('Céu:', result[0].current.skytext, true)
					.addField('Humidade:', result[0].current.humidity, true)
					.addField('Velocidade do vento:', result[0].current.windspeed, true) //What about image
					.addField(
						'Observação do tempo:',
						result[0].current.observationtime,
						true
					)
					.addField('Observação do vento:', result[0].current.winddisplay, true)
					.setThumbnail(result[0].current.imageUrl);
				message.channel.send(embed);
			} catch (err) {
				return message.channel.send(
					'Incapaz de obter os dados de determinada localização.'
				);
			}
		});
		//LETS CHECK OUT PKG
	}
};
