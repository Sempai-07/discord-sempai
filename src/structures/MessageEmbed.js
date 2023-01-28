const { EmbedBuilder } = require('discord.js');

class MessageEmbed extends EmbedBuilder {
  constructor(embed) {
    super();
    if(typeof(embed) == "object") {
      if(embed.title) this.setTitle(embed.title);
      if(embed.description) this.setDescription(embed.description);
      if(embed.color) this.setColor(embed.color);
      if(embed.url) this.setURL(embed.url);
      if(embed.thumbnail) this.setThumbnail(embed.thumbnail);
      if(typeof(embed.author) == "object") {
        try {
          this.setAuthor(embed.author);
        } catch(e) {
          console.log(e);
        }
      }
      if(embed.timestamp) {
        if(embed.timestamp === true) {
          this.setTimestamp();
        } else {
          return;
        }
      }
      if(embed.footer) this.setFooter(embed.footer);
      if(embed.image) this.setImage(embed.image);
      if(embed.fields) this.addFields(embed.fields);
      return this;
    }
  }
}

module.exports = MessageEmbed;

// © 2022 @Sempai Development