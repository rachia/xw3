const { Discord, MessageEmbed } = require("discord.js");
const emojiler = require("../scaryemojiler.json");
const genel = require("../scarygenel.json");
const kanallar = require("../scarykanallar.json");
const roller = require("../scaryroller.json");
module.exports = (msg) => {

if (
    msg.content.toLowerCase() === "tag" ||
    msg.content.toLowerCase() === "!tag" ||
    msg.content.toLowerCase() === ".tag"
  ) {

  msg.channel.send(`**${genel.tag}**`);
  }
};

module.exports.configuration = {
    name: "message"
  }


  //**Ainsworth & Richard Tarafından Yapılmıştır.**