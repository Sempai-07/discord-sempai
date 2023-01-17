const { joinVoiceChannel } = require('@discordjs/voice');

const joinVoice = (msg = undefined, voiceid = undefined) => {
    if (this.msg === undefined) return console.log(new TypeError('Message not specified'));
    else if (this.voiceid === undefined) return console.log(new TypeError('VoiceId not specified'));
    const channel = msg.guild.channels.cache.get(voiceid);
    const connection = joinVoiceChannel({
      channelId: channel.id,
      guildId: channel.guild.id,
      adapterCreator: channel.guild.voiceAdapterCreator
    });
};

module.exports = joinVoice;