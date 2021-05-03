const { MessageEmbed } = require('discord.js');
const emojiler = require("../scaryemojiler.json");
const genel = require("../scarygenel.json")
const kanallar = require("../scarykanallar.json");
const roller = require("../scaryroller.json");
module.exports.execute = async (client, message, args) => {
  
  let scaryemb = new MessageEmbed().setAuthor(message.member.displayName, message.author.avatarURL({dynamic: true})).setTimestamp().setColor("RANDOM").setFooter(genel.footer);
  if (!message.member.roles.cache.has(roller.booster)) return message.channel.send(scaryemb.setDescription(`Bu komutu kullanmak için yeterli yetkiye sahip değilsin`)).then(x => x.delete({timeout: 10000}));
 let yazilacakisim;

let isim = args.slice(0).join(` `)
 
       if (message.member.user.username.includes(genel.tag)) {
      yazilacakisim = `${genel.tag} ${isim}`    
                                                     }

      if (!message.member.user.username.includes(genel.tag)) {
      yazilacakisim = `${genel.untag} ${isim}`    
                                                     }
 if (!isim) return message.channel.send(scaryemb.setDescription(`Komutu doğru kullanmalısın. \`Örnek: ${genel.prefix || '.'}booster isim\``))


message.guild.members.cache.get(message.author.id).setNickname(`${yazilacakisim}`)
  message.react(emojiler.onay)


};


module.exports.configuration = {
    name: "rich",
    aliases: ["booster"],
    usage: "Richârd <3 Ainsworth",
    description: "Ainsworth <3 Richârd"
};

//Takviye yapan kullanıcının bu komutla ismini değiştirmesini sağlar. **Ainsworth & Richard Tarafından Yapılmıştır.**