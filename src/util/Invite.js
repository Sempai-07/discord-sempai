const { Invite } = require("./Options/invite.js");

class Invites {
  static async getInviteInfo(client, code, option) {
    const invite = await client.fetchInvite(code).catch((e) => {
      return undefined;
    });
    const inviteData = Invite(invite);
    const result = inviteData[option];
    return result;
  }
  
}

module.exports = Invites;

// © 2022 @Sempai Development
