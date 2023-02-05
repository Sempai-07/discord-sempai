const { Client, Collection, ActivityType, PermissionsBitField, ApplicationCommandType, EmbedBuilder} = require('discord.js');
const AsciiTable = require('ascii-table');
const fs = require('fs');
const path = require('path');
const chalk = require('chalk');


class Bot extends Client {
  constructor(options = BotOptions) {
    super({intents: 131071});
    this.token = options.token,
    this.prefix = options.prefix,
//    this.intents = options.intents || 131071,
    this.status = options.status || undefined,
    this.activity,
    this.help = options.help || true,
    this.ready = options.ready || true,
    this.commands = new Collection(),
    this.aliases = new Collection(),
    this.slashCommands = new Collection(),
    this.selects = new Collection(),
    this.buttons = new Collection(),
    this.modals = new Collection()
 
    this.on('messageCreate', async (message) => {
      this.prefix = typeof this.prefix === "string" ? [this.prefix] : this.prefix;
      let prefixes = [];
      for (const prefix of this.prefix) {
        prefixes.push(prefix);
      }
      const prefix = prefixes
      .find((prefix) =>
      message.content.toLowerCase().startsWith(prefix.toLowerCase())
     );
      if(message.author.bot) return;
      if(message.channel.type !== 0) return;
      if(!message.content.startsWith(prefix)) return; 
      const args = message.content.slice(prefix.length).trim().split(/ +/g); 
      const cmd = args.shift().toLowerCase();
      if(cmd.length == 0) return;
      let client = this;
      let command = client.commands.get(cmd);
      if(!command) command = client.commands.get(client.aliases.get(cmd));
      if(!command) return;
      command.code(client, message, args);
    });
    
    this.on('interactionCreate', async (interaction) => {
      const client = this;
      if (!interaction.isStringSelectMenu()) return;
      const select = client.selects.get(interaction.values.join(', '));
      if (!select) return;
      try {
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
      
      this.on('ready', async() => {
        if (this.ready) {
        console.log(chalk.green(`Discord-sempai: version 0.2.3\nBot called ${this.user.tag} launched\nOfficial support server: https://discord.gg/j8G7jhHMbs`));
        }
        if (!this.activity) {
          this.user.setPresence({
            status: this.status
          });
        } else {
          this.user.setPresence({
            activities: [this.activity],
            status: this.status
          });
        }
      });
  }
  
  command(options) {
        this.commands.set(options.name, options);
        if(options.aliases && Array.isArray(options.aliases)) options.aliases.forEach(alias => this.aliases.set(alias, options.name));
    }
    
  interactionCreate(options) {
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
    
    slashCommand(options) {
      if (!options.name) return console.log(new TypeError("Invalid slashCommands name"));
      if (!options.description) return console.log(new TypeError("Invalid slashCommands description"));
      this.slashCommands.set(options.name, options);
    }
    
    createEvent(options) {
      if (options.once) {
        this.once(options.name, (...args) => options.code(...args));
      } else if (options === false) {
        this.on(options.name, (...args) => options.code(...args));
        } else {
          return console.log(new TypeError('Invalid once options'));
        }
      }
    
    async loaderComponent(dir) {
      if (!dir) return console.log(new TypeError("Invalid loaderComponent directory"));
      const Select = new AsciiTable().setHeading('Select', 'Status').setBorder('|', '=', "0", "0");
      const Button = new AsciiTable().setHeading('Button', 'Status').setBorder('|', '=', "0", "0");
      const Modal = new AsciiTable().setHeading('Modal', 'Status').setBorder('|', '=', "0", "0");
      const components = await fs.readdirSync(path.join(process.cwd(),dir)).filter(file => file.endsWith('.js'));
      components.forEach(async(component) => {
        const pull = require(path.join(process.cwd(),`${dir}${component}`));
      if (pull.type === 'select') {
        this.selects.set(pull.id, pull);
        await Select.addRow(pull.id, '✔️');
      } else if (pull.type === 'button') {
        this.buttons.set(pull.id, pull);
        await Button.addRow(pull.id, '✔️');
      } else if (pull.type === 'modal') {
       this.modals.set(pull.id, pull);
       await Modal.addRow(pull.id, '✔️');
      } else {
        console.log(new TypeError("interactionCreate type invalid"));
      }
      });
      await console.log(chalk.blue(Select.toString()));
      await console.log(chalk.blue(Button.toString()));
      await console.log(chalk.blue(Modal.toString()));
    }
    
    async loaderTextCmd(dir) {
      if (!dir) return console.log(new TypeError("Invalid loaderTextCmd directory"));
      const loaderTextCmd = new AsciiTable().setHeading('Text cmd', 'Status').setBorder('|', '=', "0", "0");
      const commands = await fs.readdirSync(path.join(process.cwd(),dir)).filter(file => file.endsWith('.js'));
      commands.forEach(async(cmd) => {
        const pull = require(path.join(process.cwd(),`${dir}${cmd}`));
        this.commands.set(pull.name, pull);
        await loaderTextCmd.addRow(pull.name, '✔️');
        if(pull.aliases && Array.isArray(pull.aliases)) pull.aliases.forEach(alias => this.aliases.set(alias, pull.name));
      });
      await console.log(chalk.blue(loaderTextCmd.toString()));
    }
    
    async loaderSlashCmd(dir) {
      if (!dir) return console.log(new TypeError("Invalid loaderSlashCmd directory"));
      const loaderSlashCmd = new AsciiTable().setHeading('Slash cmd', 'Status').setBorder('|', '=', "0", "0");
      const slashCommands = await fs.readdirSync(path.join(process.cwd(), dir)).filter(file => file.endsWith('.js'));
      slashCommands.forEach(async(slash) => {
        const pull = require(path.join(process.cwd(),`${dir}${slash}`));
        this.slashCommands.set(pull.name, pull);
        await loaderSlashCmd.addRow(pull.name, '✔️');
      });
      await console.log(chalk.blue(loaderSlashCmd.toString()));
    }
    
  async loaderEvent(dir) {
      const loaderEvent = new AsciiTable().setHeading('Events', 'Status').setBorder('|', '=', "0", "0");
      const eventsPath = await path.join(path.join(process.cwd(), dir));
      const eventFiles = await fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));
      for (const file of eventFiles) {
        const filePath = path.join(eventsPath, file);
        const event = require(filePath);
       await loaderEvent.addRow(event.name, '✔️');
        if (event.once) {
          this.once(event.name, (...args) => event.code(...args));
        } else {
          this.on(event.name, (...args) => event.code(...args));
        }
      }
      await console.log(chalk.blue(loaderEvent.toString()));
    }
    
    Status(options = {name: "online", activity: undefined}) {
      let ClientStatus = options.status;
      let ClientActivity = options.activity;
      this.status = ClientStatus,
      this.activity = ClientActivity;
    }
    
    connect() {
    this.login(this.token);
    if (this.help) {
      this.command({
        name: 'help',
        code: async(client, message, args) => {
          let TextCmds = await message.client.commands.filter(c => c.name);
          let SlashCmds = await message.client.slashCommands.filter(c => c.name);
          // ––––––––––––––––––– //
          let text_cmd = await TextCmds.map(c => c.name).join("\n");
          let slash_cmd = await SlashCmds.map(c => c.name).join("\n");
          message.reply("Text cmd\n" + text_cmd +'\n\nSlash cmd\n'+ slash_cmd);
        }
      });
    }
    setTimeout(async() => {
      if(this.slashCommands.size != 0) {
        await this.application.commands.set(this.slashCommands);
        console.log(chalk.yellow("Slashes registered"));
      }
    }, 8000);
  }
}

module.exports = Bot;

// © 2022 @Sempai Development