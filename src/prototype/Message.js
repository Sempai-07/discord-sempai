const { Client, Message } = require('discord.js');

Message.prototype.findMember = function(member, returnAuthor) {
  const message = this;
  
  let u =
    message.guild.members.cache.get(member) ||
    message.guild.members.cache.find(
      (m) =>
        m.user.tag.toLowerCase() === member.toLowerCase() ||
        m.user.username.toLowerCase() === member.toLowerCase() ||
        m.displayName.toLowerCase() === member.toLowerCase()
    ) || message.mentions.members.first() || message.guild.members.fetch(member).catch(e => u = message.member);
    if (returnAuthor === true) return u.id === undefined ? message.member.id : u.id;
    else return u.id;
};

Message.prototype.randomReactionMessage = function(client) {
    const msg = this;
    msg.react(client.emojis.cache.random()?.id)
  }