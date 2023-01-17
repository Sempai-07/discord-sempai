const { Client, Message } = require('discord.js');

Message.prototype.randomReactionMessage = function(options) {
  try {
    this.react(options.emojis.cache.random()?.id)
  } catch (e) {
    console.log(new TypeError("Invalid Client"));
  }
};