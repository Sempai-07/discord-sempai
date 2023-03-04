const { APIMessage, EmbedBuilder } = require('discord.js');

class MessageReplyOption {
  constructor() {
    this.content = null;
    this.embeds = [];
    this.components = [];
    this.ephemeral = false;
    this.tts = false;
    this.allowedMentions = {};
    this.reference = null;
  }

  setContent(content) {
    this.content = content;
    return this;
  }

  setEmbeds(embeds) {
    this.embeds = embeds;
    return this;
  }

  addEmbed(embed) {
    this.embeds.push(embed);
    return this;
  }

  addEmbeds(embeds) {
    this.embeds.push(...embeds);
    return this;
  }

  setComponents(components) {
    this.components = components;
    return this;
  }

  addComponent(component) {
    this.components.push(component);
    return this;
  }

  addComponents(components) {
    this.components.push(...components);
    return this;
  }

  setEphemeral(ephemeral) {
    this.ephemeral = ephemeral;
    return this;
  }

  setTTS(tts) {
    this.tts = tts;
    return this;
  }

  setAllowedMentions(allowedMentions) {
    this.allowedMentions = allowedMentions;
    return this;
  }

  setReply(reference) {
    this.reference = reference;
    return this;
  }

  async send(channel) {
    const payload = {
      content: this.content,
      embeds: this.embeds,
      components: this.components,
      tts: this.tts,
      allowedMentions: this.allowedMentions,
      flags: this.ephemeral ? 64 : undefined,
    };

    if (this.reference) {
      payload.messageReference = this.reference;
    }

    const { data, files } = await APIMessage.create(channel, payload).resolveData().resolveFiles();

    if (this.ephemeral) {
      return channel.send({
        ...data,
        files,
        fetchReply: true,
      }).then((msg) => {
        msg.delete();
      }).catch((err) => {
        console.error('Error sending ephemeral message:', err);
      });
    } else {
      return channel.send({
        ...data,
        files,
        fetchReply: true,
      });
    }
  }

  static create(options) {
    const replyOption = new this();

    if (options.content) {
      replyOption.setContent(options.content);
    }

    if (options.embed) {
      replyOption.addEmbed(options.embed);
    }

    if (options.embeds) {
      replyOption.addEmbeds(options.embeds);
    }

    if (options.component) {
      replyOption.addComponent(options.component);
    }

    if (options.components) {
      replyOption.addComponents(options.components);
    }

    if (options.ephemeral) {
      replyOption.setEphemeral(true);
    }

    if (options.tts) {
      replyOption.setTTS(options.tts);
    }

    if (options.allowedMentions) {
      replyOption.setAllowedMentions(options.allowedMentions);
    }

    if (options.reference) {
      replyOption.setReply(options.reference);
    }

    return replyOption;
  }

  static embed(data) {
    return new MessageEmbed(data);
  }
}

module.exports = MessageReplyOption;
