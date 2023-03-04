class TextFormatter {
  // Функция для выделения текста жирным шрифтом
  static bold(text) {
    return `**${text}**`;
  }

  // Функция для выделения текста курсивом
  static italic(text) {
    return `*${text}*`;
  }

  // Функция для выделения текста подчеркиванием
  static underline(text) {
    return `__${text}__`;
  }

  // Функция для выделения текста зачеркиванием
  static strikethrough(text) {
    return `~~${text}~~`;
  }

  // Функция для выделения текста кодом
  static code(text) {
    return `\`${text}\``;
  }

  // Функция для выделения текста моноширинным шрифтом
  static monospace(text) {
    return `\`\`\`${text}\`\`\``;
  }


  // Функция для создания ссылки
  static link(text, url) {
    return `[${text}](${url})`;
  }

  // Функция для создания упоминания пользователя
  static mentionUser(userId) {
    return `<@${userId}>`;
  }

  // Функция для создания упоминания роли
  static mentionRole(roleId) {
    return `<@&${roleId}>`;
  }

  // Функция для создания эмодзи
  static emoji(emojiId) {
    return `<:${emojiId}>`;
  }

  // Функция для создания больших эмодзи
  static bigEmoji(emojiId) {
    return `<a:${emojiId}>`;
  }

  // Функция для выравнивания текста по центру
  static center(text, length) {
    const spacing = length - text.length;
    const leftPadding = Math.floor(spacing / 2);
    const rightPadding = length - text.length - leftPadding;
    return ' '.repeat(leftPadding) + text + ' '.repeat(rightPadding);
  }

  // Функция для выравнивания текста по правому краю
  static right(text, length) {
    const spacing = length - text.length;
    return ' '.repeat(spacing) + text;
  }
 }
 
module.exports = TextFormatter;