### Discord sempai

[![Discord Server](https://img.shields.io/discord/796504104565211187?color=7289da&logo=discord&logoColor=white)](https://discord.gg/EuSbT5HH8b)
[![NPM Version](https://img.shields.io/npm/v/discord-sempai.svg?maxAge=3600)](https://www.npmjs.com/package/discord-sempai)
[![NPM Downloads](https://img.shields.io/npm/dt/discord-sempai.svg?maxAge=3600)](https://www.npmjs.com/package/discord-sempai)


#### Установка
```js
npm i discord-sempai@0.0.10@beta
npm i discord.js@14.7.1
npm i database-sempai@2.0.4
npm i axios@1.2.2
```

#### Классы
- `Bot`
- `MessageEmbed`
- `Database`
- `ActionComponent`
- `ModalText`
- `Modal`
- `MessageAttachment`
- `Link`
- `Roles`
- `Invites`
##### Ещё не доработанные:
- `ContextMenu`

#### Bot, MessageEmbed
```js
const { Bot, MessageEmbed } = require('discord-sempai');

const bot = new Bot({
  token: "",
  prefix: "!", // ["?", "!"] пока что не сделано
  help: true // Кастом хелп 
});

bot.createEvent({
  name: 'ready',
  once: false,
  code: async(client) => {
    console.log('Bot starting')
  }
})

bot.command({
    name: "ping",
    code: (client, message, args) => {
    const ping = new MessageEmbed()
    .setTitle('Задержка бота')
    .setDescription('Пинг: ' + client.ws.ping)
    .setFooter({text: message.author.tag})
    .setTimestamp()
  
  message.reply({embeds: [ping]})
    }
})

bot.slashCommand({
  name: 'ping',
  description: 'Задержка бота',
  code: (client, interaction) => {
  const ping = new MessageEmbed()
  .setTitle('Задержка бота')
  .setDescription('Пинг: ' + client.ws.ping)
  .setFooter({text: interaction.user.tag})
  .setTimestamp()
  
  return interaction.reply({embeds: [ping]})
  }
})

bot.Status({
  status: "dnd" // idle, dnd, invisible, online
})

bot.connect()
```

#### ActionComponent
##### Select menu
```js
const { ActionComponent } = require('discord-sempai')

bot.command({
    name: "select",
    code: (client, message, args) => {
    const select = new ActionComponent()
          .addSelectMenu({
            customId: "select",
            placeholder: "Ничего не выбрано",
           //.setMinValues(1),
           //.setMaxValues(1),
            options: {
              label: 'Информация',
              description: 'В этом разделе вы узнаете о пакете',
              value: 'select_test'
            }
          }
          )
          message.reply({content: "Select menu", components: [select]})
    }
})

bot.interactionCreate({
  id: 'select_test',
  type: 'select', // button/select
  code: (client, interaction) => {
  const select = new MessageEmbed()
  .setTitle('Информация')
  .setDescription('Этот пакет начал развиваться')
  .setFooter({text: interaction.user.tag})
  .setTimestamp()
  
  return interaction.reply({embeds: [select]})
  }
})
```

##### Button
```js
bot.command({
  name: 'button',
  code: (client, message, args) => {
    const button = new ActionComponent()
    .addButton({
            id: "button_1",
            label: "Зелёный",
            style: 3,
            disabled: false
          })
          message.reply({content: "Button", components: [button]})
  }
})

bot.interactionCreate({
  id: 'button_1',
  type: 'button', // button/select
  code: (client, interaction) => {
  const button = new MessageEmbed()
  .setTitle('Нажал')
  .setDescription('Зелёная 🌲')
  .setFooter({text: interaction.user.tag})
  .setTimestamp()
  
  return interaction.reply({embeds: [button]})
  }
})
```

### Modal, ModalText
Пример будет показан как создать модальное окно в главном файле
```js
const { Modal, ModalText } = require('discord-sempai')

bot.slashCommand({
    name: "modal",
    description: "Test modal",
    code: async(client, interaction) => {
      const modal = new Modal({
              id: "id",
              title: "Title"
            });
        const text = new ModalText({
            id: "text",
            label: "Tекст",
            placeholder: 'test',
            value: 'test',
            max: 4000,
            min: 0,
            required: true
        })
        modal.addComponents(text)
        return interaction.showModal(modal);
	}
});

bot.interactionCreate({
  id: 'id',
  type: 'modal',
  code: (client, interaction) => {
    const text = interaction.fields.getTextInputValue('text');
	  interaction.deferUpdate();
    console.log(text);
  }
});
```
<image src="https://cdn.discordapp.com/attachments/806436124956426255/1062023294666154094/IMG_20230109_170100.jpg">

#### Database
В 0.0.10 добавлено полное взаимодействия с библиотекой `database-sempai`

```js
const { Database } = require('discord-sempai')
const db = new Database({
  path: "./database",
  table: ["main"],
  key?: "test"
  // Для шифрования текста
})
// Подключение

add('table', 'key', 'value', 'encryption?')
// Добавит к старому значению, новое значение

set('table', 'key', 'value', 'encryption?')
// Изменит значение переменной, если переменной нет она создаться автоматически

get('table', 'key', 'encryption?')
// Выдаст содержимое переменной

all('table')
// Покажет всё содержимое таблицы

delete('table', 'key', 'oldValue?')
// Удалить переменною

deleteAll('table')
// Удалит всё содержимое таблицы

has('table', 'key')
// Проверит существует ли переменная

info('table', 'type?')
// Выдаёт указанную информацию

isTable('table')
// Проверит существует ли указанная таблица

connect()
// Чтобы использовать событие ready, вы должны это указать в конце кода
```

### Link
```js
const { Link } = require('discord-sempai');
const link = new Link()

link.validLink(url)
// Проверит сыллку на валидность, вернёт true/false

link.validImage(url)
// Проверит сыллку эмодзи на валидность, вернёт true/false

link.request(url)
// Сложно объяснить, эта функция используется чтобы получить данные в json формате, можно использовать чтобы получить апи картинку

// Пример
bot.command({
  name: 'request',
  code: async (client, message, args) => {
    let text = await link.request('https://some-random-api.ml/animal/dog');
    let image = new MessageEmbed()
    .setImage(text['image'])
   message.reply({embeds: [image]});
  }
});
```

### Invites
```js
const { Invites } = require('discord-sempai');
const invite = new Invites()
// lala

const info = await getInviteInfo(client, 'invite code/link', 'options')

// options: channelname, channelid, channelmention, guildname, guildid, guildmention, invitername, inviterdiscm, invitertag, inviterid, invitermention

// Всё должно быть асинхронным
```

### Roles
```js
const { Roles } = require('discord-sempai');
const role = new Roles()

role.getRoleInfo('guildid', 'roleid', 'options')
// options: hexColor, members, memberCount, managed, position, permissions, tagsbotid, tagsapplicationid, tagspremiumSubscriberRole

// Всё должно быть асинхронным
```

### Функции
`encryption` - зашифровать текст
`decoding` - раз шифровать текст 

### Прототип
#### Guild
`randomRoleId(client, guildId)`, `randomGuildId(client)`

#### Member
`perms`

#### Message
`randomReactionMessage(client)`

### Загрузчик команд
#### loaderTextCmd
Вставляем в главный файл
```js
bot.loaderTextCmd("./cmd/")
// Путь к файлам
```

Создаём файл, без разницы как вы его назовёте, пример:
```js
const { ActionComponent } = require('discord-sempai');
module.exports = {
    name: "select",
    code: (client, message, args) => {
    const select = new ActionComponent()
          .addSelectMenu({
            customId: "select",
            placeholder: "Ничего не выбрано",
           //.setMinValues(1),
           //.setMaxValues(1),
            options: {
              label: 'Информация',
              description: 'В этом разделе вы узнаете о себе',
              value: 'select_test'
            }
          }
          )
          message.reply({content: "Select menu", components: [select]})
    }
}
```

#### loaderComponent
Вставляем в главный файл
```js
bot.loaderComponent("./component/")
// Путь к файлам
```
Создаём файл, без разницы как вы его назовёте, пример:
```js
const { MessageEmbed } = require('discord-sempai');
module.exports = {
    id: 'select_test',
    type: 'select', // button/select/modal
    code: (client, interaction) => {
  const info = new MessageEmbed()
  .setTitle('Информация')
  .setDescription('Привет 💩😈')
  .setFooter({text: interaction.user.tag})
  .setTimestamp();
  
  return interaction.reply({embeds: [info]});
  }
};
```

<image src="https://cdn.discordapp.com/attachments/806436124956426255/1061656819317100564/IMG_20230108_164456.jpg">

#### loaderSlashCmd
Вставляем в главный файл
```js
bot.loaderSlashCmd("./slash/")
// Путь к файлам
```
Создаём файл, без разницы как вы его назовёте, пример:
```js
const { MessageEmbed } = require('discord-sempai');
module.exports = {
    name: "command",
    description: "Привет мир!",
    code(client, interaction) {
      const test = new MessageEmbed()
    .setTitle('Test')
      .setDescription(`Test`)
      .setTimestamp()
      .setColor('#00ccff')
      .setFooter({text: "Test"});
      return interaction.reply({embeds: [test]});
    }
};
```
<image src="https://cdn.discordapp.com/attachments/806436124956426255/1061656249009197158/IMG_20230108_164242.jpg">

#### loaderEvent
Вставляем в главный файл
```js
bot.loaderEvent("./events/")
// Путь к файлам
```
Создаём файл, без разницы как вы его назовёте, пример:
```js
const client = require("..")
module.exports = {
  name: 'messageCreate',
  once: false,
  code: async(message) => {
    message.reply(`У ${client.user.tag  + client.ws.ping}  пинга`)
  }
}
```

<a href="https://discord.gg/j8G7jhHMbs">Официальный сервер поддержки</a>

### Примечание
- `1` - Документация в скором времени появится
- `2` - В данном пакете малая часть возможностей `discord.js`