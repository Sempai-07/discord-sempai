const { SlashCommandStringOption } = require('discord.js');

class SlashCommandOption extends SlashCommandStringOption {
  constructor(data) {
    super(data);
    this.setName(data.name);
    this.setDescription(data.description);
    this.setRequired(data.required || false);
  }
}

module.exports = SlashCommandOption;
