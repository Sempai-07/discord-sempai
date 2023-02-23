const { Invite } = require('discord.js');

module.exports = {
  Invite(invite) {
    const data = Object.assign({}, invite);

    data.delete = undefined;
    data.guild = undefined;
    data.channel = undefined;
    data.inviter = undefined;

    data.channelname = invite.channel?.name;
    data.channelid = invite.channel?.id;
    data.channelmention = invite.channel?.toString();

    data.guildname = invite.guild?.name;
    data.guildid = invite.guild?.id;
    data.guildmention = invite.guild?.toString();

    data.invitername = invite.inviter?.username;
    data.inviterdiscm = invite.inviter?.discriminator;
    data.invitertag = invite.inviter?.tag;
    data.inviterid = invite.inviter?.id;
    data.invitermention = invite.inviter?.toString();

    data.createdAt = invite.createdAt;
    data.createdTimestamp = invite.createdTimestamp;

    data.expiresAt = invite.expiresAt;
    data.expiresTimestamp = invite.expiresTimestamp;

    data.toString = data.toString();
    data.json = JSON.stringify(data, null, 2);

    return data;
  }
};

// © 2022 @Sempai Development