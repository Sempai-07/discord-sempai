const { Client, MessageReaction } = require('discord.js');

class Reaction {
  /**
   * Создает объект класса Reaction
   * @param {MessageReaction} reaction - реакция на сообщение
   */
  constructor(reaction) {
    if (!(reaction instanceof MessageReaction)) {
      throw new Error('Invalid MessageReaction object');
    }
    this.reaction = reaction;
  }

  /**
   * Возвращает идентификатор реакции
   * @returns {string}
   */
  getId() {
    return this.reaction.emoji.identifier;
  }

  /**
   * Возвращает название реакции
   * @returns {string}
   */
  getName() {
    return this.reaction.emoji.name;
  }

  /**
   * Возвращает количество пользователей, которые нажали на данную реакцию
   * @returns {number}
   */
  getUsersCount() {
    return this.reaction.count;
  }

  /**
   * Возвращает массив пользователей, которые нажали на данную реакцию
   * @returns {User[]}
   */
  async getUsers() {
    const users = await this.reaction.users.fetch();
    return users;
  }
}

module.exports = Reaction;