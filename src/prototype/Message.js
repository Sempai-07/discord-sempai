const { Client, Message, Collection } = require('discord.js');

Message.prototype.emojis = function(separator) {
  const message = this;
  let emoji = message.guild.emojis.cache.map((e) => e = message).join(separator) || undefined; // пусть будет ☠️
  return emoji;
};

Message.prototype.findRole = function(roles) {
  const message = this;
  const manager = message.guild.roles.cache;
  const role =
    manager.get(roles) || manager.find(
      (r) => r.name.toLowerCase() === roles.toLowerCase()
    ) || message.mentions.roles.first();
    try {
      return role.id;
    } catch (e) {
      return undefined;
    }
};

Message.prototype.findChannel = function(client, channel, returnChannel = true) {
  const message = this;
  const manager = client.channels.cache;

  const c =
    manager.get(channel) ||
    manager.find(
      (c) => c.name && c.name.toLowerCase() === channel.toLowerCase()
    ) || message.mentions.channels.first() || (returnChannel === true ? message.channel : undefined);
    return c.id;
};

Message.prototype.findUser = function(client, user, returnAuthor = true) {
  const message = this;
  let u =
    client.users.cache.get(user) ||
    message.mentions.users.first() ||
    client.users.cache.find(
      (m) =>
        m.username.toLowerCase() === user.toLowerCase() ||
        m.tag.toLowerCase() === user.toLowerCase()
    ) || client.users.fetch(user).catch(e => u = message.author); // пусть будет ☠️
    if (returnAuthor === true) return u.id === undefined ? message.author.id : u.id;
    else return u.id;
};

Message.prototype.findMember = function(member, returnAuthor = true) {
  const message = this;
  
  let u =
    message.guild.members.cache.get(member) ||
    message.guild.members.cache.find(
      (m) =>
        m.user.tag.toLowerCase() === member.toLowerCase() ||
        m.user.username.toLowerCase() === member.toLowerCase() ||
        m.displayName.toLowerCase() === member.toLowerCase()
    ) || message.mentions.members.first() || message.guild.members.fetch(member).catch(e => u = message.member); // пусть будет ☠️
    if (returnAuthor === true) return u.id === undefined ? message.member.id : u.id;
    else return u.id;
};

Message.prototype.randomReactionMessage = function(client) {
    const msg = this;
    msg.react(client.emojis.cache.random()?.id)
  }