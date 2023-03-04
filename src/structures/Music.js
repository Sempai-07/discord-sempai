try {

  const { DefaultPlayerOptions, Player, ProgressBar } = require("discord-music-player");

  
  class Music extends Player {
    constructor(botOptions, options) {
      super(botOptions, options);
      return this;
    }
    
    async playTrack(options) {
    try {
        await options.queue.join(options.voiceChannelId)
        const guildQueue = this.getQueue(options.guildId)
        const info = await options.queue.play(options.songName, {
            requestedBy: options.requestedBy
        })
        const obj = {
            name: info.name,
            author: info.author,
            url: info.url,
            duration: info.duration,
            live: info.isLive,
            first: info.isFirst
        }
        return obj
    } catch (err) {
        console.log(err)
        return undefined
    }
}


queueSongs(guildId, messageFormat = "{position}: Автор: {author} - {name}, добавил: {useradd}", numSongs = 10) {
  try {
    const sngs = this?.getQueue(guildId)?.songs || [];
    let qu = [];
    for (let i = 0; i < numSongs && i < sngs.length; i++) {
      const position = i + 1;
      const message = messageFormat.replace('{position}', position).replace('{author}', sngs[i].author).replace('{name}', sngs[i].name).replace('{useradd}', sngs[i].requestedBy).replace('{duration}', sngs[i].duration).replace('{url}', sngs[i].url).replace('{thumbnail}', sngs[i].thumbnail).replace('{seektime}', sngs[i].seekTime).replace('{first}', sngs[i].isFirst).replace('{live}', sngs[i].isLive)
      qu.push(message);
    }
    return qu;
  } catch (err) {
    console.log(err);
    return undefined;
  }
}

loopMusic(guildId, types) {
    try {
        let type = 0
        if (types == 'off' || types == 0) type = 0
        if (types == 'song' || types == 'track' || types == 1) type = 1
        if (types == 'queue' || types == 2) type = 2
        let guildQueue = this?.getQueue(guildId)
        return guildQueue?.setRepeatMode(type) || null
    } catch (err) {
        console.log(err)
        return undefined
    }
}

progressBar(guildId, arrow, block, size) {
    try {
        const queue = this?.getQueue(guildId)
        const pbr = new ProgressBar(queue, {size: size || 10, block: block || "-", arrow: arrow || ">"})
        return {bar: `${pbr.bar}`, time: `${pbr.times}`}
    } catch (err) {
        console.log(err)
        return undefined
    }
}

skipTrack(guildId, numberSkip = 1) {
    try {
        const guildQueue = this?.getQueue(guildId)
        guildQueue?.skip(numberSkip)
    } catch (err) {
        console.log(err)
        return undefined
    }
}

stopQueue(guildId) {
    try {
        const guildQueue = this?.getQueue(guildId)
        guildQueue?.stop()
    } catch (err) {
        console.log(err)
        return undefined
    }
}

setVolume(guildId, volume) {
    try {
        const guildQueue = this?.getQueue(guildId)
        guildQueue?.setVolume(volume)
    } catch (err) {
        console.log(err)
        return undefined
    }
}

clearQueue(guildId) {
    try {
        const guildQueue = this?.getQueue(guildId)
        guildQueue?.clearQueue()
    } catch (err) {
        console.log(err)
        return undefined
    }
}

shuffleQueue(guildId) {
    try {
        const guildQueue = this?.getQueue(guildId)
        return guildQueue?.shuffle() || null
    } catch (err) {
        console.log(err)
        return undefined
    }
}

pauseQueue(guildId) {
    try {
        const guildQueue = this?.getQueue(guildId)
        guildQueue?.setPaused(true)
    } catch (err) {
        console.log(err)
        return undefined
    }
}

resumeQueue(guildId) {
    try {
        const guildQueue = this?.getQueue(guildId)
        guildQueue?.setPaused(false)
    } catch (err) {
        console.log(err)
        return undefined
    }
}

joinVC(guildId, channelId) {
  try {
    let queue = this?.createQueue(guildId);
    queue.join(channelId);
  } catch (error) {
    console.error(error);
    return undefined;
  }
}

leaveVC(guildId) {
  try {
    let queue = this?.createQueue(guildId);
    queue.leave();
  } catch (error) {
    console.error(error);
    return undefined;
  }
}

gueueLength(guildId) {
  try {
    const queue = this?.getQueue(guildId);
    const songCount = queue?.songs.length || 0;
    return songCount;
  } catch (error) {
    console.error(error);
    return undefined;
  }
}

getCurrentVolume(guildId) {
    try {
      const queue = this.queues.get(guildId);
      const volume = queue.volume;
      return volume;
    } catch (error) {
      console.error(error);
      return undefined;
    }
  }

  getLoopType(guildId) {
    try {
      const queue = this.queues.get(guildId);
      if (queue.repeatMode === 2) {
        return 'queue';
      } else if (queue.repeatMode === 1) {
        return 'track';
      } else {
        return 'none';
      }
    } catch (error) {
      console.error(error);
      return undefined;
    }
  }

  isQueueLooping(guildId, type = 'all') {
    try {
      let loop;
      const queue = this.queues.get(guildId);
      if (type === 'all') loop = queue.repeatMode === 0 ? false : true
      else if (type === 'track') loop = queue.repeatMode === 0 ? true: false
      else if (type === 'queue') loop = queue.repeatMode === 2 ? true : false
      return loop;
    } catch (error) {
      console.error(error);
      return undefined;
    }
  }

  isTrackLooping(guildId) {
    try {
      const queue = this.queues.get(guildId);
      return queue.repeatMode === 1 ? true : false;
    } catch (error) {
      console.error(error);
      return undefined;
    }
  }
  
  isTrackPaused(guildId) {
    try {
      const queue = this.queues.get(guildId);
      return queue.paused
    } catch (error) {
      console.error(error);
      return undefined;
    }
  }

  isMusicPlaying(guildId) {
    try {
      const guildQueue = this?.queues?.get(guildId);
      return guildQueue?.isPlaying || false;
    } catch (error) {
      console.error(error);
      return false;
    }
  }
}
  
  module.exports = Music;
} catch (e) {
  class MusicError {
    constructor() {
      throw new Error("Install discord-music-player@9.1.1 && @discordjs/opus@0.8.0 && isomorphic-unfetch@4.0.2 to use this feature");
    }
  }
  module.exports = MusicError;
}