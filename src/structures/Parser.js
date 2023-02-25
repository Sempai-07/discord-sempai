const { EmbedBuilder, SelectMenuBuilder, StringSelectMenuBuilder, ButtonBuilder, ActionRowBuilder } = require('discord.js');
const { EmbedParser } = require("./Util/Function.js");

class Parser {
  constructor(options) {
    this.content = options.content,
    this.embeds = options.embeds;
    if (typeof this.content === 'string') this.embed = EmbedParser(this.content)
    
    if (typeof this.embeds == "object") {
      const embed = new EmbedBuilder()
      if(this.embeds.title) embed.setTitle(this.embeds.title);
      if(this.embeds.description) embed.setDescription(this.embeds.description);
      if(this.embeds.color) embed.setColor(this.embeds.color);
      if(this.embeds.url) embed.setURL(this.embeds.url);
      if(this.embeds.thumbnail) embed.setThumbnail(this.embeds.thumbnail);
      if(typeof(this.embeds.author) == "object") {
        try {
          embed.setAuthor(this.embeds.author);
        } catch(e) {
          console.log(e);
        }
      }
      if(this.embeds.timestamp) embed.setTimestamp(this.embeds.timestamp);
      if(this.embeds.footer) embed.setFooter(this.embeds.footer);
      if(this.embeds.image) embed.setImage(this.embeds.image);
      if(this.embeds.fields) embed.addFields(this.embeds.fields);
      return embed;
    }
    if (typeof this.embed == "object") {
      const embed = new EmbedBuilder()
      if(this.embed.title) embed.setTitle(this.embed.title);
      if(this.embed.description) embed.setDescription(this.embed.description);
      if(this.embed.color) embed.setColor(this.embed.color);
      if(this.embed.url) embed.setURL(this.embed.url);
      if(this.embed.thumbnail) embed.setThumbnail(this.embed.thumbnail);
      if(typeof(this.embed.author) == "object") {
        try {
          embed.setAuthor(this.embed.author);
        } catch(e) {
          console.log(e);
        }
      }
      if(this.embed.timestamp) embed.setTimestamp(this.embed.timestamp);
      if(this.embed.footer) embed.setFooter(this.embed.footer);
      if(this.embed.image) embed.setImage(this.embed.image);
      if(this.embed.fields) embed.addFields(this.embed.fields);
      return embed;
    }
  }
}

module.exports = Parser;

// © 2022 @Sempai Development