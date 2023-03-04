class GuildVoice {
  constructor(options) {
    this.voice = options.voice
  }

  getChannelName() {
    return this.voice.channel.name
  }

  setChannelName(client, name) {
    client.channels.fetch(this.getChannelID()).then(channel => channel.setName(name));
  }

  getChannelID() {
    return this.voice.channel.id
  }

  getUserLimit() {
    const limit = this.voice.channel.userLimit
    return limit;
  }

  setUserLimit(limit) {
    this.voice.channel.setUserLimit(limit)
  }

  getBitrate() {
    return this.voice.channel.bitrate
  }

  setBitrate(bitrate) {
    this.voice.channel.setBitrate(bitrate)
  }

  getGuild() {
    return this.voice.guild
  }

  getMembers() {
    return this.voice.channel.members
  }
}

module.exports = GuildVoice;