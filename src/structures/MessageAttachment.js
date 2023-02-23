const { AttachmentBuilder } = require('discord.js');

class MessageAttachment extends AttachmentBuilder {
  constructor(options) {
    super();
    if (!options.attachment) return console.log(new TypeError("Invalid MessageAttachment: attachment path"));
    const messageAttachment = new AttachmentBuilder(options.attachment, options.data);
    return messageAttachment;
  }
}

module.exports = MessageAttachment;

// © 2022 @Sempai Development