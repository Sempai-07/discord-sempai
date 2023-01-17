const { Client, Collection, ActivityType, PermissionsBitField, ApplicationCommandType, EmbedBuilder} = require('discord.js');
const fs = require('fs');
const path = require('path');
const chalk = require('chalk');


class Bot extends Client {
  constructor(options = BotOptions) {
    super({intents: 131071});
    this.token = options.token,
    this.prefix = options.prefix,
    this.intents = options.intents || 131071,
    this.status = options.status || undefined,
    this.help = options.help || true,
    this.commands = new Collection(),
    this.aliases = new Collection(),
    this.slashCommands = new Collection(),
    this.selects = new Collection(),
    this.buttons = new Collection(),
    this.modals = new Collection();
 
    this.on('messageCreate', async (message) => {
      const prefix = this.prefix;
      if(message.author.bot) return;
      if(message.channel.type !== 0) return;
      if(!message.content.startsWith(prefix)) return; 
      const args = message.content.slice(prefix.length).trim().split(/ +/g); 
      const cmd = args.shift().toLowerCase();
      if(cmd.length == 0) return;
      let client = this;
      let command = client.commands.get(cmd);
      if(!command) command = client.commands.get(client.aliases.get(cmd));
				command.code(client, message, args);
    });
    
    this.on('interactionCreate', async (interaction) => {
      const client = this;
      if (!interaction.isStringSelectMenu()) return;
      const select = client.selects.get(interaction.values.join(', '));
      if (!select) return;
      try {
//        console.log(select)
        await select.code(client, interaction);
      } catch (error) {
        console.log(error);
      }
    });
    
    this.on('interactionCreate', async (interaction) => {
      const client = this;
      if (!interaction.isButton()) return;
      const button = client.buttons.get(interaction.customId);
      if (!button) return;
      try {
        await button.code(client, interaction);
      } catch (error) {
        console.log(error);
      }
    });
    
    this.on("interactionCreate", async(interaction) => {
        if (!interaction.isCommand()) return;

        const command = this.slashCommands.get(interaction.commandName);
        if (!command) return;
        let client = this;
        try {
          await command.code(client, interaction);
        } catch (err) {
          console.log(err);
        }
      });
      
      this.on('interactionCreate', async(interaction) => {
        if (!interaction.isModalSubmit()) return;
        const modal = this.modals.get(interaction.customId);
        if (!modal) return;
        let client = this;
        try {
          await modal.code(client, interaction);
        } catch (err) {
          console.log(err);
        }
      });
      
      this.on('interactionCreate', async(interaction) => {
        if (!interaction.isMessageContextMenuCommand()) return;
        console.log('1')
        await interaction.deferReply({
           ephemeral: false
        });
        const command = this.slashCommands.get(interaction.commandName);
        console.log(command)
        if (!command) return;
        let client = this;
        try {
          await command.code(client, interaction);
        } catch (err) {
          console.log(err);
        }
      });

      this.on('ready', async() => {
       let ClientStatus = this.status;
        if (ClientStatus === undefined) return;
        if (ClientStatus === "idle" || ClientStatus === "dnd" || ClientStatus === "online" || ClientStatus === "invisible") {
          this.user.setPresence;
          this.user.setPresence({
            status: ClientStatus
          });
        } else {
          console.log(new TypeError("Invalid status name: " + ClientStatus));
          process.exit();
        }
      });
  }
  
  command(options = CommandOptions) {
      this.commands.set(options.name, options);
      if(options.aliases && Array.isArray(options.aliases)) options.aliases.forEach(alias => this.aliases.set(alias, options.name));
    }
    
  interactionCreate(options = InteractionOption) {
      if (options.type === 'select') {
      this.selects.set(options.id, options);
      } else if (options.type === 'button') {
      this.buttons.set(options.id, options);
      } else if (options.type === 'modal') {
       this.modals.set(options.id, options);
      } else {
        console.log(new TypeError("interactionCreate type invalid " + options.type));
      }
    }
    
    slashCommand(options = SlashCommandOptions) {
      if (!options.name) return console.log(new TypeError("Invalid slashCommands name"));
      if (!options.description) return console.log(new TypeError("Invalid slashCommands description"));
      this.slashCommands.set(options.name, options);
    }
    
    createEvent(dir) {
      const eventsPath = path.join(path.join(process.cwd(), dir));
      const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));
      for (const file of eventFiles) {
        const filePath = path.join(eventsPath, file);
        const event = require(filePath);
        if (event.once) {
          this.once(event.name, (...args) => event.execute(...args));
        } else {
          this.on(event.name, (...args) => event.code(...args));
        }
      }
    }
    
    loaderComponent(dir) {
      if (!dir) return console.log(new TypeError("Invalid loaderComponent directory"));
      const components = fs.readdirSync(path.join(process.cwd(),dir));
      components.forEach(async(component) => {
        const pull = await require(path.join(process.cwd(),`${dir}${component}`));
      if (pull.type === 'select') {
        this.selects.set(pull.id, pull);
      } else if (pull.type === 'button') {
        this.buttons.set(pull.id, pull);
        console.log(chalk.pink('Кнопка: ' + pull.id + ', успешно загружена'));
      } else if (pull.type === 'modal') {
       this.modals.set(pull.id, pull);
       console.log(chalk.red('Модальное окно: ' + pull.id + ', успешно загружено'));
      } else {
        console.log(new TypeError("interactionCreate type invalid"));
      }
      });
    }
    
    loaderTextCmd(dir) {
      if (!dir) return console.log(new TypeError("Invalid loaderTextCmd directory"));
      const commands = fs.readdirSync(path.join(process.cwd(),dir));
      commands.forEach(async(cmd) => {
        const pull = await require(path.join(process.cwd(),`${dir}${cmd}`));
        console.log(chalk.blue(`Текстовая команда: ${pull.name}, успешно загружена`));
        this.commands.set(pull.name, pull);
        if(pull.aliases && Array.isArray(pull.aliases)) pull.aliases.forEach(alias => this.aliases.set(alias, pull.name));
      });
    }
    
    loaderSlashCmd(dir) {
      if (!dir) return console.log(new TypeError("Invalid loaderSlashCmd directory"));
      const slashCommands = fs.readdirSync(path.join(process.cwd(), dir));
      slashCommands.forEach(async(slash) => {
        const pull = await require(path.join(process.cwd(),`${dir}${slash}`));
        this.slashCommands.set(pull.name, pull);
        console.log(chalk.blue('Слэш команда: ' + pull.name + ' успешно зарегистрирована'));
      });
    }
    
    loaderEvent(dir) {
      const eventsPath = path.join(path.join(process.cwd(), dir));
      const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));
      for (const file of eventFiles) {
        const filePath = path.join(eventsPath, file);
        const event = require(filePath);
        if (event.once) {
          this.once(event.name, (...args) => event.code(...args));
        } else {
          this.on(event.name, (...args) => event.code(...args));
        }
      }
    }
    
    connect() {
    this.login(this.token);
    setTimeout(async() => {
      console.log(chalk.green(`Discord-sempai: версия 0.0.9\nБот под названием ${this.user.tag} запущен\nОфициальный сервер поддержки: https://discord.gg/j8G7jhHMbs`));
          if(this.slashCommands.size != 0) {
            await this.application.commands.set(this.slashCommands);
            console.log(chalk.yellow("Слэшы зарегистрированные"));
          }
        }, 8000);
  }
}

module.exports = Bot;