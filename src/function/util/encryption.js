const crypto = require('crypto');

const encryption = (message, key) => {
  let userKey = crypto.createCipher('aes-128-cbc', key);
  let text = userKey.update(message, 'utf8', 'hex');
  text += userKey.final('hex');
  return text;
};

module.exports = encryption;

// © 2022 @Sempai Development