const { ActionRowBuilder, ButtonBuilder, SelectMenuBuilder, StringSelectMenuBuilder } = require('discord.js');

class ActionComponent extends ActionRowBuilder {
  constructor() {
    super();
  }

  addButton(button) {
  const buttonBuilder = new ButtonBuilder()
    .setLabel(button.label)
    .setStyle(button.style)
    .setDisabled(button.disabled || false)
    .setEmoji(button.emoji || undefined);
    if (!button.url) {
    buttonBuilder.setCustomId(button.customId)
  }
    if (button.url) {
    buttonBuilder.setURL(button.url);
  }

  this.addComponents(buttonBuilder);
  return this;
}


  addSelectMenu(menu) {
    this.addComponents(
      new StringSelectMenuBuilder()
        .setCustomId(menu.customId)
        .setPlaceholder(menu.placeholder)
        .setMinValues(menu.minValue || 1)
        .setMaxValues(menu.maxValue || 1)
        .addOptions(menu.options)
    );
    return this;
  }
}

module.exports = ActionComponent;
