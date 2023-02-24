try {
  const { DefaultPlayerOptions, Player, ProgressBar, AudioPlayer } = require("discord-music-player");

  class Music extends Player {
    constructor(botOptions, options) {
      super(botOptions, options);
      return this;
    }
    
    async playSong({ queue, voiceChannelId, guildId, songName, requestedBy }) {
        await queue.join(voiceChannelId);
        const guildQueue = this.getQueue(guildId);
        try {
            const { name, author, url, duration, isLive, isFirst } = await queue.play(songName, { requestedBy });
            return { name, author, url, duration, live: isLive, first: isFirst };
        } catch (error) {
      console.log(error);
        }
    }
    }
    
    hasMusicPlaying(guildId) {
        const guildQueue = this.getQueue(guildId);
        return guildQueue.isPlaying();
    }
    
    queueSongs(guildId) {
        const songs = this.getQueue(guildId).songs;
        return songs.map(({ author, name, duration, requestedBy }) => ({ author, name, duration, requestedBy }));
        
    }
    
    loopMusic(guildId, types) {
      let type = 0;
      if(types == 'SONG') type = 1;
      else if(types == 'QUEUE') type = 2;
      let guildQueue = this.getQueue(guildId);
      return guildQueue.setRepeatMode(type);
    }
    
    progressBar(guildId, arrow, block, size) {
      const queue = this.getQueue(guildId);
      const pbr = new ProgressBar(queue, {size: size || 10, block: block || "-", arrow: arrow || ">"});
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
    
    joinVC(guildId, channelId) {
      let queue = this.createQueue(guildId);
      queue.join(channelId);
    }
    
    leaveVC(guildId) {
      let queue = this.getQueue(guildId);
      queue.leave();
    }
    
    gueueLength(guildId) {
        const queue = this?.getQueue(guildId);
        const songCount = queue?.songs.length || 0;
        return songCount;
    }
    
    getCurrentVolume(guildId) {
        const queue = this?.getQueue(guildId);
        const volume = queue.getVolume();
        return volume;
    }
    
    getLoopType(guildId) {
        const queue = this?.getQueue(guildId);
        if (queue.queueRepeat) {
            return 'queue';
        } else if (queue.trackRepeat) {
            return 'track';
        } else {
            return 'none';
        }
    }
    
    isQueueLooping(guildId, type = 'all') {
        let loop;
        const queue = this?.getQueue(guildId);
        if (type === 'all') loop = queue.queueRepeat || queue.trackRepeat
        else if (type === 'track') loop = queue.trackRepeat
        else if (type === 'queue') loop = queue.queueRepeat
        return loop;
    }
    
    isTrackLooping(guildId) {
        const queue = this?.getQueue(guildId);
        return queue.trackRepeat;
    }

  }
  
  module.exports = Music;
} catch (e) {
  class MusicError {
    constructor() {
      throw new Error("Install discord-music-player@9.1.1 && @discordjs/opus@0.8.0 to use this feature");
    }
  }
  module.exports = MusicError;
}