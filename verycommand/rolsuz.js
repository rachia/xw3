const { Discord, MessageEmbed } = require("discord.js");
const emojiler = require("../scaryemojiler.json");
const genel = require("../scarygenel.json");
const kanallar = require("../scarykanallar.json");
const roller = require("../scaryroller.json");
module.exports.execute = async (client, message, args) => {
    if(![(roller.developer)].some(role => message.member.roles.cache.get(role)) && (!message.member.hasPermission("ADMINISTRATOR"))) 
    return message.channel.send(new MessageEmbed().setDescription(`${message.author} Komutu kullanmak için yetkin bulunmamakta.`).setColor('RANDOM').setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true })).setTimestamp().setFooter(genel.footer)).then(x => x.delete({timeout: 5000}));
    
    let scaryrolsuzler = message.guild.members.cache.filter(m => m.roles.cache.filter(r => r.id !== message.guild.id).size == 0)
    
        scaryrolsuzler.forEach(r => {
    r.roles.add(roller.kayitsiz)
    })
    let scaryemb = new MessageEmbed().setFooter(genel.footer).setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true })).setColor('RANDOM');  
    message.channel.send(scaryemb.setDescription(`Sunucuda rolü olmayan \`${scaryrolsuzler.size}\` kişiye kayıtsız rolü verildi! ${client.emojis.cache.get(emojiler.onay)}`))
};

module.exports.configuration = {
    name: "rolsuz",
    aliases: [],
    usage: "Richârd <3 Ainsworth",
    description: "Ainsworth <3 Richârd"
};

//Üzerinde rol olmayan kişilere kayıtsız rolü verir. **Ainsworth & Richard Tarafından Yapılmıştır.**