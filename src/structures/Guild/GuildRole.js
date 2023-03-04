const { Role } = require("./Options/role.js");

class GuildRole {
  static async getRoleInfo(guild, roleId, option) {
    const role = await guild.roles.fetch(roleId).catch(err => undefined);
    const result = Role(role)[option];
    return result;
  }
  
  static async createRole(guild, options) {
    const role = await guild.roles.create(options).catch(err => undefined);
    return role;
  }
  
  static async deleteRole(role) {
    await role.delete().catch(err => undefined);
  }
  
  static async updateRole(role, options) {
    await role.edit(options).catch(err => undefined);
  }
  
  async addRole(guild, user, roleId) {
    const role = await guild.roles.fetch(roleId).catch(err => undefined);
    if (role) {
      await user.roles.add(role);
      return true;
    } else {
      return false;
    }
  }

  async removeRole(guild, user, roleId) {
    const role = await guild.roles.fetch(roleId).catch(err => undefined);
    if (role) {
      await user.roles.remove(role);
      return true;
    } else {
      return false;
    }
  }
}

module.exports = GuildRole;
