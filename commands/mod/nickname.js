const discord = require('discord.js')

module.exports = {
	name:"nickname",
	category:"adm",
	run: async (client, message, args) => {
	
	const member = message.mentions.members.first()
	if(!member){
		return message.channel.send(`Por favor fale alguém para mudar o nickname!`)
	}
	
	let hnnn = args.slice(1).join(" ")
	if(!hnnn) return message.channel.send(`Qual o nick que devo por no usuário?`)
	
	member.setNickname(hnnn, {
		reason : 'sistema de troca de nickname do bot'
	})
	
	message.channel.send(`O nickname de ${member} foi trocado com sucesso.`)
	}
}