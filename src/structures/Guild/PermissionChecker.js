const { PermissionsBitField } = require('discord.js');

class PermissionChecker {
  constructor(entity) {
    this.entity = entity;
  }

  has(permission) {
    return this.permissions.has(permission);
  }

  hasAny(permissions) {
    return permissions.some((permission) => this.permissions.has(permission));
  }

  hasAll(permissions) {
    return permissions.every((permission) => this.permissions.has(permission));
  }

  isAdmin() {
    return this.permissions.toArray().includes('Administrator')
  }

  canManageChannel(channel) {
    return channel.permissionsFor(this.entity).has(PermissionsBitField.Flags.ManageChannels);
  }

  canManageGuild(guild) {
    return guild.permissionsFor(this.entity).has(PermissionsBitField.Flags.ManageGuild);
  }

  hasRole(role) {
    const roleId = typeof role === 'string' ? role : role.id;
    return this.entity.roles.cache.has(roleId);
  }

  hasBot(bot) {
    const botId = typeof bot === 'string' ? bot : bot.id;
    return this.entity.client.users.cache.has(botId);
  }
}

module.exports = PermissionChecker