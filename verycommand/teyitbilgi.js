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
   let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;
            let erkeksayi = teyitler.get(`reg.${member.id}.erkek`);
            let kadinsayi = teyitler.get(`reg.${member.id}.kadin`);

            let erkek = erkeksayi || 0;
            let kadin = kadinsayi || 0;


  if(!member.roles.cache.get(roller.register)) {
    message.channel.send(scaryemb.setDescription(`${member} Kullanıcısı yetkili olmadığı için işlem gerçekletirilemiyor!`))
                                               } else {
  

            message.channel.send(scaryemb.setDescription(`${member} kullanıcısının kayıt istatistikleri aşşağıdaki gibidir;
              Kullanıcının **${erkek}** adet erkek kayıtı,
              Kullanıcının **${kadin}** adet kadın kayıtı bulunmaktadır`))}
    }
    module.exports.configuration = {
        name: "teyitbilgi",
        aliases: ["teyitbilgi"],
        usage: "Richârd <3 Ainsworth",
       description: "Ainsworth <3 Richârd"
    };


    //Teyit rolüne sahip insanların yaptıkları teyit stats'ını gösterir. **Ainsworth & Richard Tarafından Yapılmıştır.**