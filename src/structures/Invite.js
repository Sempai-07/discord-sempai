const { Invite } = require("./Options/invite.js");

class Invites {
  constructor(options) {
    
  }
  async getInviteInfo(client, code, option) {
    const invite = await client.fetchInvite(code).catch((e) => {
      return console.log(new TypeError('Invalid invite code'));
    });
    const inviteData = Invite(invite);
    const result = inviteData[option];
    return result;
  }
}

module.exports = Invites;