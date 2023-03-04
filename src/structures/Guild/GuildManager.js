class GuildManager {
  constructor(options) {
    this.guild = options.guild;
  }

  getGuildName() {
    return this.guild.name;
  }
  
  setGuildName(name) {
    return this.guild.setName(name);
  }
  
  getGuildID() {
    return this.guild.id;
  }
  
  getGuildRegion() {
    return this.guild.region;
  }
  
  getGuildIconURL() {
    return this.guild.iconURL();
  }
  
  getGuildSplashURL() {
    return this.guild.splashURL();
  }
  
  getGuildBannerURL() {
    return this.guild.bannerURL();
  }
  
  getGuildFeatures() {
    return this.guild.features;
  }

  getGuildChannels(separator) {
    const channels = this.guild.channels.cache
    const channelObjects = channels.map(channel => channel.toString());
    return channelObjects.join(separator);
  }
  
  getGuildChannelByName(name) {
    return this.guild.channels?.cache?.find(channel => channel.name === name);
  }
  
  createGuildChannel(options) {
    return this.guild.channels.create(options);
  }

  getGuildRoles(separator) {
    const roles = this.guild.roles.cache
    const roleObjects = emojis.map(role => role.toString());
    return roleObjects.join(separator)
  }
  
  getGuildRoleByID(id) {
    return this.guild.roles.cache.get(id);
  }
  
  createGuildRole(options) {
    return this.guild.roles.create(options);
  }

  getGuildMembers(separator) {
    const members = this.guild.emojis.cache
    const memberObjects = members.map(member => member.toString());
    return memberObjects.join(separator)
  }
  
  getGuildMemberByID(id) {
    return this.guild.members.cache.get(id);
  }
  
  getGuildMemberByNickname(nickname) {
    return this.guild.members.cache.find(member => member.nickname === nickname);
  }
  
  getGuildMemberByUsername(username) {
    return this.guild.members.cache.find(member => member.user.username === username);
  }
  
  addGuildMember(member) {
    return this.guild.members.add(member);
  }
  
  removeGuildMember(member) {
    return this.guild.members.remove(member);
  }

  addGuildMemberRole(member, role) {
    return member.roles.add(role);
  }
  
  removeGuildMemberRole(member, role) {
    return member.roles.remove(role);
  }
  
  setGuildMemberRoles(member, roles) {
    return member.roles.set(roles);
  }
  
  getGuildMemberRoles(member, separator) {
    const members = member.guild.emojis.cache
    const memberObjects = members.map(member => member.toString());
    return memberObjects.join(separator)
  }

  addGuildRolePermission(role, permission) {
    return role.permissions.add(permission);
  }
  
  removeGuildRolePermission(role, permission) {
    return role.permissions.remove(permission);
  }
  
  setGuildRolePermissions(role, permissions) {
    return role.permissions.set(permissions);
  }
  
  getGuildRolePermissions(role, separator) {
    const rolePerms = role.permissions
    const roleObjects = rolePerms.map(roles => roles.toString());
    return roleObjects.join(separator)
  }

  addGuildChannelPermission(channel, permission) {
    return channel.permissionOverwrites.create(permission);
  }
  
  removeGuildChannelPermission(channel, permission) {
    return channel.permissionOverwrites.get(permission.id)?.delete();
  }
  
  setGuildChannelPermissions(channel, permissions) {
    return channel.overwritePermissions(permissions);
  }
  
  getGuildChannelPermissions(channel, separator) {
    const channelPerms = channel.permissions
    const channelObjects = channelPerms.map(channels => channels.toString());
    return channelObjects.join(separator)
  }
  
  getGuildChannelTopic(channel) {
    return channel.topic;
  }
  
  setGuildChannelTopic(channel, topic) {
    return channel.setTopic(topic);
  }
  
  setGuildDefaultMessageNotifications(settings) {
  this.guild.setDefaultMessageNotifications(settings)
  }
  
  getGuildExplicitContentFilter() {
  const filterLevel = this.guild.explicitContentFilter;
  return filterLevel;
  }

  setGuildExplicitContentFilter(filter) {
      this.guild.setExplicitContentFilter(filter)
  }
  
  getGuildVerificationLevel() {
  const verificationLevel = this.guild.verificationLevel
  return verificationLevel;
  }
  
  setGuildVerificationLevel(level) {
  this.guild.setVerificationLevel(level)
  }

  getGuildChannelTopic(channel) {
    return channel.topic;
  }
  
  setGuildChannelTopic(channel, topic) {
    return channel.setTopic(topic);
  }
  
  getGuildChannelParent(channel) {
    return channel.parent;
  }
  
  setGuildChannelParent(channel, category) {
    return channel.setParent(category);
  }
  
  deleteGuildChannel(channel) {
    return channel.delete();
  }

  getGuildEmojis(separator) {
    const emojis = this.guild.emojis.cache
    const emojiObjects = emojis.map(emoji => emoji.toString());
    return emojiObjects.join(separator)
  }

  getGuildEmojiByID(id) {
    return this.guild.emojis.cache.find(emoji => emoji.id === id);
  }

  createGuildEmoji(options) {
    return this.guild.emojis.create(options);
  }

  updateGuildEmoji(emoji, options) {
    return emoji.edit(options);
  }

  deleteGuildEmoji(emoji) {
    return emoji.delete();
  }

  getGuildVoiceStates(separator) {
    const voiceStates = this.guild.voiceStates.cache;
    const voiceObjects = voiceStates.map(voice => voice.toString());
    return voiceObjects.join(separator)
  }

  getGuildVoiceRegion() {
    return this.guild.region;
  }

  getGuildAFKChannel() {
    return this.guild.afkChannel;
  }

  setGuildAFKChannel(channel) {
    return this.guild.setAFKChannel(channel);
  }

  getGuildAFKTimeout() {
    return this.guild.afkTimeout;
  }

  setGuildAFKTimeout(timeout) {
    return this.guild.setAFKTimeout(timeout);
  }
}

module.exports = GuildManager;