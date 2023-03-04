const { WebhookClient, EmbedBuilder } = require('discord.js');

class GuildWebhook {
  constructor(url, options = {}) {
    this.webhook = new WebhookClient({ url, ...options });
  }
  
  setUsername(username) {
    this.username = username;
  }

  setAvatarURL(url) {
    this.avatarURL = url;
  }

  addEmbed(embed) {
    if (!this.embeds) {
      this.embeds = [];
    }

    this.embeds.push(new EmbedBuilder(embed));
  }

  addEmbeds(embeds) {
    if (!this.embeds) {
      this.embeds = [];
    }

    this.embeds.push(...embeds.map((embed) => new EmbedBuilder(embed)));
  }

  addFile(file) {
    if (!this.files) {
      this.files = [];
    }

    this.files.push(file);
  }

  addFiles(files) {
    if (!this.files) {
      this.files = [];
    }

    this.files.push(...files);
  }

  async send(text, options = {}) {
    const message = {};

    if (options.username) message.username = options.username;
    if (options.avatarURL) message.avatarURL = options.avatarURL;

    if (options.embeds && options.embeds.length > 0) {
      message.embeds = options.embeds.map((embed) => {
        return new EmbedBuilder(embed);
      });
    }

    if (options.files && options.files.length > 0) {
      message.files = options.files;
    }

    if (text) {
      message.content = text;
    }

    return this.webhook.send(message);
  }

  async delete() {
    return this.webhook.delete();
  }
}

module.exports = GuildWebhook