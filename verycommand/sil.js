const { MessageEmbed } = require("discord.js");
const emojiler = require("../scaryemojiler.json");
const genel = require("../scarygenel.json");
const kanallar = require("../scarykanallar.json");
const roller = require("../scaryroller.json");
module.exports.execute = async (client, message, args) => {
    
    let scaryemb = new MessageEmbed().setFooter(genel.footer).setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true })).setColor('RANDOM');  
    if (!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(scaryemb.setDescription(`Bu komudu kullanmak için gerekli izinlere sahip değilsin.`)).then(x => x.delete({timeout: 10000}));
    let miktar = Number (args[0]);
    if (!miktar || miktar < 1 || miktar > 100) return message.channel.send(scaryemb.setDescription(`Geçerli bir miktar belirtmelisin.`)).then(x => x.delete({timeout: 10000}));
    message.delete();
    message.channel.bulkDelete(miktar).then(x => message.channel.send(scaryemb.setDescription(`${client.emojis.cache.get(emojiler.pentagram)} \`${message.channel.name}\` kanalındaki **${x.size}** mesaj başarıyla silindi! ${client.emojis.cache.get(emojiler.onay)}`))).then(y => y.delete({timeout: 10000}));
};

module.exports.configuration = {
    name: "clear",
    aliases: ["sil", "temizle"],
    usage: "Richârd <3 Ainsworth",
    description: "Ainsworth <3 Richârd"
};

//Belirlenen sayıda mesaj temizler. **Ainsworth & Richard Tarafından Yapılmıştır.**