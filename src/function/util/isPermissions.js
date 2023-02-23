const isPermissions = (message, perms) => {
  perms = Array.isArray(perms) === true ? perms : [perms];
  return message.member?.permissions?.has(perms);
};

module.exports = isPermissions;

// © 2022 @Sempai Development