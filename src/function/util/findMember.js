const findMember = (msg, member, returnAuthor = true) => {
  let u = msg.guild.members.cache.get(member) || msg.guild.members.cache.find(
    (m) =>
    m.user.tag.toLowerCase() === member.toLowerCase() ||
    m.user.username.toLowerCase() === member.toLowerCase() ||
    m.displayName.toLowerCase() === member.toLowerCase()
    ) || msg.mentions.members.first() || msg.guild.members.fetch(member).catch(e => undefined);
    if (returnAuthor === true) return u.id === undefined ? msg.member.id : u.id;
    else return u.id;
};

module.exports = findMember;

// © 2022 @Sempai Development