const { ModalBuilder } = require('discord.js');

class Modal extends ModalBuilder {
  constructor(modal = ModalOptions) {
    super();
      if (!modal.customId) return console.log(new TypeError("Invalid Modal id"));
      if (!modal.title) return console.log(new TypeError("Invalid Modal title"));
      this.setCustomId(modal.customId);
      this.setTitle(modal.title);
      return this;
  }
}

module.exports = Modal;

// © 2022 @Sempai Development