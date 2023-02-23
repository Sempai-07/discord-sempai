const { TextInputBuilder, TextInputStyle, ActionRowBuilder } = require('discord.js');

class ModalText extends TextInputBuilder {
  constructor(textModal = ModalTextOptions) {
    super();
    if (!textModal.customId) return console.log(new TypeError("Invalid ModalText customId"));
    if (!textModal.label) return console.log(new TypeError("Invalid ModalText label"));
    this.setCustomId(textModal.customId);
    this.setLabel(textModal.label);
    this.setStyle(textModal.style || TextInputStyle.Paragraph);
    this.setMaxLength(textModal.maxValue || 4000);
	  this.setMinLength(textModal.maxValue || 0);
	  this.setPlaceholder(textModal.placeholder);
	  this.setValue(textModal.value);
	  this.setRequired(textModal.required || true);
	  let component = new ActionRowBuilder().addComponents(this);
	  return component;
  }
}

module.exports = ModalText;

// © 2022 @Sempai Development