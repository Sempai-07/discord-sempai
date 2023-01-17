const { ContextMenuCommandBuilder, ApplicationCommandType } = require('discord.js');

class ContextMenu extends ContextMenuCommandBuilder {
  constructor(options) {
  super();
	this.setName('Info user')
	this.setType(ApplicationCommandType.User)
	return this;
  }
}

module.exports = ContextMenu;