const { Role } = require("./Options/role.js");

class Roles {
  static async getRoleInfo(guild, roleId, option) {
    const role = await guild.roles.fetch(roleId).catch(err => undefined);
    const result = Role(role)[option];
    return result;
  }
}

module.exports = Roles;