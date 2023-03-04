class GuildUser {
  constructor(user) {
    this.user = user;
  }

  getUsername() {
    return this.user.username;
  }

  getId() {
    return this.user.id;
  }

  getAvatarUrl() {
    return this.user.displayAvatarURL({ format: 'png', dynamic: true });
  }

  getTag() {
    return this.user.tag;
  }

  isBot() {
    return this.user.bot;
  }

  getGuilds() {
    return this.user.client.guilds.cache.filter(guild => guild.members.cache.has(this.user.id));
  }

  getRoles(guild) {
    if (!guild) {
      return null;
    }

    const member = guild.members.cache.get(this.user.id);
    if (!member) {
      return null;
    }

    return member.roles.cache;
  }

  getDiscriminator() {
    return this.user.discriminator;
  }

  isOnline() {
    return this.user.presence?.status !== "offline";
  }

  isSystem() {
    return this.user.system;
  }

  isVerified() {
    return this.user.verified;
  }

  isMuted() {
    return this.user.voice?.serverMute;
  }

  isDeafened() {
    return this.user.voice?.serverDeaf;
  }

  getCreatedAt() {
    return this.user.createdAt;
  }

  getLastMessage() {
    return this.user.lastMessage;
  }

  getDMChannel() {
    return this.user.createDM();
  }

  getNickname(guild) {
    if (!guild) {
      return null;
    }

    const member = guild.members.cache.get(this.user.id);
    if (!member) {
      return null;
    }

    return member.nickname;
  }

  getVoiceChannel() {
    return this.user.voice?.channel;
  }

  getActivity() {
    return this.user.presence?.activity?.name;
  }

  getPresenceStatus() {
    return this.user.presence?.status;
  }

  getCreatedAtTimestamp() {
    return this.user.createdAt.getTime() / 1000;
  }

  getLastMessageTimestamp() {
    return this.user.lastMessage?.createdTimestamp / 1000;
  }

  hasPermission(permission) {
    const guild = this.user.client.guilds.cache.find(guild => guild.members.cache.has(this.user.id));
    if (!guild) {
      return false;
    }

    const member = guild.members.cache.get(this.user.id);
    if (!member) {
      return false;
    }

    return member.hasPermission(permission);
  }

  async kick(reason) {
    const guild = this.user.client.guilds.cache.find(guild => guild.members.cache.has(this.user.id));
    if (!guild) {
      return false;
    }

    const member = guild.members.cache.get(this.user.id);
    if (!member) {
      return false;
    }

    try {
      await member.kick(reason);
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  }

  async ban({ days, reason }) {
    const guild = this.user.client.guilds.cache.find(guild => guild.members.cache.has(this.user.id));
    if (!guild) {
      return false;
    }

    const member = guild.members.cache.get(this.user.id);
    if (!member) {
      return false;
    }

    try {
      await guild.members.ban(member, { days, reason });
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  }

  async unban(reason) {
    const guild = client.guilds.cache.first()
    try {
    await guild.members.unban(this.user.id, reason); // разбаниваем пользователя с указанной причиной
  } catch (err) {
    throw new Error(`Failed to unban user ${this.user.tag}: ${err}`); // логируем ошибку в консоль
  }
 }
}

module.exports = GuildUser;