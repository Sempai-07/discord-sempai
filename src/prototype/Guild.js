const { Guild } = require('discord.js');

Guild.prototype.randomGuildId = function(client) {
  try {
    return client.guilds.cache.random()?.id;
  } catch (e) {
    console.log(new TypeError("Invalid Client"));
  }
};

Guild.prototype.randomRoleId = function(client, guildid) {
  const guild = client.guilds.cache.get(guildid || client.guild?.id);
  try {
    return guild.roles.cache.random()?.id;
  } catch (e) {
    console.log(new TypeError("Invalid Client"));
  }
};