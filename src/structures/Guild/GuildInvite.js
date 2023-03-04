class GuildInvite {
  static async getInviteInfo(client, code, option) {
    const invite = await client.fetchInvite(code).catch((e) => {
      return undefined;
    });
    const inviteData = Invite(invite);
    const result = inviteData[option];
    return result;
  }

  static async getInviteLink(client, guildId, channelId, options) {
      const guild = client.guilds.cache.get(guildId);
      const channel = guild.channels.cache.filter(c => c.type === 'GUILD_TEXT').first();
      const invite = await guild.invites.create(channelId, options);
      return invite
  }


  static async getInviteList(client, guildId) {
    const guild = client.guilds.cache.get(guildId);
    const invites = await guild.invites.fetch();
    return invites;
  }

  static async deleteInvite(client, code) {
    const invite = await client.fetchInvite(code);
    await invite.delete();
  }
  
  static async hasInvite(guild, code) {
  try {
    const invites = await guild.invites.fetch();
    const invite = invites.find((i) => i.code === code);
    return !!invite;
  } catch (error) {
    throw new Error(`Error fetching invites: ${error}`);
    return false;
  }
  }
}

module.exports = GuildInvite;