const { ActionRowBuilder, ButtonBuilder, SelectMenuBuilder, StringSelectMenuBuilder} = require('discord.js');
//const ButtonStyleOptions = require("./Options/options.js");

class ActionComponent extends ActionRowBuilder{
  constructor() {
    super();
  }
  
  addButton(button = ButtonOptions) {
    if (!button.id) return console.log(new TypeError("Invalid button id"));
    if (!button.label) return console.log(new TypeError("Invalid button label"));
    if (!button.style) return console.log(new TypeError("Invalid button style"));
    this.addComponents(
      new ButtonBuilder()
      .setCustomId(button.id)
      .setLabel(button.label)
      .setStyle(button.style)
      .setDisabled(button.disabled || false)
      );
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
					.setMinValues(menu.minValues || 1)
					.setMaxValues(menu.maxValues || 1)
					.addOptions(menu.options)
					);
					return this;
  }
}

module.exports = ActionComponent;