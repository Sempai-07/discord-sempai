const { TextInputBuilder, TextInputStyle, ActionRowBuilder } = require('discord.js');

class ModalText extends TextInputBuilder {
  constructor(textModal = ModalTextOptions) {
    super();
    if (!textModal.id) return console.log(new TypeError("Invalid ModalText id"));
    if (!textModal.label) return console.log(new TypeError("Invalid ModalText label"));
//    if (!textModal.placeholder) return console.log(new TypeError("Invalid ModalText placeholder"));
    this.setCustomId(textModal.id);
    this.setLabel(textModal.label);
    this.setStyle(TextInputStyle.Paragraph);
    this.setMaxLength(textModal.max || 4000);
	  this.setMinLength(textModal.min || 0);
	  this.setPlaceholder(textModal.placeholder);
	  this.setValue(textModal.value);
	  this.setRequired(textModal.required || true);
	  let component = new ActionRowBuilder().addComponents(this);
	  return component;
  }
}

module.exports = ModalText;