try {
  const { DefaultPlayerOptions, Player, ProgressBar } = require("discord-music-player");

  class Music extends Player {
    constructor(botOptions, options) {
      super(botOptions, options);
      return this;
    }
    
    async playSong(queue, songName, requestedBy, guildId, voiceChannelId) {
      await queue.join(voiceChannelId);
      const guildQueue = this.getQueue(guildId);
      const info = await queue.play(songName, {
        requestedBy: requestedBy
      }).catch(err => undefined);
      const obj = {
        name: info.name,
        author: info.author,
        url: info.url,
        duration: info.duration,
        live: info.isLive,
        first: info.isFirst
      };
      return obj;
    }
    
    queueSongs(guildId) {
      const sngs = this.getQueue(guildID).song;
      let qu = [];
      sngs.forEach((sng) => {
        qu.push({author: sng.author, name: sng.name, duration: sng.duration, requestedBy: sng.requestedBy});
      });
      return qu;
    }
    
    loopMusic(options) {
      let type = 0;
      if(types == 'OFF') type = 0;
      if(types == 'SONG') type = 1;
      if(types == 'QUEUE') type = 2;
      let guildQueue = this.getQueue(guildId);
      return guildQueue.setRepeatMode(type);
    }
    
    progressBar(guildId, arrow, block, size) {
      const queue = this.getQueue(guildId);
      const pbr = new ProgressBar(queue, {size: options.size || 10, block: block || "-", arrow: arrow || ">"});
      return {bar: `${pbr.bar}`, time: `${pbr.times}`};
    }
    
    skipSong(guildId) {
      const guildQueue = this.getQueue(guildId);
      guildQueue.skip();
    }
    
    stopQueue(guildId) {
      const guildQueue = this.getQueue(guildId);
      guildQueue.stop();
    }
    
    setVolume(guildId, volume) {
      const guildQueue = this.getQueue(guildId);
      guildQueue.setVolume(volume);
    }
    
    clearQueue(guildId) {
      const guildQueue = this.getQueue(guildId);
      guildQueue.clearQueue();
    }
    
    shuffleQueue(guildId) {
      const guildQueue = this.getQueue(guildId);
      return guildQueue.shuffle();
    }
    
    pauseQueue(guildId) {
      const guildQueue = this.getQueue(guildId);
      guildQueue.setPaused(true);
    }
    
    resumeQueue(guildId) {
      const guildQueue = this.getQueue(guildId);
      guildQueue.setPaused(false);
    }
  }
  
  module.exports = Music;
} catch (e) {
  class Voice {
    constructor() {
      throw new Error("Install discord-music-player@9.1.1 && @discordjs/opus@0.8.0 to use this feature");
    }
  }
  module.exports = Voice;
}