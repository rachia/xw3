const { Discord, MessageEmbed } = require("discord.js");
const emojiler = require("../scaryemojiler.json");
const genel = require("../scarygenel.json");
const kanallar = require("../scarykanallar.json");
const roller = require("../scaryroller.json");
module.exports.execute = async (client, message, args) => {
     let scaryemb = new MessageEmbed().setFooter(genel.footer).setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true })).setColor('RANDOM');  
   if (!message.member.roles.cache.has(roller.register) && !message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(scaryemb.setDescription(`Bu komudu kullanmak için gerekli izinlere sahip değilsin.`)).then(x => x.delete({timeout: 10000}));
  
  let scarysunucu = message.guild.memberCount;

  let scaryonline = message.guild.members.cache.filter(
    only => only.presence.status != "offline"
  ).size;

  let scarytagli = message.guild.members.cache.filter(m => m.user.username.includes(genel.tag)).size;
const voiceChannels = message.guild.channels.cache.filter(c => c.type === 'voice');
  let scaryses = 0;
  for (const [id, voiceChannel] of voiceChannels) scaryses += voiceChannel.members.size;
    let sestag = message.guild.members.cache.filter(s => s.user.username.includes(genel.tag) && s.voice.channel).size
  let scaryyetkili = message.guild.members.cache.filter(a => a.roles.cache.has(roller.register)).size;

  let scarybooster = message.guild.premiumSubscriptionCount
    
  message.channel.send(scaryemb.setDescription(`Seslilerimizde **${scaryses}** Üye bulunmaktadır.
Seslilerimizde **${sestag}** Taglı üyemiz bulunmaktadır. 
~~--------------------------------------------------~~
Sunucumuzda **${scarysunucu}** (**${scaryonline}**) Üye bulunmaktadır.
Sunucumuzda **${scarytagli}**   Taglı bulunmaktadır.
Sunucumuzda **${scaryyetkili}** Yetkili bulunmaktadır. 
Sunucumuzda **${scarybooster}** Takviye Bulunmaktadır.`))
};

module.exports.configuration = {
    name: "say",
    aliases: ["onlinesayi"],
    usage: "Richârd <3 Ainsworth",
    description: "Ainsworth <3 Richârd"
};

//Sunucu sesli , taglı , normal üyelerin aktifliğini ve sayısını gösterir. **Ainsworth & Richard Tarafından Yapılmıştır.**