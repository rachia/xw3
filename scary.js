const { Discord, MessageEmbed, Client, WebhookClient } = require('discord.js');
const client = new Client({ ws: { properties: { $browser: "Discord iOS" } } });
const db = require("quick.db");
const fs = require("fs");
const moment = require("moment");
require("moment-duration-format");
const emojiler = require("./scaryemojiler.json");
const genel = require("./scarygenel.json");
const kanallar = require("./scarykanallar.json");
const roller = require("./scaryroller.json");

const commands = new Map();
global.commands = commands;
const aliases = new Map();
const guildInvites = new Map();
global.aliases = aliases;
global.client = client;

fs.readdir("./verycommand", (err, files) => {

    if(err) return console.error(err);

    files = files.filter(file => file.endsWith(".js"));

    console.log(`${files.length} komut yüklenecek.`);

    files.forEach(file => {

        let prop = require(`./verycommand/${file}`);

        if(!prop.configuration) return;

        console.log(`${prop.configuration.name} komutu yükleniyor!`);

        if(typeof prop.onLoad === "function") prop.onLoad(client);

        commands.set(prop.configuration.name, prop);

        if(prop.configuration.aliases) prop.configuration.aliases.forEach(aliase => aliases.set(aliase, prop));

    });

});

fs.readdir("./veryevent", (err, files) => {

    if(err) return console.error(err);

    files.filter(file => file.endsWith(".js")).forEach(file => {

        let prop = require(`./veryevent/${file}`);

        if(!prop.configuration) return;

        client.on(prop.configuration.name, prop);

    });

});

  client.on("message", (message) => {

        if (message.author.bot ||!message.content.startsWith(genel.prefix) || !message.channel || message.channel.type == "dm") return;

        let args = message.content

          .substring(genel.prefix.length)

          .split(" ");

        let command = args[0];

        let bot = message.client;

        args = args.splice(1);

        let calistirici;

        if (commands.has(command)) {

          calistirici = commands.get(command);

          calistirici.execute(bot, message, args);

        } else if (aliases.has(command)) {

          calistirici = aliases.get(command);

          calistirici.execute(bot, message, args);

        }

  });


  /////////////// ACILIS
client.on("ready", async () => {
  client.user.setPresence({ activity: { name: genel.activity }, status: "online" });
  console.log("Richard kaldırdı, Ainsworth vurdu ve gooooooooooool")
  client.guilds.cache.forEach(guild => {
    guild.fetchInvites().then(invites => guildInvites.set(guild.id, invites)).catch(err => console.log(err));
  });
  });
  /////////////// ACILIS

  ///////////// GIRIS VE CIKIS
client.on("inviteCreate", async invite => guildInvites.set(invite.guild.id, await invite.guild.fetchInvites()));
//////////
client.on("inviteDelete", invite => setTimeout(async () => { guildInvites.set(invite.guild.id, await invite.guild.fetchInvites()); }, 5000));
//////////

client.on("guildMemberAdd", async (member) => {    
  if (member.user.bot) return;
  let cachedInvites = guildInvites.get(member.guild.id);
  let newInvites = await member.guild.fetchInvites();  
  let usedInvite = newInvites.find(inv => cachedInvites.get(inv.code).uses < inv.uses) || cachedInvites.find(inv => !newInvites.has(inv.code)) || {code: member.guild.vanityURLCode, uses: null, inviter: {id: null}};
  let daveteden = client.users.cache.get(usedInvite.inviter.id) || {id: member.guild.id};
      db.add(`davetettim_${usedInvite.inviter.id}_${member.guild.id}`, +1);
      db.set(`bunudavet_${member.id}`, usedInvite.inviter.id);
      let davetsayi;
        davetsayi = await db.fetch(`davetettim_${usedInvite.inviter.id}_${member.guild.id}`);
    
    let davetsayi2 = await db.fetch(`davetettim_${usedInvite.inviter.id}_${member.guild.id}`);
    var toplamüye = member.guild.memberCount;
    let scaryemb = new MessageEmbed().setFooter(genel.footer).setColor('RANDOM');  
    let memberDay = (Date.now() - member.user.createdTimestamp);
    let createAt = moment.duration(memberDay).format("Y [Yıl], M [Ay], W [Hafta], DD [Gün]").replace(" 0 Hafta,","").replace("0 Yıl,","").replace(" 0 Ay,","").replace(" 00 Gün,","").replace(" 00 Hafta,","").replace("00 Yıl,","").replace(" 00 Ay,","").replace(" 00 Gün,","");
    let createAt2 = moment.duration(memberDay).format("DD [Gün], HH [saat], mm [dakika]").replace(" 0 Gün,","").replace("0 Saat,","").replace(" 0 Dakika,","").replace(" 00 Hafta,","").replace("00 Yıl,","").replace(" 00 Ay,","").replace(" 00 Gün,","");
  let isMemberFake = (Date.now()-member.user.createdTimestamp) < 1000 * 60 * 60 * 24 * 7;

  const webhookClient = new WebhookClient('ID', 'TOKEN'); //Webhook (girişmesajı) doldurulması gerek.
  
  if (isMemberFake) {   
 webhookClient.send(`🎉 ${genel.servername}'a hoşgeldin ${member}! Hesabın \`${createAt2} önce\` açılmış [${client.emojis.cache.get(emojiler.hata)}]

Sunucu kurallarımız \`#kurallar\` kanalında belirtilmiştir. Cezaların kuralları okuduğun varsayılarak işlenecektir.

Seninle birlikte **${toplamüye}** üyeye ulaştık, **Yazılı veya etiket tagımızı** alarak kayıt olabilisin.

**${daveteden}** \`${davetsayi}\` davet sayısına ulaştı. 🎉`) 
    member.roles.add(roller.cezali)
   } else { 
 webhookClient.send(`🎉 ${genel.servername}'a hoşgeldin ${member}! Hesabın \`${createAt} önce\` açılmış [${client.emojis.cache.get(emojiler.onay)}]

Sunucu kurallarımız \`#kurallar\` kanalında belirtilmiştir. Cezaların kuralları okuduğun varsayılarak işlenecektir.

Seninle birlikte **${toplamüye}** üyeye ulaştık, sol tarafta bulunan **Ses teyit odalarına** girerek kayıt olabilisin.

**${daveteden}** \`${davetsayi2}\` davet sayısına ulaştı. 🎉`)
      member.roles.add(roller.unregister)}
});
  client.on("guildMemberRemove", async member => {
    let davetçi = await db.fetch(`bunudavet_${member.id}`);
    const daveteden = member.guild.members.cache.get(davetçi);
          db.add(`davetettim_${davetçi}_${member.guild.id}`, -1);
  });

  ///////////// GIRIS VE CIKIS

client.login(genel.token);



//**Ainsworth & Richard Tarafından Yapılmıştır.**