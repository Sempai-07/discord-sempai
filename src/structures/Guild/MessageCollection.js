const { EventEmitter } = require('events');

class MessageCollection extends EventEmitter {
  constructor(channel, options) {
    super();

    this.channel = channel;
    this.filter = options.filter;
    this.time = options.time || 60000;
    this.max = options.max || 1;
    this.collected = [];

    this.listener = async (msg) => {
      if (msg.channel.id !== this.channel.id) return;
      if (this.filter && !this.filter(msg)) return;

      this.collected.push(msg);

      this.emit('collect', msg);

      if (this.collected.length === this.max) {
        this.stop();
        this.emit('end', this.collected);
      }
    };
  }

  async start() {
    this.collected = [];
    this.channel.client.on('messageCreate', this.listener);
    await new Promise((resolve) => setTimeout(resolve, this.time));
    this.stop();
    this.emit('end', this.collected);
  }

  stop() {
    this.channel.client.off('messageCreate', this.listener);
    }
  
  setFilter(filterFunc) {
    this.filter = filterFunc;
    }
    
    clear() {
    this.collected = [];
    this.time = 60000;
    this.max = 1;
    }
    
    setTime(timeInMs) {
    this.time = timeInMs;
    }
    
    isEmpty() {
    return this.collected.length === 0;
    }
    
    setMax(maxCount) {
    this.max = maxCount;
    }
    
    getCollected() {
    return this.collected;
    }
    
    getFirst() {
    return this.collected.length > 0 ? this.collected[0] : null;
    }
    
    getLast() {
    return this.collected.length > 0 ? this.collected[this.collected.length - 1] : null;
    }
    
    getSize() {
    return this.collected.length;
    }


}

module.exports = MessageCollection;