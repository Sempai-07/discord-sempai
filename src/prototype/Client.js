const { Client } = require('discord.js');

Object.defineProperty(Client.prototype, "allMemberCount", {
    get: function allMemberCount() {
      const client = this;
      const allMemberCount = client.guilds.cache
        .map((c) => c.memberCount || 0)
        .reduce((x, y) => x + y, 0);
      return allMemberCount;
    }
});