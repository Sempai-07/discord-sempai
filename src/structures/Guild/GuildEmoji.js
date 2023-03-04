class GuildEmoji {
  constructor(emoji) {
    this.emoji = emoji;
  }

  // Получение ID эмодзи
  getId() {
    return this.emoji.id;
  }

  // Получение даты создания эмодзи
  getCreatedAt() {
    return this.emoji.createdAt;
  }

  // Получение ID автора эмодзи
  getAuthorId() {
    return this.emoji.author?.id || undefined;
  }

  // Получение имени автора эмодзи
  getAuthorUsername() {
    return this.emoji.author?.username || undefined;
  }

  // Получение аватара автора эмодзи
  getAuthorAvatar() {
    return this.emoji.author?.avatar || undefined;
  }

  // Получение ссылки на профиль автора эмодзи
  getAuthorLink() {
    return !this.emoji.author.id ? `https://discord.com/users/${this.emoji.author.id}` : undefined;
  }

  // Получение ID сервера, на котором находится эмодзи
  getServerId() {
    return this.emoji.guild.id;
  }

  // Получение названия сервера, на котором находится эмодзи
  getServerName() {
    return this.emoji.guild.name;
  }

  // Получение иконки сервера, на котором находится эмодзи
  getServerIcon() {
    return this.emoji.guild.iconURL();
  }

  // Получение ссылки на сервер, на котором находится эмодзи
  getServerLink() {
    return `https://discord.com/channels/${this.emoji.guild.id}`;
  }

  // Получение ролей, которым доступен эмодзи
  getRoles() {
    return this.emoji.roles.cache.map(role => role.name);
  }

  // Получение пользователей, которым доступен эмодзи
  getUsers() {
    return this.emoji.users?.cache?.map(user => user.username) || undefined;
  }

  // Проверка, является ли эмодзи анимированным
  isAnimated() {
    return this.emoji.animated;
  }

  // Проверка, доступен ли эмодзи на сервере с указанным ID
  isAvailableInGuild(guildId) {
    return this.emoji.guild.id === guildId;
  }

  // Проверка, доступен ли эмодзи указанному пользователю с указанным ID
  isAvailableForUser(userId) {
      if (this.emoji.users && this.emoji.users.cache) {
      return this.emoji.users.cache.some(user => user.id === userId);
     }
  }

  // Получение количества реакций на этот эмодзи
  getReactionCount() {
    return this.emoji?.reactionCount || undefined;
  }

  // Получение пользователей, которые поставили реакцию на этот эмодзи
  async getReactionUsers() {
    const users = await this.emoji?.users?.fetch();
    return users?.map(user => user.username) || undefined;
  }

  // Получение количества уникальных пользователей, которые поставили реакцию на этот эмодзи
  async getReactionUserCount() {
    const users = await this.emoji?.users?.fetch();
    return users?.size || undefined;
  }

// Получение строкового представления эмодзи
    toString() {
        const isAnimated = this.emoji.animated ? 'a:' : '';
        return `<${isAnimated}${this.emoji.name}:${this.emoji.id}>`;
    }
}

module.exports = GuildEmoji;