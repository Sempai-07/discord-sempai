const findChannel = (msg, client, channel, returnChannel = true) => {
  const manager = client.channels.cache;
  const c = manager.get(channel) || manager.find(
    (c) => c.name && c.name.toLowerCase() === channel.toLowerCase()
    ) || msg.mentions.channels.first() || (returnChannel === true ? msg.channel : undefined);
    return c.id;
};

module.exports = findChannel;

// © 2022 @Sempai Development