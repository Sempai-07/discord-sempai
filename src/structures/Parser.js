const { EmbedBuilder } = require('discord.js');
const { EmbedParser } = require("./Util/Function.js");

class Parser {
  constructor(options) {
    // Деструктурируем объект options в переменные, чтобы избежать дублирования кода
    const { content, embeds } = options;

    if (typeof content === 'string') {
      // Используем EmbedParser из ./Util/Function.js, чтобы разобрать content и получить this.embed
      this.embed = EmbedParser(content);
    } else if (typeof embeds === "object") {
      // Используем EmbedBuilder из discord.js, чтобы создать новый объект embed и добавить в него все свойства из embeds
      const embed = new EmbedBuilder()
        .setTitle(embeds.title)
        .setDescription(embeds.description)
        .setColor(embeds.color)
        .setURL(embeds.url)
        .setThumbnail(embeds.thumbnail);
      
      // Добавляем автора, если его свойства определены
      if (typeof embeds.author === "object") {
        try {
          embed.setAuthor(embeds.author);
        } catch(e) {
          console.log(e);
        }
      }

      embed.setTimestamp(embeds.timestamp)
        .setFooter(embeds.footer)
        .setImage(embeds.image)
        .addFields(embeds.fields);
        
      this.embed = embed;
    }
    return this.embed;
  }
}

module.exports = Parser;
