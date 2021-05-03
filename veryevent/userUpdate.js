const { Discord, MessageEmbed } = require("discord.js");
const emojiler = require("../scaryemojiler.json");
const genel = require("../scarygenel.json");
const kanallar = require("../scarykanallar.json");
const roller = require("../scaryroller.json");

module.exports = (oldUser, newUser) => {

    if (oldUser.bot || newUser.bot) return;
        let scarysunucu = client.guilds.cache.get(genel.server);

        let scarytagaldi = new MessageEmbed().setTimestamp().setFooter(genel.footer).setColor("GREEN")
        let scarytagsaldi = new MessageEmbed().setTimestamp().setFooter(genel.footer).setColor("RED")

        if (!oldUser.username.includes(genel.tag) && newUser.username.includes(genel.tag)) {
            if (newUser.manageable) {
                    newUser.roles.add(roller.family);
                       if(user.manageable) newUser.setNickname(newUser.displayName.replace(genel.untag, genel.tag)).catch();
                       if (kanallar.taglog) { kanallar.taglog.send(scarytagaldi.setDescription(`${newUser} adlı üye tagımızı aldığı için kendisine ekip rolü verildi. ${client.emojis.cache.get(emojiler.onay)}`))}}
        };

        if (oldUser.username.includes(genel.tag) && !newUser.username.includes(genel.tag)) {
             if (newUser.manageable) {
                 if (!newUser.roles.cache.has(roller.register)) {
                      newUser.roles.roles.remove(roller.family);
                      if(user.manageable) newUser.setNickname(newUser.displayName.replace(genel.tag, genel.untag)).catch();
                      if (kanallar.taglog) { kanallar.taglog.send(scarytagsaldi.setDescription(`${newUser} adlı üye tagımızı bıraktığı için kendisinden ekip rolü alındı. ${client.emojis.cache.get(emojiler.hata)}`))}
                    } else {
                        if (newUser.roles.cache.has(roller.erkek)) {
                        	let ekipRolu = newUser.guild.roles.cache.get(genel.family);
					        Newuser.roles.remove(user.roles.cache.filter(rol => ekipRolu.position <= rol.position)).catch();
                            if (kanallar.taglog) { kanallar.taglog.send(scarytagsaldi.setDescription(`${newUser} adlı yetkili tagımızı bıraktığı için kendisinden ekip rolü ve yetkileri alındı. ${client.emojis.cache.get(emojiler.hata)}`))}
	                        if(user.manageable) newUser.setNickname(newUser.displayName.replace(genel.tag, genel.untag)).catch();
                            return;
                        }
                        if (newUser.roles.cache.has(roller.kadin)) {
                            if (kanallar.taglog) { kanallar.taglog.send(scarytagsaldi.setDescription(`${newUser} adlı yetkili tagımızı bıraktığı için kendisinden ekip rolü ve yetkileri alındı. ${client.emojis.cache.get(emojiler.hata)}`))}
                            newUser.roles.roles.remove(roller.family);
                        if(user.manageable) newUser.setNickname(newUser.displayName.replace(genel.tag, genel.untag)).catch();
                            return;
                        }
                    }
             }
        }

};

module.exports.configuration = {
    name: "userUpdate"
  }


  //**Ainsworth & Richard Tarafından Yapılmıştır.**