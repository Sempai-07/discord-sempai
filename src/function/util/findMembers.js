const { Util } = require('discord-sempai');

const findMembers = async(msg, query, limit = 10, separator = "\n", type = "startsWith", force = "no", text = "{position}) {username}: {id}") => {
  if (typeof limit !== 'number') limit = Number(limit);
  query = query.toLowerCase();
  const result = await Util.getMembers(msg.guild, {query, limit, type}, force === "yes");
  const results = result.map((x, y) => {
    return text
      .replaceAll("{username}", x.user.username)
      .replaceAll("{tag}", x.user.tag)
      .replaceAll("{nick}", x.displayName)
      .replaceAll("{position}", y + 1)
      .replaceAll("{id}", x.user.id);
  }).join(separator);
  return !results ? results : undefined;
};


module.exports = findMembers;

// © 2022 @Sempai Development