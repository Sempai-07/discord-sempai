const { joinVoiceChannel } = require('@discordjs/voice');

const joinVoice = (msg = undefined, voiceid = undefined) => {
    if (msg === undefined) return console.log(new TypeError('Message/Interaction not specified'));
    voiceid = voiceid === undefined ? member.voice?.channelId : voiceid
    const channel = msg.guild.channels.cache.get(voiceid);
    const connection = joinVoiceChannel({
      channelId: channel.id,
      guildId: channel.guild.id,
      adapterCreator: channel.guild.voiceAdapterCreator
    });
};

module.exports = joinVoice;