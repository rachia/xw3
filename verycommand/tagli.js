const { Discord, MessageEmbed } = require("discord.js");
const emojiler = require("../scaryemojiler.json");
const genel = require("../scarygenel.json");
const kanallar = require("../scarykanallar.json");
const roller = require("../scaryroller.json");
module.exports.execute = async (client, message, args) => {
    if(![(roller.developer)].some(role => message.member.roles.cache.get(role)) && (!message.member.hasPermission("ADMINISTRATOR"))) 
    return message.channel.send(new MessageEmbed().setDescription(`${message.author} Komutu kullanmak için yetkin bulunmamakta.`).setColor('RANDOM').setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true })).setTimestamp().setFooter(genel.footer)).then(x => x.delete({timeout: 5000}));
    
    let scarytagsizlar = message.guild.members.cache.filter(m => m.user.username.includes(genel.tag) && !m.roles.cache.has(roller.family))
    
        scarytagsizlar.forEach(r => {
    r.roles.add(roller.family)
    })
    let scaryemb = new MessageEmbed().setFooter(genel.footer).setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true })).setColor('RANDOM');  
    message.channel.send(scaryemb.setDescription(`Sunucuda taglı rolü olmayan \`${scarytagsizlar.size}\` kişiye taglı rolü verildi! ${client.emojis.cache.get(emojiler.onay)}`))
};

module.exports.configuration = {
    name: "tagli",
    aliases: [],
    usage: "Richârd <3 Ainsworth",
    description: "Ainsworth <3 Richârd"
};

//Sunucuda tagı olup rolü olmayan kişilere , taglı rolünü verir. **Ainsworth & Richard Tarafından Yapılmıştır.**