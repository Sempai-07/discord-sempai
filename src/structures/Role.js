const { Role } = require("./Options/role.js");

class Roles {
  static async getRoleInfo(guild, roleId, option) {
    const role = await guild.roles.fetch(roleId).catch(err => {
     return console.log(new TypeError('Invalid usage function'));
    });
    const result = Role(role)[option];
    return result;
  }
}

module.exports = Roles;