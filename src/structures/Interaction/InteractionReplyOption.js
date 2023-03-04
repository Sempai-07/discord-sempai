class InteractionReplyOption {
  constructor(data = {}) {
    this.content = data.content;
    this.embeds = data.embeds;
    this.allowedMentions = data.allowedMentions;
    this.components = data.components;
    this.tts = data.tts;
    this.flags = data.flags;
    this.reference = data.reference;
    this.ephemeral = data.ephemeral;
  }

  setContent(content) {
    this.content = content;
    return this;
  }

  setEmbeds(embeds) {
    this.embeds = embeds;
    return this;
  }

  setAllowedMentions(allowedMentions) {
    this.allowedMentions = allowedMentions;
    return this;
  }

  addComponents(components) {
    if (!this.components) {
      this.components = [];
    }

    this.components.push(...components);
    return this;
  }

  setContentWithFormat(format, ...args) {
    this.content = format.replace(/{(\d+)}/g, (match, number) => {
      return typeof args[number] !== 'undefined' ? args[number] : match;
    });
    return this;
  }

  addEmbed(embed) {
    if (!this.embeds) {
      this.embeds = [];
    }

    this.embeds.push(embed);
    return this;
  }

  setComponents(components) {
    this.components = components;
    return this;
  }

  setEmbed(embedIndex, embed) {
    if (this.embeds && this.embeds[embedIndex]) {
      this.embeds[embedIndex] = embed;
    }
    return this;
  }

  removeEmbed(embedIndex) {
    if (this.embeds && this.embeds[embedIndex]) {
      this.embeds.splice(embedIndex, 1);
    }
    return this;
  }

  clearEmbeds() {
    this.embeds = [];
    return this;
  }

  setTTS(tts) {
    this.tts = tts;
    return this;
  }

  setFlags(flags) {
    this.flags = flags;
    return this;
  }

  setReference(message, failIfNotExists) {
    this.reference = {
      message_id: message.id,
      channel_id: message.channel.id,
      guild_id: message.guild ? message.guild.id : undefined,
      fail_if_not_exists: failIfNotExists,
    };
    return this;
  }

  setEphemeral(ephemeral) {
    this.ephemeral = ephemeral;
    return this;
  }

  defer(ephemeral) {
    const options = {
      content: '',
      components: [],
      tts: false,
      ephemeral: ephemeral,
    };
    const replyPromise = this.interaction.deferReply(options);
    this.replyPromise = replyPromise;
    return replyPromise;
  }

  editOriginal(options) {
    if (this.replyPromise && !this.replyPromise.handled) {
      this.replyPromise.then((message) => {
        this.interaction.editReply(message.id, options);
      });
      this.replyPromise.handled = true;
    } else {
      this.interaction.editReply(options);
    }
  }

  deleteOriginal() {
    if (this.replyPromise && !this.replyPromise.handled) {
      this.replyPromise.then((message) => {
        this.interaction.deleteReply(message.id);
      });
      this.replyPromise.handled = true;
    } else {
      this.interaction.deleteReply();
    }
  }

  toJSON() {
    return {
      content: this.content,
      embeds: this.embeds,
      allowed_mentions: this.allowedMentions,
      components: this.components,
      tts: this.tts,
      flags: this.flags,
      reference: this.reference,
      ephemeral: this.ephemeral,
      };
    }
   }

module.exports = InteractionReplyOption;