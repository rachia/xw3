const { MessageEmbed } = require('discord.js');
const qdb = require("quick.db");
const teyitler = new qdb.table("scaryteyit");
const scaryisimler = new qdb.table("scaryisimler");
const emojiler = require("../scaryemojiler.json");
const genel = require("../scarygenel.json");
const kanallar = require("../scarykanallar.json");
const roller = require("../scaryroller.json");

module.exports.execute = async (client, message, args) => {

  let scaryemb = new MessageEmbed().setAuthor(message.member.displayName, message.author.avatarURL({dynamic: true})).setTimestamp().setColor("RANDOM").setFooter(genel.footer);
  let yazilacakisim;
    if (!message.member.roles.cache.has(roller.register) && !message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(scaryemb.setDescription(`Bu komutu kullanmak için yeterli yetkiye sahip değilsin`)).then(x => x.delete({timeout: 10000}));
  
    let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
    let isim = args[1];
    let yaş = Number(args[2]);


    yazilacakisim = `${genel.tag} ${isim} | ${yaş}`
   

  
if(!member || !isim || !yaş) return message.channel.send(scaryemb.setDescription(`Komutu doğru kullanmalısın. \`Örnek: ${genel.prefix || '.'}i @Discorder/ID İsim Yaş\``)).then(x => x.delete({timeout: 10000}));

    if (message.member.roles.highest.position <= member.roles.highest.position) return message.channel.send(scaryemb.setDescription(`Kayıt etmeye çalıştığın kişi seninle aynı yetkide veya senden daha üstte olduğu için işlemi gerçekleştiremedim.`)).then(x => x.delete({timeout: 10000}));

    member.setNickname(`${yazilacakisim}`).catch();

      message.react(emojiler.onay)

    

let cinsiyet;

 if (member.roles.cache.has(roller.erkek1) && !member.roles.cache.has(roller.kadin1)) cinsiyet = roller.erkek1

 if (member.roles.cache.has(roller.kadin1) && !member.roles.cache.has(roller.erkek1)) cinsiyet = roller.kadin1

 if (!member.roles.cache.has(roller.erkek1) && !member.roles.cache.has(roller.kadin1)) cinsiyet = roller.unregister  

 scaryisimler.push(`isimler.${member.id}`, {

        guildName: yazilacakisim,
        Name: isim,
        Komut: cinsiyet,
        Yetkili: message.author.id

    });

            scaryisimler.add(`isimmiktar.${member.id}`, +1);

};

module.exports.configuration = {
    name: "isim",
    aliases: ["nick","i","isim"],
    usage: "Richârd <3 Ainsworth",
    description: "Ainsworth <3 Richârd"

};

//Kullancının ismini değiştirir. **Ainsworth & Richard Tarafından Yapılmıştır.**