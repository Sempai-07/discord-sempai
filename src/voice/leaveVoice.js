const leaveVoice = (connection = undefined) => {
  if (!connection) return console.log(new TypeError('Connection invalid'));
  else connection.destroy();
};

module.exports = leaveVoice;