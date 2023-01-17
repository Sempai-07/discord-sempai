const { ModalBuilder } = require('discord.js');

class Modal extends ModalBuilder {
  constructor(modal = ModalOptions) {
    super();
      if (!modal.id) return console.log(new TypeError("Invalid Modal id"));
      if (!modal.title) return console.log(new TypeError("Invalid Modal title"));
      this.setCustomId(modal.id);
      this.setTitle(modal.title);
      return this;
  }
}

module.exports = Modal;