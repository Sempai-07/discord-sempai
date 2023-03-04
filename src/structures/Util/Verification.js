const { PermissionsBitField } = require('discord.js');

class Verification {
  // Проверка, является ли строка числом
  static isNumber(str) {
    return !isNaN(str);
  }

  // Проверка, является ли строка положительным числом
  static isPositiveNumber(str) {
    return this.isNumber(str) && parseInt(str) > 0;
  }

  // Проверка, является ли строка отрицательным числом
  static isNegativeNumber(str) {
    return this.isNumber(str) && parseInt(str) < 0;
  }

  // Проверка, является ли строка десятичным числом
  static isDecimalNumber(str) {
    return !isNaN(str) && str.indexOf('.') !== -1;
  }

  // Проверка, является ли пользователь администратором на сервере
  static isAdministrator(member) {
    return member.permissions.has(PermissionsBitField.Flags.Administrator);
  }

  // Проверка, является ли пользователь владельцем сервера
  static isOwner(member) {
    return member.id === member.guild.ownerId;
  }

  // Проверка, является ли пользователь ботом
  static isBot(user) {
    return user.bot;
  }

  // Проверка, является ли канал голосовым
  static isVoiceChannel(channel) {
    return channel.type === 'GUILD_VOICE';
  }

  // Проверка, является ли канал текстовым
  static isTextChannel(channel) {
    return channel.type === 'GUILD_TEXT';
  }

  // Проверка, является ли канал категорией
  static isCategoryChannel(channel) {
    return channel.type === 'GUILD_CATEGORY';
  }

  // Проверка, является ли сообщение ответом на другое сообщение
  static isReply(message) {
    return message.reference && message.reference.messageID;
  }

  // Проверка, является ли сообщение эфемерным (удаляется через некоторое время)
  static isEphemeral(message) {
    return message.ephemeral;
  }

  // Проверка, содержит ли сообщение упоминание всех участников сервера
  static mentionsEveryone(message) {
    return message.mentions.everyone;
  }

  // Проверка, содержит ли сообщение упоминание конкретного пользователя
  static mentionsUser(message, user) {
    return message.mentions.users.has(user.id);
  }

  // Проверка, содержит ли сообщение упоминание конкретной роли
  static mentionsRole(message, role) {
    return message.mentions.roles.has(role.id);
  }

  // Проверка, является ли роль выше указанной роли в иерархии
  static isRoleAbove(role, targetRole) {
    return role.position > targetRole.position;
  }

  // Проверка, является ли роль ниже указанной роли в иерархии
  static isRoleBelow(role, targetRole) {
    return role.position < targetRole.position;
  }

// Проверка, является ли пользователь создателем сообщения
  static isMessageAuthor(message, user) {
    return message.author.id === user.id;
   }

// Проверка, является ли пользователь владельцем бота
   static isBotOwner(user, botOwnerId) {
    return user.id === botOwnerId;
   }
}

module.exports = Verification;