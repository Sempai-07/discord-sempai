### Discord sempai

[![Discord Server](https://img.shields.io/discord/796504104565211187?color=7289da&logo=discord&logoColor=white)](https://discord.gg/EuSbT5HH8b)
[![NPM Version](https://img.shields.io/npm/v/discord-sempai.svg?maxAge=3600)](https://www.npmjs.com/package/discord-sempai)
[![NPM Downloads](https://img.shields.io/npm/dt/discord-sempai.svg?maxAge=3600)](https://www.npmjs.com/package/discord-sempai)


#### Установка
```js
npm i discord-sempai@0.3.0
npm i discord.js@14.7.1
npm i database-sempai@2.0.4
npm i ascii-table@0.0.9
npm i axios@1.2.2
```

#### Классы
`Bot`, `MessageEmbed`, `Database`, `ActionComponent`, `ModalText`, `Modal`, `MessageAttachment`, `Link`, `Role`, `Invites`, `Music`, `Parser`

#### Bot, MessageEmbed
```js
const { Bot, MessageEmbed } = require('discord-sempai');

const bot = new Bot({
  prefix: ["?", "!", "@"] // или просто "!!"
  help: true, // Кастом хелп 
  ready: true // Встроенное сообщение о запуске бота
});

bot.createEvent({
  name: 'ready',
  once: false,
  code: async(client) => {
    console.log('Bot starting: ' client.user.tag)
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
  status: "dnd", // idle, dnd, invisible, online
  activity: {
    type: 3,
    name: "Это ты, а не я!"
  }
})

bot.connect("TOKEN")
```

#### Music 
Чтобы музыка работала нужно установить
```js
npm i discord-music-player@9.1.1
npm i @discordjs/opus@0.8.0
```
Пример:
```js
const { Music } = require('discord-sempai');

bot.music = new Music(bot, {
  defeanOnJoin: true,
  leaveOnEnd: true,
  leaveOnEmpty: false
})

bot.music.on('songAdd', (queue, song) => {
  queue.data.queueInitMessage.channel.send(`**${song}** был добавлен в очередь.`);
})

bot.music.on('queueEnd', (queue) => {
  queue.data.queueInitMessage.channel.send(`Очередь закончилась, играть не во что.`);
})

bot.music.on('queueDestroyed', (queue) => {
  queue.data.queueInitMessage.channel.send(`Воспроизведение закончилось.`);
})

bot.command({
  name: "play",
  code: async(client, message, args) => {
    let queue = client.music.createQueue(message.guild.id, {
    data: {
    queueInitMessage: message,
    myObject: '...',
    more: '...'
    }
    })
      const info = await client.music.playSong({
        queue: queue,
        songName: args.join(" "),
        voiceChannelId: message.member.voice.channel,
        requestedBy: message.author.tag,
        guildId: message.guild.id
      })
      message.reply(`Добавил в очередь! \nНазвание: ${info.name}\nАвтор: ${info.author}\nДлина: ${info.duration}`)
  }
})
```
##### Дополнительные функции

```js
await music.playSong({
        queue: queue,
        songName: args.join(" "),
        voiceChannelId: message.member.voice.channel,
        requestedBy: message.author.tag,
        guildId: message.guild.id
      })
// Добавляет песню в очередь

music.hasMusicPlaying(guildId)
// Выдаст логическое выражение, если на сервере играет музыка true, нет false

music.joinVC(guildId, channelId)
// Присоединиться к голосовому каналу

music.leaveVC(guildId)
// Покинуть голосовой канал

music.queueSongs(guildId)
// Очередь

music.loopMusic(type, guildId)
// type - 'OFF' | 'QUEUE' | 'SONG'
// Зацикливать очередь/песню

music.progressBar(guildId, arrow, block, size)
// Выдает прогресс бар

music.skipSong(guildId)
// Пропускает песню

music.stopQueue(guildId)
// Останавливает очередь

music.setVolume(guildId, volume) 
// Устанавливает громкость музыки

music.clearQueue(guildId) 
// Очищает очередь

music.shuffleQueue(guildId)
// Перемешивает очередь

music.pauseQueue(guildId) 
// Останавливаеь очередь

music.resumeQueue(guildId) 
// Возобновляет очередь

music.gueueLength(guildId)
// Количество песен в очередь 

```

<a href="https://discord-music-player.js.org/docs/main/master/class/Player">Дополнительная информация</a>


#### Parser

```js
bot.command({
  name: 'parser_1',
  code: (client, message, args) => {
  const parser = new Parser({
      content: '{newEmbed:{author:hello author:https://cdn.discordapp.com/avatars/1033726409455181884/879bedd4f17a0bd95237e97f20d3ce9d.webp?size=4096}
      {thumbnail:https://cdn.discordapp.com/avatars/1033726409455181884/879bedd4f17a0bd95237e97f20d3ce9d.webp?size=4096}
      {image:https://cdn.discordapp.com/avatars/1033726409455181884/879bedd4f17a0bd95237e97f20d3ce9d.webp?size=4096}
      {color:#00ff00}
      {description:Hello description}
      {authorURL:https://cdn.discordapp.com/avatars/1033726409455181884/879bedd4f17a0bd95237e97f20d3ce9d.webp?size=4096}
      {timestamp:ms}
      {footer:Sempai:https://cdn.discordapp.com/avatars/1033726409455181884/879bedd4f17a0bd95237e97f20d3ce9d.webp?size=4096}}'
    });
    message.reply({embeds: [parser]});
  }
});

bot.command({
  name: 'parser_2',
  code: (client, message, args) => {
  const parser = new Parser({
      embeds: {
        author: {name: 'hello author', iconURL: 'https://cdn.discordapp.com/avatars/1033726409455181884/879bedd4f17a0bd95237e97f20d3ce9d.webp?size=4096'},
        thumbnail: 'https://cdn.discordapp.com/avatars/1033726409455181884/879bedd4f17a0bd95237e97f20d3ce9d.webp?size=4096',
        image: 'https://cdn.discordapp.com/avatars/1033726409455181884/879bedd4f17a0bd95237e97f20d3ce9d.webp?size=4096',
        color: '#00ff00', 
        description: 'Hello description',
        authorURL: 'https://cdn.discordapp.com/avatars/1033726409455181884/879bedd4f17a0bd95237e97f20d3ce9d.webp?size=4096',
        footer: {text: 'Sempai', iconURL: 'https://cdn.discordapp.com/avatars/1033726409455181884/879bedd4f17a0bd95237e97f20d3ce9d.webp?size=4096'},
        timestamp: Date.now()
    }
  });
    message.reply({embeds: [parser]});
  }
})
```

`{author:text:url?}` - автор вставки

`{authorURL:url}` - устанавливает гиперссылку длч автора

`{title:text}` - заголовок

`{thumbnail:url}` - URL миниатюры изображения для встраивания

`{url:link}` - устанавливает гиперссылку для заголовка

`{footer:text:url?}` - нижней колонтитул

`{description:text}` - описание

`{color:hex}` - устанавливает цвет эмбета

`{timestamp:ms}` - вставить отметку времени

`{field:name:description:inline}` - ну типа пон

`{image:url}` - изображение

Все эти параметры указввайте в `{newEmbed:...}`. Пока что в одном классе можно создать один эмбед.

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
    minValues: 2,
    maxValues: 2,
    options: [{
    label: 'Информация',
    description: 'В этом разделе вы узнаете о пакете',
    value: 'select_info',
    emoji: '🤓'
    }, {
    label: 'Модерация',
    description: 'Охранна сервера',
    value: 'select_moder',
    emoji: '🛡️'
    }]
    })
    message.reply({content: "Select menu", components: [select]})
    }
})

bot.interactionCreate({
  id: 'select_info',
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
    customId: "button_1",
    label: "Зелёный",
    style: 3,
    disabled: false,
    emoji: '✔️'
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
    customId: "id",
    title: "Title"
    });
    const text = new ModalText({
    customId: "text",
    label: "Tекст",
    placeholder: 'test',
    value: 'test',
    maxValue: 4000,
    minValue: 0,
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

Link.validLink(url)
// Проверит сыллку на валидность, вернёт true/false

Link.validImage(url)
// Проверит сыллку эмодзи на валидность, вернёт true/false

Link.request(url)
// Сложно объяснить, эта функция используется чтобы получить данные в json формате, можно использовать чтобы получить апи картинку

// Пример
bot.command({
  name: 'request',
  code: async (client, message, args) => {
    let text = await Link.request('https://some-random-api.ml/animal/dog');
    let image = new MessageEmbed()
    .setImage(text['image'])
   message.reply({embeds: [image]});
  }
});
```

### Invite
```js
const { Invite } = require('discord-sempai');

const info = await Invite.getInviteInfo(client, 'invite code/link', 'options')

// options: channelname, channelid, channelmention, guildname, guildid, guildmention, invitername, inviterdiscm, invitertag, inviterid, invitermention

// Всё должно быть асинхронным
```

### Role
```js
const { Role } = require('discord-sempai');

Role.getRoleInfo('guildid', 'roleid', 'options')
// options: hexColor, members, memberCount, managed, position, permissions, tagsbotid, tagsapplicationid, tagspremiumSubscriberRole

// Всё должно быть асинхронным
```

### Функции
`encryption('text', key)` - зашифровать текст
`decoding('text', key)` - раз шифровать текст 
`isPermissions(message/interaction, [PermissionsFlagsBits.Flags.Administrator])` - проверить права
`findChannel(msg (message/interaction), client, channel, returnChannel?)` - найти канал по айди, названию, пингу. Выдаст айди
`findMember(msg (message/interaction), member, returnAuthor?)` - найти человека по айди, названию, пингу. Выдаст айди
`findMembers(msg (message/interaction), query (название), limit?, separator?, type?, force?, "{position} {username}: {id} - {nick})"` - выдаст участников

### Djs
djs классы и не только, которые можно импортировать с `discord-sempai`, а не с `discord.js`

- `Client`, `Collection`, `Channel`, `DMChannel`, `GroupDMChannel`, `Guild`, `GuildChannel`, `GuildMember`, `Message`, `MessageReaction`, `PermissionOverwrites`, `Presence`, `Role`, `Snowflake`, `TextChannel`, `User`, `VoiceChannel`, `Webhook`
- `ApplicationCommandType`, `PermissionsBitField`, `ActivityType`, `ComponentType`, `Events`, `GatewayIntentBits`, `PermissionFlagsBits`, `TextInputStyle`, `ButtonStyle`, `ChannelType`, `Partials`, `RESTJSONErrorCodes`, `AuditLogEvent`, `DataResolver`, `MessageActivityType`, `CommandInteraction`, `MessagePayload`

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
            minValue: 1,
            maxValue: 1,
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