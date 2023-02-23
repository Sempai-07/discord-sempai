const { ActionRowBuilder, ButtonBuilder, SelectMenuBuilder, StringSelectMenuBuilder } = require('discord.js');

class ActionComponent extends ActionRowBuilder {
  constructor() {
    super();
  }

  addButton(button = ButtonOptions) {
    if (!button.customId) return console.log(new TypeError("Invalid button customId"));
    if (!button.label) return console.log(new TypeError("Invalid button label"));
    if (!button.style) return console.log(new TypeError("Invalid button style"));

    const buttonBuilder = new ButtonBuilder()
      .setCustomId(button.customId)
      .setLabel(button.label)
      .setStyle(button.style)
      .setDisabled(button.disabled || false)
      .setEmoji(button.emoji || undefined);

    if (button.url) {
      buttonBuilder.setURL(button.url);
    }

    this.addComponents(buttonBuilder);
    return this;
  }

  addSelectMenu(menu = SelectMenuBuilder) {
    if (!menu.customId) return console.log(new TypeError("Invalid select customId"));
    if (!menu.placeholder) return console.log(new TypeError("Invalid select placeholder"));
    if (!menu.options && typeof(menu.options) === "object") return console.log(new TypeError("Invalid select options"));

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
