const { MessageEmbed } = require('discord.js');
const qdb = require("quick.db");
const teyitler = new qdb.table("scaryteyit");
const scaryisimler = new qdb.table("scaryisimler");
const emojiler = require("../scaryemojiler.json");
const genel = require("../scarygenel.json");
const kanallar = require("../scarykanallar.json");
const roller = require("../scaryroller.json");
module.exports.execute = async (client, message, args) => {

    let scaryemb = new MessageEmbed().setFooter(genel.footer).setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true })).setColor('RANDOM');  
   if (!message.member.roles.cache.has(roller.register) && !message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(scaryemb.setDescription(`Bu komutu kullanmak için yeterli yetkiye sahip değilsin`)).then(x => x.delete({timeout: 10000}));
   
    let yazilacakisim;

    let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
    let isim = args[1];
    let yaş = Number(args[2]);
   if (!member || !isim) return message.channel.send(scaryemb.setDescription(`Komutu doğru kullanmalısın. \`Örnek: ${genel.prefix || '.'}kayıt @Richârd/ID İsim Yaş\``)).then(x => x.delete({timeout: 10000}));

    let collector = message.createReactionCollector((reaction, user) => user.id === message.author.id);
   
       if (member.user.username.includes(genel.tag)) {
      yazilacakisim = `${genel.tag} ${isim} | ${yaş}`    
                                                     }

      if (!member.user.username.includes(genel.tag)) {
      yazilacakisim = `${genel.untag} ${isim} | ${yaş}`    
                                                     }

                                                     
    let erkek1 = message.guild.roles.cache.get(roller.erkek1);
    let erkek2 = message.guild.roles.cache.get(roller.erkek2);
    let erkek3 = message.guild.roles.cache.get(roller.erkek3);
    let kadin1 = message.guild.roles.cache.get(roller.kadin1);
    let kadin2 = message.guild.roles.cache.get(roller.kadin2);
    let kadin3 = message.guild.roles.cache.get(roller.kadin3);
    let kayitsizRolu = message.guild.roles.cache.get(roller.unregister);
  

        await message.react(emojiler.erkek) //erkek emojisi
        await message.react(emojiler.kadin) //kız emojisi

        collector.on("collect", async(reaction, user) => {
            await message.reactions.removeAll()
            if (reaction.emoji.id == emojiler.erkek) { //erkek
                member.setNickname(`${yazilacakisim}`).catch();
                
                if (erkek1) {

                    member.roles.add(roller.erkek1)
                    member.roles.add(roller.erkek1)
                    member.roles.add(roller.erkek2)
                    member.roles.add(roller.erkek2)
                    member.roles.add(roller.erkek3)
                    member.roles.add(roller.erkek3)
                    member.roles.remove(roller.unregister);
                    member.roles.remove(roller.unregister);

            if (member.user.username.includes(genel.tag) && !member.roles.cache.has(roller.family)) {
                member.roles.add(roller.family);
                member.roles.add(roller.family);
            } 
                   }
            teyitler.add(`reg.${message.author.id}.erkek`, +1);
            scaryisimler.push(`isimler.${member.id}`, {
                guildName: yazilacakisim,
                Name: isim,
                Yetkili: message.author.id,
                Komut: roller.erkek1
            });
            scaryisimler.add(`isimmiktar.${member.id}`, +1);
            message.react(emojiler.onay)
           }

            if (reaction.emoji.id == emojiler.kadin) { //kız
                member.setNickname(`${yazilacakisim}`).catch();

            if (kadin1) {
    
                member.roles.add(roller.kadin1)
                member.roles.add(roller.kadin1)
                member.roles.add(roller.kadin2)
                member.roles.add(roller.kadin2)
                member.roles.add(roller.kadin3)
                member.roles.add(roller.kadin3)
                member.roles.remove(roller.unregister);
                member.roles.remove(roller.unregister);

            if (member.user.username.includes(genel.tag) && !member.roles.cache.has(roller.family)) {
                member.roles.add(roller.family);
                member.roles.add(roller.family);
            } 
                   }
            teyitler.add(`reg.${message.author.id}.kadin`, +1);
            scaryisimler.push(`isimler.${member.id}`, {
                guildName: yazilacakisim,
                Name: isim,
                Yetkili: message.author.id,
                Komut: roller.kadin1
            });
            scaryisimler.add(`isimmiktar.${member.id}`, +1);
             message.react(emojiler.onay)
            }
        })
    }
    module.exports.configuration = {
        name: "kayıt",
        aliases: ["k", "e", "kız", "erkek", "kayıt"],
        usage: "Richârd <3 Ainsworth",
        description: "Ainsworth <3 Richârd"
    };


//Belirlenen üyeyi kaydeder. (Emojiye Basım Gerektirir) **Ainsworth & Richard Tarafından Yapılmıştır.**