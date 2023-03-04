const { ContextMenuCommandInteraction, GuildMember, ApplicationCommandType } = require('discord.js');

class ContextMenuManager {
  constructor(options = {}) {
    this.type = options.type;
    this.name = options.name;
    this.isGlobal = options.isGlobal || true;
    this.guildId = options.guildId || null;
    this.handler = options.handler;

    if (this.type === 'USER' || this.type === ApplicationCommandType.User) {
      this.builder = {
        type: ApplicationCommandType.User,
        name: this.name,
        description: options.description,
      };
    } else if (this.type === 'MESSAGE' || this.type === ApplicationCommandType.Message) {
      this.builder = {
        type: ApplicationCommandType.Message,
        name: this.name,
        description: options.description,
      };
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
    this.builder.description = description;
  }

  register(client) {
    if (this.isGlobal) {
      client.application.commands.create(this.builder)
        .then(() => console.log(`Global ${this.type} context menu ${this.builder.name} registered successfully.`))
        .catch((err) => console.error(`Error registering global ${this.type} context menu ${this.builder.name}:`, err));
    } else {
      client.guilds.cache.forEach((guild) => {
        if (this.guildId && guild.id !== this.guildId) return;
        guild.commands.create(this.builder)
          .then(() => console.log(`Local ${this.type} context menu ${this.builder.name} successfully registered with server ${guild.name}.`))
          .catch((err) => console.error(`Error registering local ${this.type} context menu ${this.builder.name} on server ${guild.name}:`, err));
      });
    }

    if (this.handler) {
      client.on('interactionCreate', (interaction) => {
        if (!interaction.isContextMenuCommand() || interaction.commandName !== this.builder.name) return;
        this.handler(interaction);
      });
    }
  }

  // Метод для установки прав доступа к контекстному меню
  setPermission(permission) {
    this.permission = permission;
  }

  // Метод для обновления контекстного меню
  update(client) {
    client.guilds.cache.forEach((guild) => {
      guild.commands.fetch().then((commands) => {
        const command = commands.find((cmd) => cmd.name === this.builder.name && cmd.type === this.type);
        if (command) {
          command.permissions.set({ permissions: this.permission });
          console.log(`${this.builder.name} ${this.type} context menu updated.`);
        }
      });
    });
  }

  // Метод для получения пользователя из контекста
  static getUserFromInteraction(interaction) {
      console.log(interaction.targetUser)
      return interaction?.targetUser;
  }

  // Метод для получения сообщения из контекста
  static getMessageFromInteraction(interaction) {
      return interaction?.targetId;
  }

  // Метод для проверки разрешения на выполнение команды для участника сервера
  static checkPermissions(member, permissions) {
    if (!(member instanceof GuildMember)) return false;
   
    const missingPermissions = member.permissions.missing(permissions);
    if (missingPermissions.length) {
      return `\`${missingPermissions.map(perm => perm.toLowerCase().replace(/_/g, ' ')).join(', ')}\``;
    }
    return true;
  }
}

module.exports = ContextMenuManager;