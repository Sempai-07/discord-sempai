class Util {
  static getUser(client, id) {
    let user = client.users.cache.get(id);
    if (!user) {
      user = this.fetchUser(client, id);
    }
    return user;
  }

  static async fetchUser(client, id) {
    return client.users.fetch(id, { force: true }).catch((err) => undefined);
  }

  static async fetchChannel(client, id) {
    return client.channels.fetch(id, { force: true }).catch((e) => undefined);
  }

  static getChannel(client, id, force = false) {
    if (client.channel?.id === id) return client.channel;
    else {
      let channel = client.channels.cache.get(id);
      if (!channel && force) channel = this.fetchChannel(bot, id);
      return channel;
    }
  }

  static async fetchMember(guild, id) {
    return guild.members.fetch(id, { force: true }).catch((err) => undefined);
  }

  static async fetchMembers(guild, options) {
    return guild.members.fetch(options);
  }

  static getMember(guild, id) {
    let member = guild.members.cache.get(id);
    if (!member) member = this.fetchMember(guild, id);
    return member;
  }

  static getMembers(
    guild,
    options = { type: "startsWith", query: "", limit: 10 },
    force = false
  ) {
    let members;
    if (!force) {
      members = guild.members.cache
        .filter(
          (x) =>
            x.user.username.toLowerCase()[options.type](options.query) ||
            x.displayName?.toLowerCase()[options.type](options.query),
        )
        .first(options.limit);
    } else {
      members = this.fetchMembers(guild, options);
    }
    return members;
  }

  static async fetchMessage(channel, id) {
    return channel.messages
      .fetch(id, { force: true })
      .catch((err) => undefined);
  }

  static getMessage(channel, id) {
    let message = channel.messages.cache.get(id);
    if (!message) message = this.fetchMessage(channel, id);
    return message;
  }

  static async getGuild(client, id) {
    if (client.guild?.id === id && client.guild?.id) return client.guild;
    else {
      if (!client.clientShard) return client.guilds.cache.get(id);
      else {
        const arr = await client.clientShard.broadcastEval((client) =>
          client.guilds.cache.get(id),
        );
        return arr.find((x) => x);
      }
    }
  }

  static getEmoji(client, Emoji) {
    return client.emojis.cache.find(
      (x) =>
        x.name.toLowerCase() === Emoji.toLowerCase() ||
        x.id === Emoji ||
        x.toString() === Emoji
    );
  }

  static getSticker(guild, Sticker) {
    return guild.stickers.cache.find(
      (x) =>
        x.name.toLowerCase() === Sticker.toLowerCase() ||
        x.id === Sticker
    );
  }

  static async findId(bot, id) {
    return (
      (await this.getGuild(bot, id)) ||
      (await this.getUser(bot, id)) ||
      (await this.getChannel(bot, id, false)) ||
      (await this.getMessage(bot.channel, id)) ||
      this.findRole(bot.guild, id) ||
      this.getEmoji(bot, id) ||
      this.getSticker(bot.guild, id) ||
      undefined
    );
  }
  
  static findMember(guild, memberResolver) {
    return guild.members.cache.findKey(
      (x) =>
        x.displayName.toLowerCase() === memberResolver.toLowerCase() ||
        x.user.username.toLowerCase() === memberResolver.toLowerCase() ||
        x.id === memberResolver ||
        x.toString() === memberResolver
    );
  }
  
  static findGuildChannel(guild, ChannelResolver) {
    return guild.channels.cache.findKey(
      (x) =>
        x.name.toLowerCase() === ChannelResolver.toLowerCase() ||
        x.id === ChannelResolver ||
        x.toString() === ChannelResolver
    );
  }

  static findChannel(client, ChannelResolver) {
    return client.channels.cache.findKey(
      (x) =>
        x.name.toLowerCase() === ChannelResolver.toLowerCase() ||
        x.id === ChannelResolver ||
        x.toString() === ChannelResolver
    );
  }

  static findRole(guild, RoleResolver) {
    return guild.roles.cache.findKey(
      (x) =>
        x.name.toLowerCase() === RoleResolver.toLowerCase() ||
        x.id === RoleResolver ||
        x.toString() === RoleResolver
    );
  }

  static findUser(client, UserResolver) {
    return client.users.cache.findKey(
      (x) =>
        x.username.toLowerCase() === UserResolver.toLowerCase() ||
        x.tag.toLowerCase() === UserResolver.toLowerCase() ||
        x.id === UserResolver ||
        x.toString() === UserResolver
    );
  }
  
  static findRoles(guild, options = {type: "startsWith", query: "", limit: 10 }) {
    return guild.roles.cache
      .filter((x) => {
        return x.name.toLowerCase()[options.type](options.query.toLowerCase());
      })
      .first(options.limit);
  }
}

module.exports = Util;

// © 2022 @Sempai Development