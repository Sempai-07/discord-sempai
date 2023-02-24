<div align="center"><image src="https://media.discordapp.net/attachments/1063333892838408193/1078336814907146442/Discord_Sempai_1.png"></div>

# Discord sempai
[![Discord Server](https://img.shields.io/discord/796504104565211187?color=7289da&logo=discord&logoColor=white)](https://discord.gg/EuSbT5HH8b)
[![NPM Version](https://img.shields.io/npm/v/discord-sempai.svg?maxAge=3600)](https://www.npmjs.com/package/discord-sempai)
[![NPM Downloads](https://img.shields.io/npm/dt/discord-sempai.svg?maxAge=3600)](https://www.npmjs.com/package/discord-sempai)


Discord sempai - это библиотека для создания ботов Discord с использованием Discord.js.

## Установка
Чтобы установить Discord sempai, необходимо выполнить следующие шаги:

- Установите Node.js на свой компьютер.
- Откройте терминал и перейдите в каталог, где будет располагаться Ваш проект.
- Введите следующую команду: npm install discord-sempai

## Использование
Чтобы начать использовать Discord sempai, необходимо выполнить следующие шаги:

- Создайте новый проект Node.js.
- Установите Discord sempai, как было описано выше.
- Импортируйте библиотеку в Ваш проект:

```js
const { Bot } = require('discord-sempai');
// Создайте новый экземпляр Bot:

const bot = new Bot({
  prefix: ["!", "%"],
  status: "dnd"
});
// Используйте методы библиотеки, чтобы создать необходимые функциональности для Вашего бота.

bot.createEvent({
  name: 'ready',
  code: (client) => {
  console.log(`Вы вошли как  ${client.user.tag}!`);
  }
});

bot.command({
  name: 'ping',
  code: (client, message, args) => {
   message.reply("Pong " + client.ws.ping)
  }
});

bot.connect("DISCORD_BOT_TOKEN");
```

## Документация

Подробную документацию по Discord sempai можно найти на <a href="https://Sempai-07.github.io/dosc-discord-sempai">официальном сайте</a>

## Вклад

Мы приветствуем Ваше участие в развитии Discord sempai! Если у Вас есть какие-либо идеи или предложения, пожалуйста, зайдите на <a href="https://discord.gg/j8G7jhHMbs">Официальный сервер поддержки</a>.

## Лицензия

Discord sempai доступен на условиях лицензии MIT. Подробную информацию можно найти в файле <a href="https://github.com/Sempai-07/discord-sempai/blob/main/LICENSE">LICENSE</a>.