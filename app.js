const Discord = require("discord.js");
const client = new Discord.Client();
const config = require("./config.json");
const dicers = require("./dicers.json");

client.once("ready", () => {
  console.log(`Bot has started, with ${client.users.size} users, in ${client.channels.size} channels of ${client.guilds.size} guilds.`);
  client.user.setGame(`on ${client.guilds.size} servers`);
});

client.on("guildCreate", guild => {
  console.log(`New guild joined: ${guild.name} (id: ${guild.id}). This guild has ${guild.memberCount} members!`);
  client.user.setGame(`on ${client.guilds.size} servers`);
});

client.on("guildDelete", guild => {
  console.log(`I have been removed from: ${guild.name} (id: ${guild.id})`);
  client.user.setGame(`on ${client.guilds.size} servers`);
});

client.on("message", message => {
  if(message.author.bot) return;
  if(message.content.indexOf(config.prefix) !== 0) return;

  const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();

  if (command === "dicer") {
      const dicer = args[0].toLowerCase();
      message.channel.send(dicers[dicer]);
  }

  if(command === "guide") {
      const link = config.guidelink;
      message.channel.send(link);
  }

  if(command === "help") {
      message.channel.send("List of available commands \n \n \
      !guide : link to guild-created wiki \n \
      !dicer [Dicer Name] : view a dicer's stats and skills \n \n \
      For other feature requests message Ramen");
  }
});

client.login(config.token);
