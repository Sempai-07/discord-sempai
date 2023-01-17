const { GuildMember, Guild} = require('discord.js');

Object.defineProperty(GuildMember.prototype, "perms", {
    get: function perms() {
      return this.permissions.toArray();
    }
});