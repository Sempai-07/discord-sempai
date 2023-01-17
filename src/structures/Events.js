const { Collection } = require('discord.js');

class Events {
  constructor(client) {
    this.client = client;
    this.ready = new Collection();
    
    client.on('ready', async() => {
      const ready = this.ready.all();
      if (!ready) return;
      try {
        await ready.code(client);
      } catch (error) {
        console.log(error);
      }
    });
  }
  
  commandReady(options) {
    this.ready.set(options.name, options.code);
  }
  
}