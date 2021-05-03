const { MessageEmbed } = require('discord.js');
const qdb = require("quick.db");
const teyitler = new qdb.table("scaryteyit");
const scaryisimler = new qdb.table("scaryisimler");
const genel = require("../scarygenel.json");
const roller = require("../scaryroller.json");
const kanallar = require("../scarykanallar.json");

module.exports.execute = async (client, message, args) => {

  let scaryemb = new MessageEmbed().setAuthor(message.member.displayName, message.author.avatarURL({dynamic: true})).setColor("RANDOM").setFooter(genel.footer);
     if (!message.member.roles.cache.has(roller.register) && !message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(scaryemb.setDescription(`Bu komutu kullanmak için yeterli yetkiye sahip değilsin`)).then(x => x.delete({timeout: 10000}));
let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;

    let scaryisimlerinimerakediyor = scaryisimler.get(`isimler.${member.id}`);
     if (!scaryisimlerinimerakediyor) return message.channel.send(scaryemb.setDescription("İsim geçmişi temiz."))

    let scarymaziler = scaryisimler.get(`isimmiktar.${member.id}`)

  let scaryisimlerinilisteliyor = scaryisimlerinimerakediyor.length > 0 ? scaryisimlerinimerakediyor.map((value, index) => ` \`${value.guildName}\` **(<@&${value.Komut}>) [<@${value.Yetkili}>]**`) : "";

  message.channel.send(scaryemb.setDescription(`${member} Kişisinin sunucudaki eski isimleri [**${scarymaziler || 0}**]

${scaryisimlerinilisteliyor.join("\n")}`));

    

};

module.exports.configuration = {
    name: "isimler",
    aliases: ["isimler"],
    usage: "Richârd <3 Ainsworth",
    description: "Ainsworth <3 Richârd"

};

//Belirtilen kullanıcının eski isimlerini , kayıt edildiği rol ve yetkiliyi gösterir. **Ainsworth & Richard Tarafından Yapılmıştır.**