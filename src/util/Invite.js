class Invites {
  static async getInviteInfo(client, code, option) {
    const invite = await client.fetchInvite(code).catch((e) => {
      return undefined;
    });
    const inviteData = Invite(invite);
    const result = inviteData[option];
    return result;
  }

  static async getInviteLink(guildId, options) {
    const invite = await client.guilds.cache
      .get(guildId)
      .channels.cache.filter((c) => c.type === "text")
      .first()
      .createInvite(options);
    return invite;
  }

  static async getInviteList(client, guildId) {
    const invites = await client.guilds.cache.get(guildId).fetchInvites();
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
    console.error(`Error fetching invites: ${error}`);
    return false;
  }
  }
}

module.exports = Invites;