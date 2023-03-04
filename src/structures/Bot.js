const { Client, Collection, ActivityType, PermissionsBitField, ApplicationCommandType, EmbedBuilder} = require('discord.js');
const AsciiTable = require('ascii-table');
const fs = require('fs');
const path = require('path');
const chalk = require('chalk');
const { promisify } = require('util');
const readdir = promisify(fs.readdir);



class Bot extends Client {
  constructor(options = BotOptions) {
    super({intents: 131071});
    this.prefix = options.prefix,
    this.status = options.status || undefined,
    this.activity,
    this.help = options.help || true,
    this.ready = options.ready || true,
    this.commands = new Collection(),
    this.aliases = new Collection(),
    this.slashCommands = new Collection(),
    this.selects = new Collection(),
    this.buttons = new Collection(),
    this.modals = new Collection(),
    this.contextMenu = new Collection()
    
    
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
      try {
        await command.code(client, message, args);
       } catch(error) {
        console.log(error)
       }
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
    
    this.on('interactionCreate', async (interaction) => {
  if (!interaction.isCommand()) return;
  const client = this;
  const { commandName, options } = interaction;
  const command = client.slashCommands.get(commandName);

  if (!command) return;

  try {
    const args = {};
    command.options.forEach((option) => {
      console.log(option);
      let value = options.get(option.name);

      if (value === undefined) {
        if (option.required) {
          throw new Error(`Missing required option: ${option.name}`);
        } else {
          args[option.name] = option.default ?? null;
        }
      } else {
        switch (option.type) {
          case 1:
          case 2:
            args[option.name] = value.name;
            options.forEach((subOption) => {
              args[subOption.name] = subOption.value;
            });
            break;
          case 3:
          case 7:
          case 6:
          case 8:
            args[option.name] = value.toString();
            break;
          case 4:
          case 10:
            if (typeof value === 'number') {
              args[option.name] = value;
            } else {
              const numberValue = parseInt(value.value);
              if (isNaN(numberValue)) {
                throw new Error(`Option ${option.name} must be a number`);
              }
              args[option.name] = numberValue;
            }
            break;
          case 5:
            args[option.name] = value === 'true';
            break;
          default:
            throw new Error(`Unsupported option type: ${option.type}`);
        }
      }
    });

    await command.code(client, interaction, args);
  } catch (error) {
    console.error(error);
  }
});


            
      this.on("interactionCreate", async(interaction) => {
        if (!interaction.isContextMenuCommand()) return;
        const command = this.contextMenu.get(interaction.commandName);
        if (!command) return;
        let client = this;
        try {
          await command.code(client, interaction);
        } catch (error) {
          console.log(error);
        }
      })
    
      
      this.on('ready', async() => {
        if (this.ready) {
        console.log(chalk.green(`Discord-sempai: version 0.3.0\nBot called ${this.user.tag} launched\nOfficial support server: https://discord.gg/j8G7jhHMbs`));
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
      if (options.prototype === 'select') {
      this.selects.set(options.id, options);
      } else if (options.prototype === 'button') {
      this.buttons.set(options.id, options);
      } else if (options.prototype === 'modal') {
       this.modals.set(options.id, options);
      } else if (options.prototype === 'contextmenu') {
       this.contextMenu.set(options.name, options)
       setTimeout(async() => {
          await this.application.commands.create(options);
      }, 4000)
      } else {
        console.log(new TypeError("interactionCreate prototype invalid " + options.type));
      }
    }
    
    slashCommand(options) {
      if (!options.name) return console.log(new TypeError("Invalid slashCommands name"));
      if (!options.description) return console.log(new TypeError("Invalid slashCommands description"));
      this.slashCommands.set(options.name, options);
      setTimeout(async() => {
          await this.application.commands.create(options);
      }, 4000)
    }
    
    createEvent(options) {
        const client = this;
        const { name, once, code } = options;

  if (once) {
    client.once(name, (...args) => code(client, ...args));
  } else {
    client.on(name, (...args) => code(client, ...args));
  }
}

    
    async loaderComponent(dir) {
  if (!dir) return console.log(new TypeError("Invalid loaderComponent directory"));
  const Select = new AsciiTable().setHeading('Select', 'Status').setBorder('|', '=', "0", "0");
  const Button = new AsciiTable().setHeading('Button', 'Status').setBorder('|', '=', "0", "0");
  const Modal = new AsciiTable().setHeading('Modal', 'Status').setBorder('|', '=', "0", "0");
  const ContextMenu = new AsciiTable().setHeading('ContextMenu', 'Status').setBorder('|', '=', "0", "0");
  const components = await fs.readdirSync(dir).filter(file => file.endsWith('.js'));
  for (const component of components) {
    const pull = require(path.join(dir, component));
    if (pull.prototype === 'select') {
      this.selects.set(pull.id, pull);
      await Select.addRow(pull.id, '✔️');
    } else if (pull.prototype === 'button') {
      this.buttons.set(pull.id, pull);
      await Button.addRow(pull.id, '✔️');
    } else if (pull.prototype === 'modal') {
     this.modals.set(pull.id, pull);
     await Modal.addRow(pull.id, '✔️');
    } else if (pull.prototype === 'contextmenu') {
     this.contextMenu.set(pull.name, pull)
     setTimeout(async() => {
          await this.application.commands.create(pull);
      }, 4000)
     await ContextMenu.addRow(pull.name, '✔️')
    } else {
      console.log(new TypeError("interactionCreate prototype invalid"));
    }
  }
  console.log(chalk.blue(Select.toString()));
  console.log(chalk.blue(Button.toString()));
  console.log(chalk.blue(Modal.toString()));
console.log(chalk.blue(ContextMenu.toString()));
}

async loaderSlashCmd(dir) {
  if (!dir) return console.log(new TypeError("Invalid loaderSlashCmd directory"));
  const loaderSlashCmd = new AsciiTable().setHeading('Slash cmd', 'Status').setBorder('|', '=', "0", "0");
  const slashCommands = await fs.readdirSync(dir).filter(file => file.endsWith('.js'));
  for (const slash of slashCommands) {
    const pull = require(path.join(dir, slash));
    setTimeout(async() => {
          await this.application.commands.create(pull);
      }, 4000)
    await this.slashCommands.set(pull.name, pull)
    await loaderSlashCmd.addRow(pull.name, '✔️');
  }
  console.log(chalk.blue(loaderSlashCmd.toString()));
}

    async loaderEvent(dir) {
  if (!dir) return console.log(new TypeError("Invalid loaderEvent directory"));

  const loaderEvent = new AsciiTable().setHeading('Events', 'Status').setBorder('|', '=', "0", "0");

  const readDirRecursive = async (directory) => {
    const files = await fs.readdirSync(directory);
    for (const file of files) {
      const filePath = path.join(directory, file);
      console.log(path.join(directory, file));
      if (fs.statSync(filePath).isDirectory()) {
        await readDirRecursive(filePath);
      } else if (file.endsWith('.js')) {
        const event = require(filePath);
        await loaderEvent.addRow(event.name, '✔️');
        const client = this;
        if (event.once) {
    client.once(event.name, (...args) => code(client, ...args));
  } else {
    client.on(event.name, (...args) => code(client, ...args));
      }
    }
  };

  await readDirRecursive(path.join(process.cwd(), dir));
  await console.log(chalk.blue(loaderEvent.toString()));
 }
}

    
    async loaderTextCmd(dir) {
  if (!dir) return console.log(new TypeError("Invalid loaderTextCmd directory"));

  const loaderTextCmd = new AsciiTable().setHeading('Text cmd', 'Status').setBorder('|', '=', "0", "0");

  const readDirRecursive = async (directory) => {
    const files = await fs.readdirSync(directory);
    for (const file of files) {
      const filePath = path.join(directory, file);
      if (fs.statSync(filePath).isDirectory()) {
        await readDirRecursive(filePath);
      } else if (file.endsWith('.js')) {
        const pull = require(filePath);
        this.commands.set(pull.name, pull);
        await loaderTextCmd.addRow(pull.name, '✔️');
        if(pull.aliases && Array.isArray(pull.aliases)) pull.aliases.forEach(alias => this.aliases.set(alias, pull.name));
      }
    }
  }

  await readDirRecursive(path.join(process.cwd(), dir));
  await console.log(chalk.blue(loaderTextCmd.toString()));
}

    Status(options = {name: "online", activity: undefined}) {
      let ClientStatus = options.status;
      let ClientActivity = options.activity;
      this.status = ClientStatus,
      this.activity = ClientActivity;
    }
    
    connect(token) {
    this.login(token);
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
  }
}

module.exports = Bot;

// © 2022 @Sempai Development