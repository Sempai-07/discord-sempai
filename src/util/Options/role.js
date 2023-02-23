const { Role } = require('discord.js');

module.exports = {
  Role(role) {
    const data = Object.assign({}, role);

    data.createdAt = role.createdAt;
    data.createdTimestamp = role.createdTimestamp;

    data.hexColor = role.hexColor;

    data.members = role.members.map((x) => x.id).join(" , ");
    data.memberCount = role.members.size;
    data.managed = role.managed;
    data.position = role.position;
    data.permissions = role.permissions.toArray().join(" , ");
    data.tagsbotid = role.tags?.botId;
    data.tagsapplicationid = role.tags?.applicationId;
    data.tagspremiumSubscriberRole = role.tags?.premiumSubscriberRole;

    return data;
  }
};

// © 2022 @Sempai Development