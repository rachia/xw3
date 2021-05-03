const Discord = require('discord.js')
const emojiler = require("../scaryemojiler.json");
const genel = require("../scarygenel.json");
const kanallar = require("../scarykanallar.json");
const roller = require("../scaryroller.json");

module.exports.execute = async (client, message, args) => {
  
     let scaryemb = new Discord.MessageEmbed().setFooter(genel.footer).setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true })).setColor('RANDOM');  
    if (!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(scaryemb.setDescription(`Bu komudu kullanmak için gerekli izinlere sahip değilsin.`)).then(x => x.delete({timeout: 10000}));
 
  let user = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
    if (!user) return message.channel.send(scaryemb.setDescription(`Komutu doğru kullanmalısın. \`Örnek: ${genel.prefix || '.'}vip @Richârd/ID\``)).then(x => x.delete({timeout: 10000}));
 

  user.roles.add(roller.vip)
  message.react(emojiler.tik)  
  
};

module.exports.configuration = {
    name: "vip",
    aliases: ["ozel"],
    usage: "Richârd <3 Ainsworth",
    description: "Ainsworth <3 Richârd"
};

//Etiketlenen üyeye Özel Üye rolü verir. **Ainsworth & Richard Tarafından Yapılmıştır.**
