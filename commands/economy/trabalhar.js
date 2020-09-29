const db = require('quick.db');
const ms = require('parse-ms');

module.exports = {
	name: 'trabalhar',
	aliases: ['work'],
	run: async (client, message, args) => {
		let policial = ['prendeu um ladrão', 'deu uma multa'];
		let paramedico = [
			'socorreu uma pessoa',
			'uso um desfibrilador para reanimar uma pessoa'
		];
		let bombeiro = ['apagou um incêndio', 'salvou uma pessoa de um lugar alto'];

		let timeout = 1.8e7; // Definindo um tempo para utilizar o comando, no caso desse, 5 horas (em milisegundos)
		let quantia = Math.floor(Math.random() * 1000) + 400;
		let trabalho = await db.get(`work_${message.author.id}`);
		if (trabalho !== null && timeout - (Date.now() - trabalho) > 0) {
			let time = ms(timeout - (Date.now() - trabalho));

			message.channel.send(
				`Você ja trabalhou recentemente.\nVocê podera trabalhar novamente em: **${
					time.hours
				}h ${time.minutes}m ${time.seconds}s**`
			);
		} else {
			let emprego = await db.get(`emprego_${message.author.id}`);
			if (emprego === null) {
				return message.reply(
					`Escolha um trabalho usando o comando de \`empregos\`.`
				);
			} else {
			}
			if (emprego === 1) {
				message.channel.send(
					`🚓 | Você ${
						policial[Math.floor(Math.random() * policial.length)]
					} e recebeu ${quantia} moedas.`
				);
				db.add(`money_${message.author.id}`, quantia);
				db.set(`work_${message.author.id}`, Date.now());
			}

			if (emprego === 2) {
				message.channel.send(
					`🚑 | Você ${
						paramedico[Math.floor(Math.random() * paramedico.length)]
					} e recebeu ${quantia} moedas.`
				);
				db.add(`money_${message.author.id}`, quantia);
				db.set(`work_${message.author.id}`, Date.now());
			}
			if (emprego === 3) {
				message.channel.send(
					`🚒 | Você ${
						dcstaff[Math.floor(Math.random() * dcstaff.length)]
					} e recebeu ${quantia} moedas.`
				);
				db.add(`money_${message.author.id}`, quantia);
				db.set(`work_${message.author.id}`, Date.now());
			}
		}
	}
};
