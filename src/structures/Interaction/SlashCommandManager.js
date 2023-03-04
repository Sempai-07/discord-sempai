const { SlashCommandBuilder } = require('discord.js');

class SlashCommandManager {
  constructor(options = {}) {
    this.name = options.name;
    this.description = options.description;
    this.options = options.options;
    this.isGlobal = options.isGlobal || true;
    this.guildId = options.guildId || null;
    this.handler = options.handler;
    this.builder = new SlashCommandBuilder()
      .setName(this.name)
      .setDescription(this.description);

    if (this.options) {
  const mappedOptions = this.options.map((option) => ({
    name: option.name,
    type: 3,
    description: option.description,
    required: option.required,
    choices: option.choices,
  }));
  mappedOptions.forEach((option) => {
    this.addOption(option)
    console.log(this)
    })
    }
    }

  setHandler(handler) {
    this.handler = handler;
  }

  setGlobal(bool) {
    this.isGlobal = bool;
  }

  setGuild(guildId) {
    this.guildId = guildId;
  }

  setDescription(description) {
    this.builder.setDescription(description);
  }

  addOption(option) {
    this.builder.addStringOption((opt) =>
      opt.setName(option.name).setDescription(option.description).setRequired(option.required),
    );
  }

  addChoiceToOption(optionName, choice) {
    const option = this.builder.options.find((o) => o.name === optionName);
    console.log(option)
    if (option && option.type === 3) {
      option.addChoices(choice);
    } else {
      throw new Error(`Option ${optionName} not found or is not a string option`);
    }
  }

  addSubcommand(subcommand) {
    this.builder.addSubcommand(subcommand);
  }

  addSubcommandGroup(subcommandGroup) {
    this.builder.addSubcommandGroup(subcommandGroup);
  }

  register(client) {
    if (this.isGlobal) {
      client.application.commands.create(this.builder.toJSON())
        .then(() => console.log(`Global command ${this.builder.name} registered successfully.`))
        .catch((err) => console.error(`Error registering global command ${this.builder.name}:`, err));
    } else {
      client.guilds.cache.forEach((guild) => {
        if (this.guildId && guild.id !== this.guildId) return;
        guild.commands.create(this.builder.toJSON())
          .then(() => console.log(`Local command ${this.builder.name} successfully registered with server ${guild.name} .`))
          .catch((err) => console.error(`Error registering local command ${this.builder.name} on server ${guild.name} :`, err));
      });
    }

    if (this.handler) {
      client.on('interactionCreate', (interaction) => {
        if (!interaction.isCommand() || interaction.commandName !== this.builder.name) return;
        this.handler(interaction);
      });
    }
  }

  // Метод для установки прав доступа к команде
  setPermission(permission) {
    this.permission = permission;
  }

  // Метод для обновления команды
  update(client) {
    client.guilds.cache.forEach((guild) => {
      guild.commands.fetch().then((commands) => {
        const command = commands.find((cmd) => cmd.name === this.builder.name);
        if (command) {
          command.permissions.set({ permissions: this.permission });
          console.log(`${this.builder.name} command updated .`);
        }
      });
    });
  }
}


module.exports = SlashCommandManager